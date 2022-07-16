//! Internal logging macros.

macro_rules! write_colored {
    ($color: expr, $($args: tt),*) => {
        ::console::Term::stderr().write_line(&$color.apply_to(format!($($args),*)).to_string())?;
    }
}

macro_rules! info {
    ($($args: tt),*) => {
        write_colored!(::console::Style::new().cyan(), $($args),*)
    };
}

macro_rules! warn {
    ($($args: tt),*) => {
        write_colored!(::console::Style::new().red(), $($args),*)
    };
}
