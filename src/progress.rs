use std::fmt::Display;
use std::time::Duration;

#[derive(Clone, Copy)]
pub struct Progress {
    pub done: usize,
    pub total: usize,
}

pub struct ProgressBar {
    pb: indicatif::ProgressBar,
}

const TEMPLATE: &'static str =
    "{spinner} {elapsed_precise} [{bar:.cyan/blue}] {pos:>3}/{len:3}P ({per_sec} / ETA {eta_precise})";

impl ProgressBar {
    pub fn create_and_show(operation_name: impl AsRef<str>, item: &impl Display) -> Self {
        info!(
            "{} {}",
            operation_name.as_ref(),
            console::style(item).green()
        );

        let pb = indicatif::ProgressBar::new(0);
        let style = indicatif::ProgressStyle::with_template(TEMPLATE)
            .unwrap()
            .progress_chars("#>-");
        pb.set_style(style);
        pb.enable_steady_tick(Duration::from_millis(500));

        Self { pb }
    }

    pub fn update(&self, progress: Progress) {
        let (done, total) = (progress.done as u64, progress.total as u64);
        if self.pb.length().unwrap() != total {
            self.pb.set_length(total);
        }

        self.pb.set_position(done);
    }

    pub fn finish(self) {
        self.pb.finish();
    }
}

impl Drop for ProgressBar {
    fn drop(&mut self) {
        self.pb.finish();
    }
}
