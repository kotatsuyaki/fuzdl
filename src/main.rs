use anyhow::{bail, Context, Result};
use dialoguer::{Input, Password};
use tempfile::TempDir;
use thirtyfour::WebDriver;
use tokio::{fs, process::Command, task::spawn_blocking};

#[macro_use]
mod macros;
mod driver;
mod states;

#[tokio::main]
async fn main() -> Result<()> {
    let ret: Option<()> = driver::with_driver(|driver| async move {
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
async fn run(driver: WebDriver) -> Result<()> {
    let (email, password) = prompt_credentials().await?;

    let signin_state = states::Signin::new(&driver).await?;
    info!("Navigated to signin page");

    signin_state.signin(&driver, email, password).await?;
    info!("Successfully signed in");

    let url = prompt_viewer_url().await?;

    let tmpdir = create_tmpdir().await?;
    let pdf_filename = prompt_pdf_name().await?;

    let mut viewer = states::MangaViewerState::new(&driver, url).await?;
    let mut img_paths = vec![];
    loop {
        let data = viewer.img_data(&driver).await?;
        let page = viewer.page();

        info!("Got page {}", page);

        let img_filename = format!("{page:3}.jpg");
        let img_path = tmpdir.path().join(img_filename);
        img_paths.push(img_path.as_os_str().to_os_string());

        fs::write(img_path, &data).await?;

        if viewer.has_next_page().await? {
            viewer.next_page(&driver).await?;
        } else {
            break;
        }
    }

    info!("Running img2pdf");
    let status = Command::new("img2pdf")
        .args(img_paths)
        .arg("--output")
        .arg(pdf_filename)
        .status()
        .await?;
    if status.code() != Some(0) {
        bail!("img2pdf process returned non-zero status code");
    }

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

/// Prompt the user to input login credentials.
async fn prompt_viewer_url() -> Result<String> {
    let url: String =
        spawn_blocking(|| Input::new().with_prompt("Paste the viewer URL").interact())
            .await?
            .context("Failed to read email")?;
    Ok(url)
}

/// Prompt the user to input login credentials.
async fn prompt_pdf_name() -> Result<String> {
    let name: String = spawn_blocking(|| Input::new().with_prompt("Output PDF name").interact())
        .await?
        .context("Failed to read PDF name")?;
    Ok(name)
}

async fn create_tmpdir() -> Result<TempDir> {
    Ok(spawn_blocking(|| TempDir::new()).await??)
}
