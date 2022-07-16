use anyhow::Result;
use thirtyfour::{session::handle::SessionHandle, WebElement};

mod expect;
use expect::ElemExpect;

const SIGNIN_URL: &str = "https://comic-fuz.com/account/signin";
const SIGNIN_DONE_TEXT: &str = "ログインが完了しました。";

pub struct Signin {
    email_elem: WebElement,
    password_elem: WebElement,
    login_button_elem: WebElement,
}

impl Signin {
    pub async fn new(driver: &SessionHandle) -> Result<Self> {
        driver.get(SIGNIN_URL).await?;
        let signin_input_elements =
            ElemExpect::new_class_prefix("Signin Inputs", "signin_form__input")
                .with_count(2)
                .verify(&driver)
                .await?;
        let login_button_elem = ElemExpect::new_class_prefix("Login Button", "signin_form__button")
            .with_count(1)
            .verify(&driver)
            .await?[0]
            .clone();

        Ok(Self {
            email_elem: signin_input_elements[0].clone(),
            password_elem: signin_input_elements[1].clone(),
            login_button_elem,
        })
    }

    pub async fn signin(
        self,
        driver: &SessionHandle,
        email: impl AsRef<str>,
        password: impl AsRef<str>,
    ) -> Result<SigninDone> {
        self.email_elem.send_keys(email).await?;
        self.password_elem.send_keys(password).await?;
        self.login_button_elem.click().await?;
        SigninDone::new(driver).await
    }
}

/// Create using [`Signin::SigninDone`]
pub struct SigninDone {}

impl SigninDone {
    async fn new(driver: &SessionHandle) -> Result<Self> {
        ElemExpect::new_class_prefix("Signin Done Description", "signin_signin__description")
            .with_count(1)
            .with_text(SIGNIN_DONE_TEXT)
            .verify(&driver)
            .await?;
        Ok(Self {})
    }
}
