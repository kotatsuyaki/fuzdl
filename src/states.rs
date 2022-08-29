//! State types used to 1) verify and extract data from expected elements and 2) interact with the
//! pages.

#![allow(dead_code)]

use anyhow::{Context, Result};
use futures::Future;
use thirtyfour::prelude::*;

/// Concurrently run `.resolve()` on all input [`ElementResolver`]s, returning a
/// `Result<(WebElement, WebElement, ...)>`.
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

mod signin;
pub use signin::Signin;

mod purchased;
pub use purchased::{MagazineMetadata, Purchased};

mod magazine;
pub use magazine::{Magazine, MagazineIssue};

mod manga;
pub use manga::{Manga, MangaBook, MangaChapter, MangaPointConsumption};

mod viewer;
pub use viewer::{DownloadOutput, TocEntry, Viewer, ViewerLocation};

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
    use tokio::fs;

    #[tokio::test]
    async fn test_signin() -> Result<()> {
        with_driver(|driver| async move { Signin::new_from_driver(&driver).await })
            .await?
            .context("Driver early cacnel")??;
        Ok(())
    }

    #[tokio::test]
    async fn test_viewer() -> Result<()> {
        let download_output = with_driver(|driver| async move {
            let viewer = Viewer::new_from_driver(&driver, ViewerLocation::new_manga(30445)).await?;
            let download_output = viewer.download_imgs(&driver, |_| {}).await?;
            Result::<DownloadOutput>::Ok(download_output)
        })
        .await?
        .context("Driver early cacnel")??;

        let mut entries = fs::read_dir(download_output.tempdir).await?;
        while let Some(entry) = entries.next_entry().await? {
            eprintln!("{:?}", entry.path());
        }

        Ok(())
    }
}
