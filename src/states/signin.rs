use anyhow::{bail, Result};
use thirtyfour::components::{Component, ElementResolver};
use thirtyfour::prelude::*;

use super::BodyQueryable;

// State for `/account/signin`
#[derive(Component)]
pub struct Signin {
    base: WebElement,

    #[by(
        wait(timeout_ms = 8000, interval_ms = 300),
        css = "[class^=signin_form__input][type=email]"
    )]
    email: ElementResolver<WebElement>,

    #[by(
        wait(timeout_ms = 8000, interval_ms = 300),
        css = "[class^=signin_form__input][type=password]"
    )]
    password: ElementResolver<WebElement>,

    #[by(
        wait(timeout_ms = 8000, interval_ms = 300),
        css = "[class^=signin_form__button]"
    )]
    button: ElementResolver<WebElement>,

    #[by(
        wait(timeout_ms = 8000, interval_ms = 300),
        css = "[class^=signin_signin__description]"
    )]
    done_description: ElementResolver<WebElement>,
}

impl Signin {
    pub async fn new_from_driver(driver: &WebDriver) -> Result<Self> {
        const SIGNIN_URL: &str = "https://comic-fuz.com/account/signin";
        driver.goto(SIGNIN_URL).await?;
        let body = driver.body().await?;
        Ok(Self::new(body))
    }

    pub async fn signin(
        self,
        user_email: impl AsRef<str>,
        user_password: impl AsRef<str>,
    ) -> Result<()> {
        let (email, password, button) = resolve_all!(self.email, self.password, self.button)?;

        email.send_keys(user_email).await?;
        password.send_keys(user_password).await?;
        button.click().await?;

        self.check_description().await
    }

    async fn check_description(&self) -> Result<()> {
        const SIGNIN_DONE_TEXT: &str = "ログインが完了しました。";
        let done_description = self.done_description.resolve().await?;
        let text = done_description.text().await?;

        if text != SIGNIN_DONE_TEXT {
            bail!(
                "Description text on signin '{}' does not match the expected '{}'",
                text,
                SIGNIN_DONE_TEXT
            );
        } else {
            Ok(())
        }
    }
}
