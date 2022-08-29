use std::collections::HashMap;
use std::env;
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
use states::TocEntry;
use thirtyfour::WebDriver;
use tokio::fs;
use tokio::task::spawn_blocking;

#[macro_use]
mod macros;
mod driver;
mod images_to_pdf;
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

#[derive(Clone, Copy)]
enum DownloadKind {
    Manga,
    Magazine,
}

impl Display for DownloadKind {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            DownloadKind::Manga => write!(f, "Manga"),
            DownloadKind::Magazine => write!(f, "Magazine"),
        }
    }
}

enum DownloadTask {
    Magazine {
        issue: states::MagazineIssue,
    },
    Manga {
        name: String,
        chapter: states::MangaChapter,
    },
}

impl DownloadTask {
    fn pdf_title(&self) -> String {
        match self {
            DownloadTask::Magazine { issue } => {
                format!("{} {}", issue.magazine_issue_name, issue.magazine_name)
            }
            DownloadTask::Manga { name, chapter } => {
                format!("{} {}", name, chapter.chapter_main_name)
            }
        }
    }

    fn viewer_location(&self) -> states::ViewerLocation {
        match self {
            DownloadTask::Magazine { issue } => {
                states::ViewerLocation::new_magazine(issue.magazine_issue_id)
            }
            DownloadTask::Manga { chapter, .. } => {
                states::ViewerLocation::new_manga(chapter.chapter_id)
            }
        }
    }
}

impl Display for DownloadTask {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let display: &dyn Display = match self {
            DownloadTask::Magazine { ref issue } => issue,
            DownloadTask::Manga { ref chapter, .. } => chapter,
        };
        write!(f, "{}", display)
    }
}

async fn run(driver: WebDriver) -> Result<()> {
    let credentials = Credentials::read_or_prompt("credentials.json").await?;

    let signin_state = states::Signin::new_from_driver(&driver).await?;
    signin_state
        .signin(credentials.email, credentials.password)
        .await?;
    info!("Successfully signed in");

    let download_kind = prompt_select(
        "Choose kind of content to download",
        &[DownloadKind::Manga, DownloadKind::Magazine],
    )
    .await?;

    let download_tasks = match download_kind {
        DownloadKind::Manga => prompt_manga(&driver).await?,
        DownloadKind::Magazine => prompt_magazine(&driver).await?,
    };

    for task in download_tasks {
        let viewer_state = states::Viewer::new_from_driver(&driver, task.viewer_location()).await?;

        let toc = viewer_state
            .fetch_toc_entries()
            .await
            .map(toc_entries_to_hashmap)
            .unwrap_or_default();

        let pb = new_progressbar("Downloading", &task);
        let download_output = viewer_state
            .download_imgs(&driver, |progress| {
                let (done, total) = (progress.done as u64, progress.total as u64);
                if pb.length().unwrap() != total {
                    pb.set_length(total);
                }

                pb.set_position(done);
            })
            .await?;
        pb.finish_with_message(format_finished_task(&task));
        drop(pb);

        let pdf_title = task.pdf_title();
        let pdf_filename = format!("{pdf_title}.pdf");
        let pdf_path = env::current_dir()
            .context("Failed to get working directory")?
            .join("output")
            .join(pdf_filename);

        let pb = new_progressbar("Exporting PDF", &task);
        let pdf_config = images_to_pdf::PdfConfig {
            title: &pdf_title,
            toc,
            image_paths: download_output.image_paths(),
            pdf_path: &pdf_path,
        };
        images_to_pdf::build_pdf(pdf_config, |progress| {
            let (done, total) = (progress.done as u64, progress.total as u64);
            if pb.length().unwrap() != total {
                pb.set_length(total);
            }
            pb.set_position(done);
        })?;
        info!("Saved to PDF file at {}", pdf_path.to_string_lossy());
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
        let email: String = prompt_string("Email").await?;
        let password: String = prompt_password("Password").await?;

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

async fn prompt_magazine(driver: &WebDriver) -> Result<Vec<DownloadTask>> {
    let purchased_state = states::Purchased::new_from_driver(&driver).await?;
    let magazines = purchased_state.list_magazines().await?;
    let selected_megazine = prompt_select("Select a magazine", &magazines).await?;

    let megazine_state =
        states::Magazine::new_from_driver(&driver, &selected_megazine.href).await?;
    let megazine_issues = megazine_state.list_viewable_issues().await?;
    let selected_issues = prompt_multi_select(
        "Press <SPACE> to select megazine issue(s)",
        &megazine_issues,
    )
    .await?;

    Ok(selected_issues
        .into_iter()
        .cloned()
        .map(|issue| DownloadTask::Magazine { issue })
        .collect())
}

async fn prompt_manga(driver: &WebDriver) -> Result<Vec<DownloadTask>> {
    let manga_url =
        prompt_string("Paste manga URL (for example 'https://comic-fuz.com/manga/418')").await?;

    let manga_state = states::Manga::new_from_driver(driver, &manga_url).await?;
    let manga_name = manga_state.name().await?;
    let manga_chapters = manga_state.list_viewable_chapters().await?;

    let select_prompt = format!("Press <SPACE> to select chapters from {}", manga_name);
    let selected_chapters = prompt_multi_select(&select_prompt, &manga_chapters).await?;

    Ok(selected_chapters
        .into_iter()
        .cloned()
        .map(|chapter| DownloadTask::Manga {
            name: manga_name.clone(),
            chapter,
        })
        .collect())
}

async fn prompt_string(prompt: impl AsRef<str>) -> Result<String> {
    let prompt = format!("{}", style(prompt.as_ref().to_string()).bold());
    let output: String = spawn_blocking(|| Input::new().with_prompt(prompt).interact()).await??;
    Ok(output)
}

async fn prompt_password(prompt: impl AsRef<str>) -> Result<String> {
    let prompt = format!("{}", style(prompt.as_ref().to_string()).bold());
    let output: String =
        spawn_blocking(|| Password::new().with_prompt(prompt).interact()).await??;
    Ok(output)
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

fn new_progressbar(prefix: impl AsRef<str>, item_name: &impl Display) -> ProgressBar {
    info!("{} {}", prefix.as_ref(), console::style(item_name).green());

    let pb = ProgressBar::new(0);
    let style = ProgressStyle::with_template(
        "{msg}{spinner} {elapsed_precise} [{bar:.cyan/blue}] {pos:>3}/{len:3}P ({per_sec} / ETA {eta_precise})",
    )
    .unwrap()
    .progress_chars("#>-");
    pb.set_style(style);
    pb.enable_steady_tick(Duration::from_secs(1));
    pb
}

fn format_finished_task(task: &DownloadTask) -> String {
    format!(
        "{} {}",
        style("Finished downloading".to_string()).cyan(),
        style(task).green()
    )
}

fn toc_entries_to_hashmap(toc_entries: Vec<TocEntry>) -> HashMap<usize, String> {
    toc_entries
        .into_iter()
        .map(|entry| (entry.index, entry.name))
        .collect()
}
