use std::fmt::Display;

use anyhow::{anyhow, bail, Context, Result};
use futures::{future, try_join};
use thirtyfour::components::{Component, ElementResolver};
use thirtyfour::prelude::*;

use super::BodyQueryable;

// State for the 購入済み tab of `/bookshelf`
#[derive(Component)]
pub struct Purchased {
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

    pub async fn list_magazines(&self) -> Result<Vec<MagazineMetadata>> {
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
