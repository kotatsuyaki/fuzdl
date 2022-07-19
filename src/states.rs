//! State types used to 1) verify and extract data from expected elements and 2) interact with the
//! pages.

use anyhow::{bail, Result};
use std::time::Duration;
use thirtyfour::{
    prelude::ElementQueryable, session::handle::SessionHandle, WebDriver, WebElement,
};
use thirtyfour_querier_derive::Querier;

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
}
