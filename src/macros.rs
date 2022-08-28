//! Internal logging macros.

macro_rules! write_colored {
    ($color: expr, $($args: expr),*) => {
        if let Err(e)
            = ::console::Term::stderr().write_line(&$color.apply_to(format!($($args),*)).to_string()) {
            println!("write_colored failed: {e:?}");
        }
    }
}

macro_rules! info {
    ($($args: expr),*) => {
        write_colored!(::console::Style::new().cyan(), $($args),*)
    };
}

macro_rules! warn {
    ($($args: expr),*) => {
        write_colored!(::console::Style::new().red(), $($args),*)
    };
}
