use std::path::PathBuf;
use std::time::Duration;

use anyhow::{Context, Result};
use futures::future;
use tempfile::TempDir;
use thirtyfour::components::{Component, ElementResolver};
use thirtyfour::prelude::*;
use tokio::fs;
use tokio::task::spawn_blocking;

use super::BodyQueryable;
use crate::progress::Progress;

#[derive(Component)]
pub struct Viewer {
    #[base]
    body: WebElement,

    #[by(
        wait(timeout_ms = 8000, interval_ms = 300),
        css = "[class^=ViewerFooter_footer__page]"
    )]
    page_counter: ElementResolver<WebElement>,

    #[by(
        wait(timeout_ms = 8000, interval_ms = 300),
        css = "[class^=ViewerFooter_footer__tableOfContents__]"
    )]
    toc_button: ElementResolver<WebElement>,

    #[by(
        wait(timeout_ms = 8000, interval_ms = 300),
        css = "[class^=ViewerIndexModal_dialog__cell__]"
    )]
    toc_elements: ElementResolver<Vec<TocElement>>,
}

#[derive(Component, Clone)]
struct TocElement {
    base: WebElement,

    #[by(nowait, css = "[class^=ViewerIndexModal_dialog__name__]")]
    name: ElementResolver<WebElement>,

    #[by(nowait, css = "p[class^=ViewerIndexModal_dialog__index__]")]
    index: ElementResolver<WebElement>,
}

pub struct TocEntry {
    pub name: String,
    pub index: usize,
}

pub enum ViewerLocation {
    Magazine(usize),
    Manga(usize),
}

impl Viewer {
    pub async fn new_from_driver(driver: &WebDriver, location: ViewerLocation) -> Result<Self> {
        driver.goto(location.url()).await?;
        let body = driver.body().await?;
        Ok(Self::new(body))
    }

    pub async fn download_imgs(
        &self,
        driver: &WebDriver,
        update_progress: impl Fn(Progress),
    ) -> Result<DownloadOutput> {
        let mut downloaded_image_paths = vec![];
        let tempdir = spawn_blocking(|| TempDir::new()).await??;

        let number_of_pages = self.number_of_pages().await?;
        update_progress(Progress {
            done: 0,
            total: number_of_pages,
        });

        while downloaded_image_paths.len() < number_of_pages {
            let page_number = downloaded_image_paths.len();
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
            downloaded_image_paths.push(filepath);

            update_progress(Progress {
                done: downloaded_image_paths.len(),
                total: number_of_pages,
            });

            self.body
                .send_keys(Key::Left.to_string())
                .await
                .context("Failed to send left key")?;
        }

        Ok(DownloadOutput {
            tempdir,
            image_paths: downloaded_image_paths,
        })
    }

    pub async fn fetch_toc_entries(&self) -> Result<Vec<TocEntry>> {
        let toc_button = self.toc_button.resolve().await?;
        toc_button.click().await?;

        let toc_elements = self.toc_elements.resolve().await?;
        let toc_entries = future::try_join_all(toc_elements.into_iter().map(|elem| async move {
            let (name, index) = resolve_all!(elem.name, elem.index)?;
            let name: String = name.text().await?;
            let index: usize = index.text().await?.parse()?;
            Result::<TocEntry>::Ok(TocEntry { name, index })
        }))
        .await?;

        Ok(toc_entries)
    }

    async fn number_of_pages(&self) -> Result<usize> {
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
}

impl ViewerLocation {
    pub fn new_manga(id: usize) -> Self {
        Self::Manga(id)
    }

    pub fn new_magazine(id: usize) -> Self {
        Self::Magazine(id)
    }

    pub fn url(&self) -> String {
        let (kind, id) = match self {
            ViewerLocation::Magazine(id) => ("magazine", id),
            ViewerLocation::Manga(id) => ("manga", id),
        };
        format!("https://comic-fuz.com/{kind}/viewer/{id}")
    }
}

pub struct DownloadOutput {
    pub(super) tempdir: TempDir,
    pub(super) image_paths: Vec<PathBuf>,
}

impl DownloadOutput {
    pub fn image_paths(&self) -> Vec<PathBuf> {
        self.image_paths.clone()
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
