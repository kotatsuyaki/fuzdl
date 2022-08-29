//! Utilities to ensure that driver resources (e.g. driver and browser child processes) are cleaned
//! up.

use std::{future::Future, process::Stdio, time::Duration};

use anyhow::{Context, Result};
use thirtyfour::{DesiredCapabilities, WebDriver};
use tokio::process::{Child, Command};
use tokio::{select, time};

/// Create a [`WebDriver`] and run the callback function with the driver as the argument.
///
/// # Example
///
/// ```rust
/// driver::with_driver(|driver| async move {
///     driver.get("https://www.google.com").await.unwrap();
///     assert_eq!(driver.title().await.unwrap(), "Google");
/// })
/// .await
/// .unwrap();
/// ```
///
/// # Return Value
///
/// The outer `Result` is of the `Err` variant if an error occurs in the driver creation or cleanup
/// steps.
/// The inner `Option` is of the `None` variant if a kill signal is received before the callback
/// function completes.
/// In both cases, the driver resources are properly cleaned up before returning.
///
/// # Resource Leaks
///
/// In some cases, the resources may not be properly cleaned up. These cases include but are not
/// limited to:
///
/// - The callback function panics.
/// - The driver creation functions panics.
///
/// *When can we have support for async drop in Rust?*
pub async fn with_driver<Out, Fut: Future<Output = Out> + Send>(
    f: impl FnOnce(WebDriver) -> Fut + Send + 'static,
) -> Result<Option<Out>> {
    which::which("chromedriver").context("This tool requires 'chromedriver' in PATH.\nCommon distribution package names include 'chromedriver' and 'chromium-driver'.\nAlternatively, visit the download page of ChromeDriver: https://chromedriver.chromium.org/downloads")?;

    let mut driver_process = create_driver_process().await?;

    // This match is required,
    // since otherwise if driver creation fails, the driver process can't be properly killed.
    let driver = match create_driver().await {
        Ok(driver) => driver,
        Err(e) => {
            driver_process
                .kill()
                .await
                .context("Failed to kill driver process on driver creation failure")?;
            return Err(e);
        }
    };
    let driver_clone = driver.clone();

    let cleanup = || async move {
        let driver_quit_res = driver.quit().await.context("Failed to quit driver");
        let driver_proc_kill_res = driver_process
            .kill()
            .await
            .context("Failed to kill driver process");
        driver_quit_res.and(driver_proc_kill_res)?;

        Result::<()>::Ok(())
    };

    select! {
        res = f(driver_clone) => {
            cleanup().await?;
            Ok(Some(res))
        }
        _ = tokio::signal::ctrl_c() => {
            cleanup().await?;
            Ok(None)
        }
    }
}

async fn create_driver_process() -> Result<Child> {
    let child = Command::new("chromedriver")
        .arg("--port=4444")
        // Prevent IO from the child process messing up our IO
        .stdin(Stdio::null())
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .spawn()
        .context("Failed to spawn chromedriver")?;
    time::sleep(Duration::from_millis(500)).await;
    Ok(child)
}

async fn create_driver() -> Result<WebDriver> {
    let mut caps = DesiredCapabilities::chrome();
    caps.set_headless()?;
    caps.add_chrome_arg("--no-sandbox")?;

    let driver = WebDriver::new("http://localhost:4444", caps)
        .await
        .context("Failed to create WebDriver")?;

    // The width 1920/2 (which is small enough)
    // prevents Fuz from showing two manga pages at once
    driver
        .set_window_rect(0, 0, 1920 / 2, 1080)
        .await
        .context("Failed to set window rect")?;

    Ok(driver)
}
