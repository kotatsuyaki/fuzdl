use std::collections::HashSet;
use std::fmt::Display;

use anyhow::{bail, Result};
use futures::future;
use serde::Deserialize;
use serde_json as json;
use thirtyfour::components::{Component, ElementResolver};
use thirtyfour::prelude::*;

use super::BodyQueryable;

/// 単行本s at /book/<id>
#[derive(Component)]
pub struct Book {
    base: WebElement,

    #[by(wait(timeout_ms = 8000, interval_ms = 300), css = "#__NEXT_DATA__")]
    json_data: ElementResolver<WebElement>,

    #[by(
        wait(timeout_ms = 8000, interval_ms = 300),
        css = "[class^=Wishlist_wishlist__topSection__]"
    )]
    issue_elements: ElementResolver<Vec<BookIssueElement>>,
}

#[derive(Component, Clone)]
struct BookIssueElement {
    base: WebElement,

    #[by(nowait, css = "[class^=Wishlist_wishlist__name__]")]
    name: ElementResolver<WebElement>,

    #[by(nowait, css = "[class^=Wishlist_wishlist__readButton__]")]
    read_button: ElementResolver<WebElement>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BookIssue {
    pub book_issue_id: usize,
    pub book_issue_name: String,
    pub thumbnail_url: Option<String>,
    pub paid_point: Option<usize>,
    pub campaign_paid_point: Option<usize>,
    pub is_discount_campaign: Option<bool>,
    pub is_free_campaign: Option<bool>,
    pub number_of_sample_pages: Option<usize>,
    pub updated_date: Option<String>,
    pub first_page_image_url: Option<String>,
    pub campaign: Option<String>,
    pub long_description: Option<String>,
}

impl Book {
    pub async fn new_from_driver(driver: &WebDriver, href: impl AsRef<str>) -> Result<Self> {
        driver.goto(href.as_ref()).await?;
        let body = driver.body().await?;
        Ok(Self::new(body))
    }

    pub async fn name(&self) -> Result<String> {
        let json_data = self.json_data.resolve().await?;
        let json_text = json_data.inner_html().await?;
        let json_obj: json::Value = json::from_str(&json_text)?;

        let book_name = json_obj["props"]["pageProps"]["bookName"].clone();
        if book_name.is_string() == false {
            bail!("JSON data does not contain string at .props.pageProps.bookName");
        }

        let book_name: String = json::from_value(book_name)?;
        Ok(book_name)
    }

    pub async fn list_viewable_issues(&self) -> Result<Vec<BookIssue>> {
        let mut book_issues = self.list_issues().await?;
        if let Err(e) = self.retain_viewable_issues(&mut book_issues).await {
            warn!("Failed to filter out non-free content: {e}");
        }
        Ok(book_issues)
    }

    async fn retain_viewable_issues(&self, book_issues: &mut Vec<BookIssue>) -> Result<()> {
        let issue_elements = self.issue_elements.resolve().await?;

        // (name, bool) pairs indicating whether "name" is free to view
        let viewable_pairs =
            future::try_join_all(issue_elements.into_iter().map(|elem| async move {
                let name = elem.name.resolve().await?;
                let text = name.text().await?;
                let is_viewable = elem.read_button.resolve().await.is_ok();
                Result::<(String, bool)>::Ok((text, is_viewable))
            }))
            .await?;
        let viewable_names: HashSet<_> = viewable_pairs
            .into_iter()
            .filter_map(|(name, is_viewable)| if is_viewable { Some(name) } else { None })
            .collect();
        book_issues.retain(|issue| viewable_names.contains(&issue.book_issue_name));
        Ok(())
    }

    pub(super) async fn list_issues(&self) -> Result<Vec<BookIssue>> {
        let json_data = self.json_data.resolve().await?;
        let json_text = json_data.inner_html().await?;
        let json_obj: json::Value = json::from_str(&json_text)?;
        let book_issues = json_obj["props"]["pageProps"]["bookIssues"].clone();

        if book_issues.is_array() == false {
            bail!("JSON data does not contain array at .props.pageProps.bookIssues");
        }
        let book_issues: Vec<BookIssue> = json::from_value(book_issues)?;

        Ok(book_issues)
    }
}

impl Display for BookIssue {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{} ({})", self.book_issue_name, self.book_issue_id)
    }
}
