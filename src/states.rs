//! State types used to 1) verify and extract data from expected elements and 2) interact with the
//! pages.

#![allow(dead_code)]

use std::fmt::Display;
use std::time::Duration;

use anyhow::{anyhow, bail};
use anyhow::{Context, Result};
use futures::{future, try_join, Future};
use serde::Deserialize;
use serde_json as json;
use tempfile::TempDir;
use thirtyfour::components::{Component, ElementResolver};
use thirtyfour::prelude::*;
use tokio::fs;
use tokio::task::spawn_blocking;

/// # Example
///
/// ```
/// async fn resolve(title: ElementResolver<WebElement>, main: ElementResolver<WebElement>) {
///     let (title, main) = resolve_all!(title, main).expect("One of them failed");
/// }
/// ```
macro_rules! resolve_all {
    ( $($rest: expr),+ ) => {
        ::futures::try_join!( $( $rest.resolve() ),+ )
    };
}

// State for `/account/signin`
#[derive(Component)]
pub struct Signin {
    base: WebElement,

    #[by(
        wait(timeout_ms = 3000, interval_ms = 300),
        css = "[class^=signin_form__input][type=email]"
    )]
    email: ElementResolver<WebElement>,

    #[by(
        wait(timeout_ms = 3000, interval_ms = 300),
        css = "[class^=signin_form__input][type=password]"
    )]
    password: ElementResolver<WebElement>,

    #[by(
        wait(timeout_ms = 3000, interval_ms = 300),
        css = "[class^=signin_form__button]"
    )]
    button: ElementResolver<WebElement>,

    #[by(
        wait(timeout_ms = 3000, interval_ms = 300),
        css = "[class^=signin_signin__description]"
    )]
    done_description: ElementResolver<WebElement>,
}

// State for the 購入済み tab of `/bookshelf`
#[derive(Component)]
pub struct Purchased {
    base: WebElement,

    #[by(
        wait(timeout_ms = 3000, interval_ms = 300),
        css = "[class^=Selector_selector__option__]"
    )]
    selector_options: ElementResolver<Vec<WebElement>>,

    #[by(
        wait(timeout_ms = 3000, interval_ms = 300),
        css = "a[class^=Magazine_magazine__]"
    )]
    magazines: ElementResolver<Vec<PurchasedMagazine>>,
}

#[derive(Component, Clone)]
struct PurchasedMagazine {
    #[base]
    anchor: WebElement,

    #[by(nowait, css = "[class^=Magazine_magazine__name__]")]
    name: ElementResolver<WebElement>,
}

#[derive(Debug, Clone)]
pub struct MagazineMetadata {
    pub href: String,
    pub name: String,
}

#[derive(Component)]
pub struct Magazine {
    base: WebElement,

    #[by(wait(timeout_ms = 3000, interval_ms = 300), css = "#__NEXT_DATA__")]
    json_data: ElementResolver<WebElement>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MagazineIssue {
    pub magazine_name: String,
    pub magazine_issue_id: usize,
    pub magazine_issue_name: String,

    // (Currently) unused fields are optional
    pub thumbnail_url: Option<String>,
    pub paid_point: Option<usize>,
    pub number_of_sample_pages: Option<usize>,
    pub updated_date: Option<String>,
    pub end_date: Option<String>,
    pub first_page_image_url: Option<String>,
}

#[derive(Component)]
pub struct Viewer {
    #[base]
    body: WebElement,

    #[by(
        wait(timeout_ms = 3000, interval_ms = 300),
        css = "[class^=ViewerFooter_footer__page]"
    )]
    page_counter: ElementResolver<WebElement>,
}

pub enum ViewerKind {
    Magazine,
    Manga,
}

impl Signin {
    pub async fn new_from_driver(driver: &WebDriver) -> Result<Self> {
        const SIGNIN_URL: &str = "https://comic-fuz.com/account/signin";
        driver.goto(SIGNIN_URL).await?;
        let body = driver.body().await?;
        Ok(Self::new(body))
    }

