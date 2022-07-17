//! Internal logging macros.

macro_rules! write_colored {
    ($color: expr, $($args: tt),*) => {
        if let Err(e)
            = ::console::Term::stderr().write_line(&$color.apply_to(format!($($args),*)).to_string()) {
            println!("write_colored failed: {e:?}");
        }
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
