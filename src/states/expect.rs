//! Page element verification supporting types.

use std::{
    fmt::Debug,
    ops::{Range, RangeFrom, RangeInclusive},
    time::Duration,
};

use anyhow::{bail, Context, Result};
use async_trait::async_trait;
use thirtyfour::{prelude::*, session::handle::SessionHandle, By, WebElement};

/// Wrapper type around [`By`] selector and verification conditions.
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
    pub fn new_class_prefix(name: impl AsRef<str>, prefix: impl AsRef<str>) -> Self {
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

    pub fn new_css(name: impl AsRef<str>, selector: impl AsRef<str>) -> Self {
        let name = name.as_ref().to_string();
        let selector_string = Some(selector.as_ref().to_string());
        let by = By::Css(selector_string.as_ref().unwrap());
        Self {
            name,
            by,
            _selector_string: selector_string,
            conditions: vec![],
        }
    }

    pub fn with_count(mut self, count: usize) -> Self {
        self.conditions.push(ExpectCondition::ExactCount(count));
        self
    }

    pub fn with_text(mut self, text: impl AsRef<str>) -> Self {
        self.conditions
            .push(ExpectCondition::Text(text.as_ref().to_string()));
        self
    }

    pub fn with_count_range(mut self, range: impl Into<IndexRange>) -> Self {
        self.conditions
            .push(ExpectCondition::RangeCount(range.into()));
        self
    }

    pub fn with_attribute(mut self, name: impl AsRef<str>) -> Self {
        self.conditions
            .push(ExpectCondition::Attribute(name.as_ref().to_string()));
        self
    }

    /// Find and verify elements, and return the ones at specified indices.
    pub async fn find_at<const N: usize>(
        &self,
        driver: &SessionHandle,
        indices: [usize; N],
    ) -> Result<[WebElement; N]> {
        let elements = self.find_all(driver).await?;
        Ok(indices.map(|i| elements[i].clone()))
    }

    /// Find and verify elements, and return the first one.
    pub async fn find_one(&self, driver: impl WebDriverExt) -> Result<WebElement> {
        let mut elements = self.find_all(driver).await?;
        Ok(elements.remove(0))
    }

    /// Find and verify elements, and return the first one if it exists.
    /// **This method does not wait for the element to appear.**
    pub async fn find_maybe_one(&self, driver: impl WebDriverExt) -> Result<Option<WebElement>> {
        let elements = self._find_all_nowait(driver).await?;
        Ok(elements.into_iter().next())
    }

    /// Find and verify elements.
    pub async fn find_all(&self, driver: impl WebDriverExt) -> Result<Vec<WebElement>> {
        let elements = self._find_all(driver.clone()).await?;
        Ok(self._verify(driver, elements).await?)
    }

    /// Verify that the given elements fulfills all the conditions.
    async fn _verify(
        &self,
        driver: impl WebDriverExt,
        elements: Vec<WebElement>,
    ) -> Result<Vec<WebElement>> {
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

    /// Find elements with wait.
    async fn _find_all(&self, driver: impl WebDriverExt) -> Result<Vec<WebElement>> {
        driver
            .find_elements_ext(self.by.clone())
            .await
            .context(format!("Failed to find elements by {by:?}", by = self.by))
    }

    /// Find elements **without** wait.
    async fn _find_all_nowait(&self, driver: impl WebDriverExt) -> Result<Vec<WebElement>> {
        driver
            .find_elements_nowait_ext(self.by.clone())
            .await
            .context(format!("Failed to find elements by {by:?}", by = self.by))
    }
}

/// A condition to be checked against one or many [`WebElement`]s.
#[derive(Debug, Clone)]
enum ExpectCondition {
    ExactCount(usize),
    RangeCount(IndexRange),
    Text(String),
    Attribute(String),
}

impl ExpectCondition {
    async fn is_fulfilled(&self, elements: &[WebElement]) -> Result<bool> {
        let is_fulfilled = match self {
            ExpectCondition::ExactCount(count) => &elements.len() == count,
            ExpectCondition::RangeCount(range) => range.contains(&elements.len()),
            ExpectCondition::Text(text) => {
                let mut all_text_matches = elements.len() != 0;
                for elem in elements {
                    all_text_matches &= &elem.text().await? == text;
                }
                all_text_matches
            }
            ExpectCondition::Attribute(name) => {
                let mut all_elem_has_attribute = elements.len() != 0;
                for elem in elements {
                    all_elem_has_attribute &= elem.attr(&name).await?.is_some();
                }
                all_elem_has_attribute
            }
        };
        Ok(is_fulfilled)
    }
}

/// Trait providing a streamlined API for finding elements in [`SessionHandle`] and [`WebElement`].
#[async_trait]
pub trait WebDriverExt: Clone + Send + Sync {
    /// Equivalent to [`SessionHandle::find_elements`] or [`WebElement::find_elements`].
    async fn find_elements_ext(&self, by: By) -> WebDriverResult<Vec<WebElement>>;

    async fn find_elements_nowait_ext(&self, by: By) -> WebDriverResult<Vec<WebElement>>;

    async fn current_url(&self) -> WebDriverResult<String> {
        Ok("".to_string())
    }
}

#[async_trait]
impl WebDriverExt for &SessionHandle {
    async fn find_elements_ext(&self, by: By) -> WebDriverResult<Vec<WebElement>> {
        self.query(by)
            .wait(Duration::from_secs(2), Duration::from_millis(200))
            .all()
            .await
    }

    async fn find_elements_nowait_ext(&self, by: By) -> WebDriverResult<Vec<WebElement>> {
        self.query(by).nowait().all().await
    }

    async fn current_url(&self) -> WebDriverResult<String> {
        self.current_url().await.map(|url| url.to_string())
    }
}

#[async_trait]
impl WebDriverExt for WebElement {
    async fn find_elements_ext(&self, by: By) -> WebDriverResult<Vec<WebElement>> {
        self.query(by)
            .wait(Duration::from_secs(2), Duration::from_millis(200))
            .all()
            .await
    }

    async fn find_elements_nowait_ext(&self, by: By) -> WebDriverResult<Vec<WebElement>> {
        self.query(by).nowait().all().await
    }
}

/// Workaround since `Box<dyn std::ops::RangeBounds>` is not possible (the trait is not object-safe).
#[derive(Debug, Clone)]
pub enum IndexRange {
    Range(Range<usize>),
    RangeInclusive(RangeInclusive<usize>),
    RangeFrom(RangeFrom<usize>),
}

impl IndexRange {
    fn contains(&self, index: &usize) -> bool {
        match self {
            IndexRange::Range(r) => r.contains(index),
            IndexRange::RangeInclusive(r) => r.contains(index),
            IndexRange::RangeFrom(r) => r.contains(index),
        }
    }
}

impl From<Range<usize>> for IndexRange {
    fn from(r: Range<usize>) -> Self {
        Self::Range(r)
    }
}

impl From<RangeInclusive<usize>> for IndexRange {
    fn from(r: RangeInclusive<usize>) -> Self {
        Self::RangeInclusive(r)
    }
}

impl From<RangeFrom<usize>> for IndexRange {
    fn from(r: RangeFrom<usize>) -> Self {
        Self::RangeFrom(r)
    }
}
