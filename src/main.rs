use anyhow::{Context, Result};
use dialoguer::{Input, Password};
use thirtyfour::session::handle::SessionHandle;
use tokio::task::spawn_blocking;

#[macro_use]
mod macros;
mod driver;
mod states;

#[tokio::main]
async fn main() -> Result<()> {
    let ret: Option<()> = driver::with_driver(|driver| async {
        if let Err(e) = run(driver).await {
            warn!("Encountered error: {}", e);
        }
    })
    .await?;
    if ret.is_none() {
        info!("Task aborted");
        std::process::exit(1);
    }

    Ok(())
}

/// The actual main logic.
async fn run(driver: SessionHandle) -> Result<()> {
    let (email, password) = prompt_credentials().await?;

    let signin_state = states::Signin::new(&driver).await?;
    info!("Navigated to signin page");

    signin_state.signin(&driver, email, password).await?;
    info!("Successfully signed in");

    let _serial_catalog_state = states::SerialCatalog::new(&driver).await?;

    Ok(())
}

/// Prompt the user to input login credentials.
async fn prompt_credentials() -> Result<(String, String)> {
    let email: String = spawn_blocking(|| Input::new().with_prompt("Email").interact())
        .await?
        .context("Failed to read email")?;
    let password = spawn_blocking(|| Password::new().with_prompt("Password").interact())
        .await?
        .context("Failed to read password")?;
    Ok((email, password))
}
