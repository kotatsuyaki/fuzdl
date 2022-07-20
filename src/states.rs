//! State types used to 1) verify and extract data from expected elements and 2) interact with the
//! pages.

#![allow(dead_code)]

use anyhow::{bail, Context, Result};
use thirtyfour::{prelude::*, session::handle::SessionHandle};
use thirtyfour_querier_derive::Querier;

/// State corresponding to the `/account/signin` page
#[derive(Querier)]
pub struct Signin {
    #[querier(wait = 3, css = "[class^=signin_form__input][type=email]")]
    email: WebElement,

    #[querier(wait = 3, css = "[class^=signin_form__input][type=password]")]
    password: WebElement,

    #[querier(wait = 3, css = "[class^=signin_form__button]")]
    button: WebElement,
}

/// State corresponding to the `/account/signin` page after a successful login.
impl Signin {
    pub async fn new(driver: &WebDriver) -> Result<Self> {
        const SIGNIN_URL: &str = "https://comic-fuz.com/account/signin";
        driver.goto(SIGNIN_URL).await?;
        Ok(Self::query(driver).await?)
    }

    /// Interact with the sign elements and navigate to the [`SigninDone`] state.
    pub async fn signin(
        self,
        driver: &SessionHandle,
        email: impl AsRef<str>,
        password: impl AsRef<str>,
    ) -> Result<SigninDone> {
        self.email.send_keys(email).await?;
        self.password.send_keys(password).await?;
        self.button.click().await?;
        SigninDone::new(driver).await
    }
}

/// State corresponding to the `/account/signin` page after a successful login.
#[derive(Querier)]
pub struct SigninDone {
    #[querier(wait = 3, css = "[class^=signin_signin__description]")]
    done_description: WebElement,
}

impl SigninDone {
    async fn new<T: ElementQueryable>(driver: &T) -> Result<Self> {
        const SIGNIN_DONE_TEXT: &str = "ログインが完了しました。";

        let state = Self::query(driver).await?;
        let text = state.done_description.text().await?;
        if text != SIGNIN_DONE_TEXT {
            bail!(
                "Description text on signin '{}' does not match the expected '{}'",
                text,
                SIGNIN_DONE_TEXT
            );
        }
        Ok(state)
    }
}

/// State corresponding to the `/rensai` page.
#[derive(Querier)]
pub struct SerialCatalog {
    #[querier(
        all,
        nested,
        wait = 3,
        css = "[class^=title_list_manga]>[class^=Title_title__]"
    )]
    entries: Vec<(WebElement, SerialCatalogEntry)>,
}

/// Serial title element in [`SerialCatalog`].
#[derive(Querier, Clone)]
struct SerialCatalogEntry {
    #[querier(css = "[class^=Title_title__name]")]
    name: WebElement,
    #[querier(maybe, css = "[class^=Title_title__description]")]
    description: Option<WebElement>,
}

/// Metadata of a serial, tied to the [`SerialCatalog`] struct.
#[derive(Debug, Clone)]
pub struct Serial {
    pub name: String,
    pub description: String,
    pub href: String,
}

impl SerialCatalog {
    pub async fn new(driver: &WebDriver) -> Result<Self> {
        const SERIALS_URL: &str = "https://comic-fuz.com/rensai";
        driver.goto(SERIALS_URL).await?;
        Ok(Self::query(driver).await?)
    }

    /// Get the serials listed on the page.
    pub async fn serials(&self) -> Result<Vec<Serial>> {
        let serials = self
            .entries
            .iter()
            .map(
                |(elem, SerialCatalogEntry { name, description })| async move {
                    let name = name.text().await?;
                    let description = if let Some(description) = description {
                        description.text().await?.to_string()
                    } else {
                        String::new()
                    };
                    let href = elem.attr("href").await?.unwrap_or(String::new());

                    Result::<Serial>::Ok(Serial {
                        name,
                        description,
                        href,
                    })
                },
            )
            .collect::<Vec<_>>();
        futures::future::try_join_all(serials).await
    }
}

/// State corresponding to the `/manga/{id}` pages.
#[derive(Querier)]
pub struct Manga {
    #[querier(wait = 3, css = "[class^=title_detail_introduction__name]")]
    title: WebElement,

    #[querier(all, nested, wait = 3, css = "ul>[class^=Chapter_chapter]")]
    chapters: Vec<(WebElement, ChapterEntry)>,
}

// Manga chapter element in [`Manga`].
#[derive(Querier)]
pub struct ChapterEntry {
    #[querier(maybe, css = "[class^=Chapter_chapter__price_free]")]
    free_elem: Option<WebElement>,
}

impl Manga {
    pub async fn new(driver: &WebDriver, url: impl AsRef<str>) -> Result<Self> {
        driver.goto(url.as_ref()).await?;
        Ok(Self::query(driver).await?)
    }

    pub async fn title(&self) -> Result<String> {
        Ok(self.title.text().await?)
    }
}

#[derive(Querier)]
pub struct MangaViewer {
    #[querier(css = "body")]
    body: WebElement,

    #[querier(wait = 3, css = "img[alt=page_{page}]")]
    img: WebElement,

    #[querier(wait = 3, css = "[class^=ViewerFooter_footer__page]")]
    footer_page: WebElement,
}

pub struct MangaViewerState {
    page: usize,
    viewer: MangaViewer,
}

