//! State types used to 1) verify and extract data from expected elements and 2) interact with the
//! pages.
//!
//! A state type like [`Signin`] waits for elements to be loaded and verifies the page before
//! constructing itself. Therefore, the existence of an object of a state type ensures that the
//! preconditions of the state has been met.

use anyhow::Result;
use thirtyfour::{session::handle::SessionHandle, WebElement};

mod expect;
use expect::ElemExpect;

const SIGNIN_URL: &str = "https://comic-fuz.com/account/signin";
const SIGNIN_DONE_TEXT: &str = "ログインが完了しました。";

/// State corresponding to the `/account/signin` page before any attempt to login.
pub struct Signin {
    email_elem: WebElement,
    password_elem: WebElement,
    login_button_elem: WebElement,
}

/// State corresponding to the `/account/signin` page after a successful login.
/// Create using [`Signin::signin`].
pub struct SigninDone {}

impl Signin {
    /// Navigate to the [`Signin`] state.
    pub async fn new(driver: &SessionHandle) -> Result<Self> {
        driver.get(SIGNIN_URL).await?;
        let [email_elem, password_elem] =
            ElemExpect::new_class_prefix("Signin Inputs", "signin_form__input")
                .with_count(2)
                .find_at(&driver, [0, 1])
                .await?;
        let login_button_elem = ElemExpect::new_class_prefix("Login Button", "signin_form__button")
            .with_count(1)
            .find_one(&driver)
            .await?;

        Ok(Self {
            email_elem,
            password_elem,
            login_button_elem,
        })
    }

    /// Interact with the sign elements and navigate to the [`SigninDone`] state.
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

impl SigninDone {
    async fn new(driver: &SessionHandle) -> Result<Self> {
        ElemExpect::new_class_prefix("Signin Done Description", "signin_signin__description")
            .with_count(1)
            .with_text(SIGNIN_DONE_TEXT)
            .find(&driver)
            .await?;
        Ok(Self {})
    }
}
