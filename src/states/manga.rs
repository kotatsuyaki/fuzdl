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
pub struct Manga {
    base: WebElement,

    #[by(wait(timeout_ms = 8000, interval_ms = 300), css = "#__NEXT_DATA__")]
    json_data: ElementResolver<WebElement>,

    #[by(
        wait(timeout_ms = 8000, interval_ms = 300),
        css = "a[class^=Chapter_chapter__]"
    )]
    chapter_elements: ElementResolver<Vec<MangaChapterElement>>,
}

#[derive(Component, Clone)]
struct MangaChapterElement {
    base: WebElement,

    #[by(nowait, css = "[class^=Chapter_chapter__name__]")]
    name: ElementResolver<WebElement>,

    #[by(nowait, css = "p[class^=Chapter_chapter__price_free__]")]
    free_tag: ElementResolver<WebElement>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MangaBook {
    pub chapters: Vec<MangaChapter>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MangaChapter {
    pub chapter_id: usize,
    pub chapter_main_name: String,

    pub thumbnail_url: Option<String>,
    pub number_of_likes: Option<usize>,
    pub updated_date: Option<String>,
    pub first_page_image_url: Option<String>,
    pub point_cunsumption: Option<MangaPointConsumption>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct MangaPointConsumption {
    pub amount: usize,
}

impl Manga {
    pub async fn new_from_driver(driver: &WebDriver, href: impl AsRef<str>) -> Result<Self> {
        driver.goto(href.as_ref()).await?;
        let body = driver.body().await?;
        Ok(Self::new(body))
    }

    pub async fn name(&self) -> Result<String> {
        let json_data = self.json_data.resolve().await?;
        let json_text = json_data.inner_html().await?;
        let json_obj: json::Value = json::from_str(&json_text)?;

        let manga_name = json_obj["props"]["pageProps"]["manga"]["mangaName"].clone();
        if manga_name.is_string() == false {
            bail!("JSON data does not contain string at .props.pageProps.manga.mangaName");
        }

        let manga_name: String = json::from_value(manga_name)?;
        Ok(manga_name)
    }

    pub async fn list_viewable_chapters(&self) -> Result<Vec<MangaChapter>> {
        let mut manga_chapters = self.list_chapters().await?;
        if let Err(e) = self.retain_viewable_chapters(&mut manga_chapters).await {
            warn!("Failed to filter out non-free content: {e}");
        }
        Ok(manga_chapters)
    }

    async fn retain_viewable_chapters(&self, manga_chapters: &mut Vec<MangaChapter>) -> Result<()> {
        let chapter_elements = self.chapter_elements.resolve().await?;

        // (name, bool) pairs indicating whether "name" is free to view
        let viewable_pairs =
            future::try_join_all(chapter_elements.into_iter().map(|elem| async move {
                let name = elem.name.resolve().await?;
                let text = name.text().await?;
                let is_viewable = elem.free_tag.resolve().await.is_ok();
                Result::<(String, bool)>::Ok((text, is_viewable))
            }))
            .await?;
        let viewable_names: HashSet<_> = viewable_pairs
            .into_iter()
            .filter_map(|(name, is_viewable)| if is_viewable { Some(name) } else { None })
            .collect();
        manga_chapters.retain(|chapter| viewable_names.contains(&chapter.chapter_main_name));
        Ok(())
    }

    async fn list_chapters(&self) -> Result<Vec<MangaChapter>> {
        let json_data = self.json_data.resolve().await?;
        let json_text = json_data.inner_html().await?;
        let json_obj: json::Value = json::from_str(&json_text)?;
        let manga_books = json_obj["props"]["pageProps"]["chapters"].clone();

        if manga_books.is_array() == false {
            bail!("JSON data does not contain array at .props.pageProps.chapters");
        }
        let manga_books: Vec<MangaBook> = json::from_value(manga_books)?;
        let manga_chapters = manga_books
            .into_iter()
            .map(|book| book.chapters.into_iter())
            .flatten()
            .collect();

        Ok(manga_chapters)
    }
}

impl Display for MangaChapter {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{} ({})", self.chapter_main_name, self.chapter_id)
    }
}