impl MangaViewerState {
    pub async fn new(driver: &WebDriver, url: impl AsRef<str>) -> Result<Self> {
        driver.goto(url.as_ref()).await?;
        let viewer = MangaViewer::query(driver, 0).await?;
        Ok(Self { page: 0, viewer })
    }

    pub async fn number_of_pages(&self) -> Result<usize> {
        let text = self.viewer.footer_page.text().await?;
        let text = text
            .split("/")
            .nth(1)
            .context("Failed split page indicator text")?
            .trim();
        Ok(text.parse::<usize>()? - 1)
    }

    pub async fn img_data(&self, driver: &WebDriver) -> Result<Vec<u8>> {
        // Wait until <img src="..."> has something
        self.viewer
            .img
            .wait_until()
            .condition(Box::new(|img: &WebElement| {
                Box::pin(async move { Ok(img.attr("src").await?.is_some()) })
            }))
            .await?;
        let src = self
            .viewer
            .img
            .attr("src")
            .await?
            .context("Missing blob src in img tag")?;
        // Execute the unreadable script
        let src = serde_json::to_value(src)?;
        let ret = driver.execute_async(BLOB_SCRIPT, vec![src]).await?;

        // Convert to string and decode from base64 to raw bytes
        let b64: String = ret.convert()?;
        Ok(base64::decode(b64)?)
    }

    pub async fn has_next_page(&self) -> Result<bool> {
        Ok(self.page + 1 < self.number_of_pages().await?)
    }

    pub async fn next_page(&mut self, driver: &WebDriver) -> Result<()> {
        self.viewer
            .body
            .send_keys(thirtyfour::Key::Left.to_string())
            .await?;
        self.viewer = MangaViewer::query(driver, self.page + 1).await?;
        self.page += 1;

        Ok(())
    }

    pub fn page(&self) -> usize {
        self.page
    }
}

const BLOB_SCRIPT: &str = r#"
    var uri = arguments[0];
    var callback = arguments[1];
    var toBase64 = function(buffer){for(var r,n=new Uint8Array(buffer),t=n.length,a=new Uint8Array(4*Math.ceil(t/3)),i=new Uint8Array(64),o=0,c=0;64>c;++c)i[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(c);for(c=0;t-t%3>c;c+=3,o+=4)r=n[c]<<16|n[c+1]<<8|n[c+2],a[o]=i[r>>18],a[o+1]=i[r>>12&63],a[o+2]=i[r>>6&63],a[o+3]=i[63&r];return t%3===1?(r=n[t-1],a[o]=i[r>>2],a[o+1]=i[r<<4&63],a[o+2]=61,a[o+3]=61):t%3===2&&(r=(n[t-2]<<8)+n[t-1],a[o]=i[r>>10],a[o+1]=i[r>>4&63],a[o+2]=i[r<<2&63],a[o+3]=61),new TextDecoder("ascii").decode(a)};
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(){ callback(toBase64(xhr.response)) };
    xhr.onerror = function(){ callback(xhr.status) };
    xhr.open('GET', uri);
    xhr.send();
"#;

#[cfg(test)]
mod test {
    use anyhow::Context;

    use crate::driver::with_driver;

    use super::*;

    #[tokio::test]
    async fn test_signin_new() -> Result<()> {
        with_driver(|driver| async move { Signin::new(&driver).await.map(|_| ()) })
            .await?
            .context("Driver early cancel")??;
        Ok(())
    }

    #[tokio::test]
    async fn test_serial_catalog() -> Result<()> {
        let serials = with_driver(|driver| async move {
            let serial_catalog_state = SerialCatalog::new(&driver).await?;
            let serials = serial_catalog_state.serials().await?;
            Result::<Vec<Serial>>::Ok(serials)
        })
        .await?
        .context("Driver early cancel")??;

        assert!(!serials.is_empty(), "Fetched list of serials is empty");

        Ok(())
    }

    #[tokio::test]
    async fn test_manga_metadata() -> Result<()> {
        const MANGA_URL: &str = "https://comic-fuz.com/manga/1541";
        const MANGA_TITLE: &str = "スローループ";

        let (has_free_chapters, title) = with_driver(|driver| async move {
            let manga_state = Manga::new(&driver, MANGA_URL).await?;
            let has_free_chapters = manga_state
                .chapters
                .iter()
                .find(|(_, chapter)| chapter.free_elem.is_some())
                .is_some();
            let title = manga_state.title().await?;
            Result::<(bool, String)>::Ok((has_free_chapters, title))
        })
        .await?
        .context("Driver early cancel")??;

        assert_eq!(
            title, MANGA_TITLE,
            "The fetch title does not match the assumption"
        );
        assert!(has_free_chapters, "No free chapters found");

        Ok(())
    }

    #[tokio::test]
    async fn test_manga_viewer() -> Result<()> {
        const VIEWER_URL: &str = "https://comic-fuz.com/manga/viewer/14954";

        with_driver(|driver| async move {
            let mut viewer_state = MangaViewerState::new(&driver, VIEWER_URL).await?;
            loop {
                let _data = viewer_state.img_data(&driver).await?;
                if viewer_state.has_next_page().await? {
                    viewer_state.next_page(&driver).await?;
                } else {
                    break;
                }
            }
            Result::<()>::Ok(())
        })
        .await?
        .context("Driver early cancel")??;

        Ok(())
    }
}