    pub async fn signin(
        self,
        user_email: impl AsRef<str>,
        user_password: impl AsRef<str>,
    ) -> Result<()> {
        let (email, password, button) = resolve_all!(self.email, self.password, self.button)?;

        email.send_keys(user_email).await?;
        password.send_keys(user_password).await?;
        button.click().await?;

        self.check_description().await
    }

    async fn check_description(&self) -> Result<()> {
        const SIGNIN_DONE_TEXT: &str = "ログインが完了しました。";
        let done_description = self.done_description.resolve().await?;
        let text = done_description.text().await?;

        if text != SIGNIN_DONE_TEXT {
            bail!(
                "Description text on signin '{}' does not match the expected '{}'",
                text,
                SIGNIN_DONE_TEXT
            );
        } else {
            Ok(())
        }
    }
}

impl Purchased {
    pub async fn new_from_driver(driver: &WebDriver) -> Result<Self> {
        const BOOKSHELF_URL: &str = "https://comic-fuz.com/bookshelf";

        driver.goto(BOOKSHELF_URL).await?;
        let body = driver.body().await?;
        Self::new(body).navigate_to_purchased_tab().await
    }

    async fn navigate_to_purchased_tab(self) -> Result<Self> {
        const PURCHASED_TEXT: &str = "購入済み";

        let selector_options = self.selector_options.resolve().await?;
        let purchased_option = selector_options
            .get(2)
            .ok_or(anyhow!("No enough tabs present on the bookshelf page"))?;
        if purchased_option.text().await? != PURCHASED_TEXT {
            bail!(
                "The 3rd tab on the bookshelf page is not '{}'",
                PURCHASED_TEXT
            );
        }
        purchased_option.click().await?;
        Ok(self)
    }

    pub async fn list_megazines(&self) -> Result<Vec<MagazineMetadata>> {
        let magazines = self.magazines.resolve().await?;
        future::try_join_all(magazines.into_iter().map(PurchasedMagazine::into_metadata)).await
    }
}

impl PurchasedMagazine {
    async fn into_metadata(self) -> Result<MagazineMetadata> {
        let Self { anchor, name } = self;

        let name = name.resolve().await?;
        let (href, name) = try_join!(anchor.attr("href"), name.text())?;
        let href = href.context("Magazine href missing")?;

        Ok(MagazineMetadata { href, name })
    }
}

impl Display for MagazineMetadata {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.name)
    }
}

impl Magazine {
    pub async fn new_from_driver(driver: &WebDriver, href: impl AsRef<str>) -> Result<Self> {
        driver.goto(href.as_ref()).await?;
        let body = driver.body().await?;
        Ok(Self::new(body))
    }

    pub async fn list_issues(&self) -> Result<Vec<MagazineIssue>> {
        let json_data = self.json_data.resolve().await?;
        let json_text = json_data.inner_html().await?;
        let json_obj: json::Value = json::from_str(&json_text)?;
        let megazine_issues = json_obj["props"]["pageProps"]["magazineIssues"].clone();

        if megazine_issues.is_array() == false {
            bail!("JSON data does not contain array at .props.pageProps.megazineIssues");
        }

        let megazine_issues: Vec<MagazineIssue> = json::from_value(megazine_issues)?;
        Ok(megazine_issues)
    }
}

impl Display for MagazineIssue {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{} - {} ({})",
            self.magazine_name, self.magazine_issue_name, self.magazine_issue_id
        )
    }
}

pub struct DownloadProgress {
    pub done: usize,
    pub total: usize,
}

impl Viewer {
    pub async fn new_from_driver(driver: &WebDriver, kind: ViewerKind, id: usize) -> Result<Self> {
        driver
            .goto(format!("https://comic-fuz.com/{kind}/viewer/{id}"))
            .await?;
        let body = driver.body().await?;
        Ok(Self::new(body))
    }

