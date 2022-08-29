use std::collections::HashSet;
use std::fmt::Display;

use anyhow::{bail, Result};
use futures::future;
use serde::Deserialize;
use serde_json as json;
use thirtyfour::components::{Component, ElementResolver};
use thirtyfour::prelude::*;

use super::BodyQueryable;

#[derive(Component)]
pub struct Magazine {
    base: WebElement,

    #[by(wait(timeout_ms = 8000, interval_ms = 300), css = "#__NEXT_DATA__")]
    json_data: ElementResolver<WebElement>,

    #[by(
        wait(timeout_ms = 8000, interval_ms = 300),
        css = "[class^=MagazineIssueDetail_magazineIssueDetail__topSection__]"
    )]
    issue_elements: ElementResolver<Vec<MagazineIssueElement>>,
}

#[derive(Component, Clone)]
struct MagazineIssueElement {
    base: WebElement,

    #[by(
        nowait,
        css = "[class^=MagazineIssueDetail_magazineIssueDetail__name__]"
    )]
    name: ElementResolver<WebElement>,

    #[by(
        nowait,
        css = "[class^=MagazineIssueDetail_magazineIssueDetail__readButton__]"
    )]
    read_button: ElementResolver<WebElement>,
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

impl Magazine {
    pub async fn new_from_driver(driver: &WebDriver, href: impl AsRef<str>) -> Result<Self> {
        driver.goto(href.as_ref()).await?;
        let body = driver.body().await?;
        Ok(Self::new(body))
    }

    pub async fn list_viewable_issues(&self) -> Result<Vec<MagazineIssue>> {
        let mut magazine_issues = self.list_issues().await?;
        if let Err(e) = self.retain_viewable_issues(&mut magazine_issues).await {
            warn!("Failed to filter out non-free content: {e}");
        }
        Ok(magazine_issues)
    }

    async fn retain_viewable_issues(&self, magazine_issues: &mut Vec<MagazineIssue>) -> Result<()> {
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
        magazine_issues.retain(|issue| viewable_names.contains(&issue.magazine_issue_name));
        Ok(())
    }

    async fn list_issues(&self) -> Result<Vec<MagazineIssue>> {
        let json_data = self.json_data.resolve().await?;
        let json_text = json_data.inner_html().await?;
        let json_obj: json::Value = json::from_str(&json_text)?;
        let magazine_issues = json_obj["props"]["pageProps"]["magazineIssues"].clone();

        if magazine_issues.is_array() == false {
            bail!("JSON data does not contain array at .props.pageProps.magazineIssues");
        }

        let magazine_issues: Vec<MagazineIssue> = json::from_value(magazine_issues)?;
        Ok(magazine_issues)
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
