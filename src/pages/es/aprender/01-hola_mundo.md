---
  layout: '../../../layouts/learnLayout.astro'
---

# Variables

In Rust, variables are immutable by default.
When a variable is immutable, once a value is bound to a name, you can’t change that value.
You can make them mutable by adding `mut` in front of the variable name.

```rust
fn main() {
    // TODO: Add the missing keyword.
    x = 5;

    println!("x has the value {x}");
}
```

## Further information

- [Variables and Mutability](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html)