    pub async fn download_imgs(
        self,
        driver: &WebDriver,
        update_progress: impl Fn(DownloadProgress),
    ) -> Result<TempDir> {
        let mut downloaded_pages = vec![];
        let tempdir = spawn_blocking(|| TempDir::new()).await??;

        let number_of_pages = self.number_of_pages().await?;
        update_progress(DownloadProgress {
            done: 0,
            total: number_of_pages,
        });

        while downloaded_pages.len() < number_of_pages {
            let page_number = downloaded_pages.len();
            let img_css_selector = format!("img[alt^=page_{page_number}]");
            let img = self
                .body
                .query(By::Css(&img_css_selector))
                .wait(Duration::from_secs(1), Duration::from_millis(100))
                .single()
                .await?;

            let img_bytes = Self::fetch_img_data(img, driver).await?;
            let filename = format!("{:03}.jpg", page_number);
            let filepath = tempdir.path().join(filename);

            fs::write(&filepath, &img_bytes).await?;
            downloaded_pages.push(filepath);

            update_progress(DownloadProgress {
                done: downloaded_pages.len(),
                total: number_of_pages,
            });

            self.body
                .send_keys(Key::Left.to_string())
                .await
                .context("Failed to send left key")?;
        }

        Ok(tempdir)
    }

    // zero-based
    pub async fn current_page(&self) -> Result<i64> {
        let page_counter = self.page_counter.resolve().await?;
        let counter_text = page_counter.text().await?;
        let text = counter_text
            .split("/")
            .nth(0)
            .context("Failed split page indicator text")?
            .trim();
        Ok(text.parse::<i64>()? - 1)
    }

    pub async fn number_of_pages(&self) -> Result<usize> {
        let page_counter = self.page_counter.resolve().await?;
        let counter_text = page_counter.text().await?;
        let text = counter_text
            .split("/")
            .nth(1)
            .context("Failed split page indicator text")?
            .trim();
        Ok(text.parse::<usize>()? - 1)
    }

    async fn fetch_img_data(img: WebElement, driver: &WebDriver) -> Result<Vec<u8>> {
        // Wait until <img src="..."> has something
        img.wait_until()
            .wait(Duration::from_secs(20), Duration::from_millis(50))
            .condition(Box::new(|img: &WebElement| {
                Box::pin(async move { Ok(img.attr("src").await?.is_some()) })
            }))
            .await?;

        let src = img
            .attr("src")
            .await?
            .context("Missing blob src in img tag")?;

        let src = serde_json::to_value(src)?;
        let ret = driver.execute_async(BLOB_SCRIPT, vec![src]).await?;

        // base64 bytes -> base64 String -> bytes
        let b64: String = ret.convert()?;
        Ok(base64::decode(b64)?)
    }

    pub async fn has_next_page(&self) -> Result<bool> {
        // Ok(self.page + 1 < self.number_of_pages().await?)
        todo!()
    }
}

impl Display for ViewerKind {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            ViewerKind::Magazine => write!(f, "magazine"),
            ViewerKind::Manga => write!(f, "manga"),
        }
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

trait BodyQueryable {
    type Output: Future<Output = Result<WebElement>>;
    fn body(&self) -> Self::Output;
}

impl BodyQueryable for WebDriver {
    type Output = futures::future::BoxFuture<'static, Result<WebElement>>;

    fn body(&self) -> Self::Output {
        let driver = self.clone();
        let fut = async move {
            driver
                .query(By::Tag("body"))
                .single()
                .await
                .context("Failed to query the body element")
        };
        Box::pin(fut)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::driver::with_driver;

    #[tokio::test]
    async fn test_signin() -> Result<()> {
        with_driver(|driver| async move { Signin::new_from_driver(&driver).await })
            .await?
            .context("Driver early cacnel")??;
        Ok(())
    }

    #[tokio::test]
    async fn test_viewer() -> Result<()> {
        let img_tempdir = with_driver(|driver| async move {
            let viewer = Viewer::new_from_driver(&driver, ViewerKind::Manga, 30445).await?;
            let img_tempdir = viewer.download_imgs(&driver, |_| {}).await?;
            Result::<TempDir>::Ok(img_tempdir)
        })
        .await?
        .context("Driver early cacnel")??;

        let mut entries = fs::read_dir(img_tempdir.path()).await?;
        while let Some(entry) = entries.next_entry().await? {
            eprintln!("{:?}", entry.path());
        }

        Ok(())
    }
}
