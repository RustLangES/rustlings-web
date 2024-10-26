---
  layout: '../../layouts/learnLayout.astro'
---

# Constantes

En Rust, las constantes son inmutables por defecto. No puedes cambiar el valor de una constante una vez que se ha vinculado a un nombre. Las constantes se declaran con la palabra clave `const` y el tipo de la constante debe ser anotado.

```rust
fn main() {
    const MAX_POINTS: u32 = 100_000;
    println!("The value of MAX_POINTS is: {MAX_POINTS}");
}
```

## Información adicional

- [Constantes](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html#diferencias-entre-constantes-y-variables-inmutables)
