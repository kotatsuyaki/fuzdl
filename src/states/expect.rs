use anyhow::{bail, Context, Result};
use thirtyfour::{session::handle::SessionHandle, By, WebElement};

#[derive(Debug, Clone)]
pub struct ElemExpect {
    /// Display name for this element for debugging purpose
    name: String,
    /// Selector condition
    by: By,
    /// Holder for (potentially existent) selector string used in `by`
    _selector_string: Option<String>,
    /// Expected conditions
    conditions: Vec<ExpectCondition>,
}

impl ElemExpect {
    pub fn new_class_prefix<NAME: AsRef<str>, PREFIX: AsRef<str>>(
        name: NAME,
        prefix: PREFIX,
    ) -> Self {
        let name = name.as_ref().to_string();
        let prefix = prefix.as_ref().to_string();
        let selector_string = Some(format!("[class^={prefix}]"));
        let by = By::Css(selector_string.as_ref().unwrap());
        Self {
            name,
            by,
            _selector_string: selector_string,
            conditions: vec![],
        }
    }

    pub fn with_count(mut self, count: usize) -> Self {
        self.conditions.push(ExpectCondition::Count(count));
        self
    }

    pub fn with_text(mut self, text: impl AsRef<str>) -> Self {
        self.conditions
            .push(ExpectCondition::Text(text.as_ref().to_string()));
        self
    }

    pub async fn verify(&self, driver: &SessionHandle) -> Result<Vec<WebElement>> {
        let elements = driver
            .find_elements(self.by.clone())
            .await
            .context("Failed to find elements")?;
        for condition in self.conditions.iter() {
            let is_fulfilled = condition.is_fulfilled(&elements).await?;
            if is_fulfilled {
                continue;
            }

            let current_url = driver.current_url().await?;
            let element_name = &self.name;
            bail!("The `{element_name}` element(s) found at url `{current_url}` failed the condition: `{condition:?}`");
        }
        Ok(elements)
    }
}

#[derive(Debug, Clone)]
enum ExpectCondition {
    Count(usize),
    Text(String),
}

impl ExpectCondition {
    async fn is_fulfilled(&self, elements: &[WebElement]) -> Result<bool> {
        let is_fulfilled = match self {
            ExpectCondition::Count(count) => &elements.len() == count,
            ExpectCondition::Text(text) => {
                let mut all_text_matches = elements.len() != 0;
                for elem in elements {
                    all_text_matches &= &elem.text().await? == text;
                }
                all_text_matches
            }
        };
        Ok(is_fulfilled)
    }
}
