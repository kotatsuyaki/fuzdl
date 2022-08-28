use std::fmt::Display;
use std::path::Path;
use std::time::Duration;

use anyhow::{Context, Result};
use console::{style, Term};
use dialoguer::theme::ColorfulTheme;
use dialoguer::{Input, MultiSelect, Password, Select};
use indicatif::{ProgressBar, ProgressStyle};
use serde::{Deserialize, Serialize};
use serde_json as json;
use thirtyfour::WebDriver;
use tokio::fs;
use tokio::task::spawn_blocking;

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

async fn run(driver: WebDriver) -> Result<()> {
    let credentials = Credentials::read_or_prompt("credentials.json").await?;

    let signin_state = states::Signin::new_from_driver(&driver).await?;
    signin_state
        .signin(credentials.email, credentials.password)
        .await?;
    info!("Successfully signed in");

    let purchased_state = states::Purchased::new_from_driver(&driver).await?;
    let magazines = purchased_state.list_megazines().await?;
    let selected_megazine = prompt_select("Select a magazine", &magazines).await?;

    let megazine_state =
        states::Magazine::new_from_driver(&driver, &selected_megazine.href).await?;
    let megazine_issues = megazine_state.list_issues().await?;
    let selected_issues = prompt_multi_select(
        "Press <SPACE> to select megazine issue(s)",
        &megazine_issues,
    )
    .await?;

    for issue in selected_issues {
        let id = issue.magazine_issue_id;
        let viewer_state =
            states::Viewer::new_from_driver(&driver, states::ViewerKind::Magazine, id).await?;

        let pb = new_download_progressbar(&issue);
        viewer_state
            .download_imgs(&driver, |progress| {
                let (done, total) = (progress.done as u64, progress.total as u64);
                if pb.length().unwrap() != total {
                    pb.set_length(total);
                }

                pb.set_position(done);
            })
            .await?;
        pb.finish_with_message(format!("Finished downloading {}", issue));

        spawn_blocking(|| {
            dialoguer::Confirm::new()
                .with_prompt("Press enter to continue")
                .interact()
        })
        .await??;
    }

    Ok(())
}

#[derive(Serialize, Deserialize)]
struct Credentials {
    email: String,
    password: String,
}

impl Credentials {
    async fn read_or_prompt<P: AsRef<Path>>(path: P) -> Result<Self> {
        if let Ok(credentials) = Self::read_from_file(&path).await {
            Ok(credentials)
        } else {
            let credentials = Self::prompt().await?;
            if let Err(e) = credentials.store_to_file(&path).await {
                warn!("Failed to store credentials: {:?}", e);
            }
            Ok(credentials)
        }
    }

    async fn prompt() -> Result<Self> {
        let email: String = spawn_blocking(|| Input::new().with_prompt("Email").interact())
            .await?
            .context("Failed to read email")?;
        let password: String =
            spawn_blocking(|| Password::new().with_prompt("Password").interact())
                .await?
                .context("Failed to read password")?;

        Ok(Self { email, password })
    }

    async fn store_to_file(&self, path: impl AsRef<Path>) -> Result<()> {
        let serialized = json::to_string(self)?;
        fs::write(path, &serialized).await?;

        Ok(())
    }

    async fn read_from_file(path: impl AsRef<Path>) -> Result<Self> {
        let serialized = fs::read(path).await?;
        Ok(json::from_slice(&serialized)?)
    }
}

async fn prompt_select<'a, Item: Clone + Display + 'static>(
    prompt: impl AsRef<str>,
    options: impl IntoIterator<Item = &'a Item>,
) -> Result<&'a Item> {
    let prompt = prompt.as_ref().to_string();
    let options: Vec<&Item> = options.into_iter().collect();
    let descriptions: Vec<String> = options.iter().map(|option| format!("{option}")).collect();

    let index = spawn_blocking(move || {
        Select::with_theme(&ColorfulTheme::default())
            .with_prompt(prompt)
            .items(&descriptions)
            .default(0)
            .interact_on_opt(&Term::stderr())
    })
    .await??
    .context("No item selected")?;

    Ok(options[index])
}

async fn prompt_multi_select<'a, Item: Clone + Display + 'static>(
    prompt: impl AsRef<str>,
    options: impl IntoIterator<Item = &'a Item>,
) -> Result<Vec<&'a Item>> {
    let prompt = prompt.as_ref().to_string();
    let mut options: Vec<&Item> = options.into_iter().collect();
    let descriptions: Vec<String> = options.iter().map(|option| format!("{option}")).collect();

    let theme = {
        let mut theme = ColorfulTheme::default();
        theme.unchecked_item_prefix = style("[ ]".to_string()).for_stderr();
        theme.checked_item_prefix = style("[x]".to_string()).for_stderr().green();
        theme
    };

    let selected_indices = spawn_blocking(move || {
        MultiSelect::with_theme(&theme)
            .with_prompt(prompt)
            .items(&descriptions)
            .interact_on_opt(&Term::stderr())
    })
    .await??
    .context("No item selected")?;

    // retain only selected options
    let mut index = 0;
    options.retain(|_| {
        index += 1;
        selected_indices.contains(&(index - 1))
    });

    Ok(options)
}

fn new_download_progressbar(item_name: &impl Display) -> ProgressBar {
    info!("Downloading {}", console::style(item_name).green());

    let pb = ProgressBar::new(0);
    let style = ProgressStyle::with_template(
        "{spinner} {elapsed_precise} [{bar:.cyan/blue}] {pos:>3}/{len:3}P ({per_sec} / ETA {eta_precise})",
    )
    .unwrap()
    .progress_chars("#>-");
    pb.set_style(style);
    pb.enable_steady_tick(Duration::from_secs(1));
    pb
}
