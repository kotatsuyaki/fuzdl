use std::{process::Stdio, time::Duration};

use anyhow::{Context, Result};
use dialoguer::{Confirm, Input, Password};
use thirtyfour::{DesiredCapabilities, WebDriver};
use tokio::{
    process::{Child, Command},
    task::spawn_blocking,
};

#[macro_use]
mod macros;
mod states;

#[tokio::main]
async fn main() -> Result<()> {
    let _gecko_process = create_geckodriver_process()?;
    let driver = create_driver().await?;

    // The `run` function is just for the error-catching boundary
    if let Err(e) = run(&driver).await {
        warn!("Encountered error: {}", e);
    }

    spawn_blocking(|| Confirm::new().with_prompt("Pause").interact()).await??;

    driver.close().await?;

    Ok(())
}

async fn run(driver: &WebDriver) -> Result<()> {
    let (email, password) = prompt_credentials().await?;

    let signin_state = states::Signin::new(&driver).await?;
    info!("Navigated to signin page");

    signin_state.signin(&driver, email, password).await?;
    info!("Successfully signed in");

    Ok(())
}

fn create_geckodriver_process() -> Result<Child> {
    Command::new("geckodriver")
        .arg("--host=127.0.0.1")
        .arg("--port=4444")
        .stdin(Stdio::null())
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .kill_on_drop(true)
        .spawn()
        .context("Failed to spawn geckodriver")
}

async fn create_driver() -> Result<WebDriver> {
    let driver = WebDriver::new("http://localhost:4444", DesiredCapabilities::firefox())
        .await
        .context("Failed to create WebDriver")?;
    driver
        .set_implicit_wait_timeout(Duration::from_secs(10))
        .await
        .context("Failed to set timeout for WebDriver")?;
    Ok(driver)
}

async fn prompt_credentials() -> Result<(String, String)> {
    let email: String = spawn_blocking(|| Input::new().with_prompt("Email").interact())
        .await?
        .context("Failed to read email")?;
    let password = spawn_blocking(|| Password::new().with_prompt("Password").interact())
        .await?
        .context("Failed to read password")?;
    Ok((email, password))
}
