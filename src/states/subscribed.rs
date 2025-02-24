use std::fmt::Display;

use anyhow::{anyhow, bail, Context, Result};
use futures::{future, try_join};
use thirtyfour::components::{Component, ElementResolver};
use thirtyfour::prelude::*;

use super::BodyQueryable;

// State for the 月額プラン tab of `/bookshelf`
#[derive(Component)]
pub struct Subscribed {
    base: WebElement,

    #[by(
        wait(timeout_ms = 8000, interval_ms = 300),
        css = "[class^=Selector_selector__option__]"
    )]
    selector_options: ElementResolver<Vec<WebElement>>,

    #[by(
        wait(timeout_ms = 8000, interval_ms = 300),
        css = "a[class^=Magazine_magazine__]"
    )]
    magazines: ElementResolver<Vec<SubscribedMagazine>>,
}

#[derive(Component, Clone)]
struct SubscribedMagazine {
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

impl Subscribed {
    pub async fn new_from_driver(driver: &WebDriver) -> Result<Self> {
        const BOOKSHELF_URL: &str = "https://comic-fuz.com/bookshelf";

        driver.goto(BOOKSHELF_URL).await?;
        let body = driver.body().await?;
        Self::new(body).navigate_to_subscribed_tab().await
    }

    async fn navigate_to_subscribed_tab(self) -> Result<Self> {
        const SUBSCRIBED_TEXT: &str = "月額プラン";

        let selector_options = self.selector_options.resolve().await?;
        let subscribed_option = selector_options
            .get(3)
            .ok_or(anyhow!("No enough tabs present on the bookshelf page"))?;
        if subscribed_option.text().await? != SUBSCRIBED_TEXT {
            bail!(
                "The 3rd tab on the bookshelf page is not '{}'",
                SUBSCRIBED_TEXT
            );
        }
        subscribed_option.click().await?;
        Ok(self)
    }

    pub async fn list_magazines(&self) -> Result<Vec<MagazineMetadata>> {
        let magazines = self.magazines.resolve().await?;
        future::try_join_all(magazines.into_iter().map(SubscribedMagazine::into_metadata)).await
    }
}

impl SubscribedMagazine {
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
