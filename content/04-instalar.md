---
nextPath: "05-editor"
previousPath: "03-versiones"
---

# Instalación de Rust con Rustup: Una Guía Rápida

Rust es un lenguaje de programación que ha ganado popularidad rápidamente debido a su enfoque en la seguridad, el rendimiento y la facilidad de uso. Si estás interesado en comenzar a desarrollar con Rust, el primer paso es instalarlo en tu sistema. La forma más recomendada y sencilla de instalar Rust es usando Rustup, una herramienta de línea de comandos para gestionar tus instalaciones de Rust. En este post, te guiaremos a través del proceso de instalación de Rust utilizando Rustup.

## ¿Qué es Rustup?

Rustup es una herramienta de instalación y gestión de Rust que facilita la configuración de múltiples versiones de Rust y la administración de diferentes toolchains (conjuntos de herramientas) en tu sistema. Con Rustup, puedes acceder fácilmente a los canales Stable, Beta y Nightly de Rust y cambiar entre ellos según sea necesario.

## Pasos para Instalar Rust con Rustup

### Instalación en Windows

#### 1. Descargar e Instalar Rustup

1. Visita [rustup.rs](https://rustup.rs/) en tu navegador.
2. Haz clic en el enlace de instalación para Windows. Esto descargará un archivo ejecutable `rustup-init.exe`.
3. Ejecuta el archivo descargado. Aparecerá una ventana de terminal.

#### 2. Ejecutar el Instalador

1. En la ventana de terminal, se te pedirá que confirmes la instalación. Pulsa `1` y luego `Enter` para proceder con la instalación predeterminada.
2. El instalador configurará Rust y Rustup en tu sistema. 

#### 3. Configurar el Entorno

El instalador generalmente configura el entorno de manera automática. Para verificar, abre una nueva ventana de terminal (PowerShell o cmd) y ejecuta:

```sh [terminal]
rustc --version
```

Si ves la versión de Rust, la instalación se ha realizado correctamente.

### Instalación en Linux

#### 1. Descargar e Instalar Rustup

Abre una terminal y ejecuta el siguiente comando:

```sh [terminal]
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### 2. Ejecutar el Instalador

Sigue las instrucciones en la terminal. Acepta las opciones predeterminadas presionando `Enter`.

#### 3. Configurar el Entorno

Añade Rust a tu PATH ejecutando:

```sh [terminal]
source $HOME/.cargo/env
```

También puedes añadir esta línea al final de tu archivo de configuración de shell (`.bashrc`, `.zshrc`, etc.) para que se ejecute automáticamente al abrir una nueva terminal.

Para verificar la instalación, ejecuta:

```sh [terminal]
rustc --version
```

Si ves la versión de Rust, la instalación ha sido exitosa.

### Instalación en macOS

#### 1. Descargar e Instalar Rustup

Abre una terminal y ejecuta el siguiente comando:

```sh [terminal]
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### 2. Ejecutar el Instalador

Sigue las instrucciones en la terminal. Acepta las opciones predeterminadas presionando `Enter`.

#### 3. Configurar el Entorno

Añade Rust a tu PATH ejecutando:

```sh [terminal]
source $HOME/.cargo/env
```

Para asegurarte de que este paso se realice automáticamente al abrir una nueva terminal, añade esta línea al final de tu archivo de configuración de shell (`.bash_profile`, `.zshrc`, etc.).

Para verificar la instalación, ejecuta:

```sh [terminal]
rustc --version
```

Si ves la versión de Rust, la instalación ha sido exitosa.


#### 2. Configurar tu Entorno

Una vez que Rustup haya terminado de instalarse, necesitas asegurarte de que tu entorno de línea de comandos esté configurado para usar Rust. Rustup te indicará agregar la ruta de Rust a tu archivo de configuración de shell (`.bashrc`, `.zshrc`, etc.). Puedes hacerlo manualmente o dejar que Rustup lo haga automáticamente.

Si decides hacerlo manualmente, añade la siguiente línea al final de tu archivo de configuración de shell:

```sh [terminal]
source $HOME/.cargo/env
```

Después de hacer esto, asegúrate de recargar tu archivo de configuración ejecutando `source ~/.bashrc` o `source ~/.zshrc`, dependiendo de tu shell.

#### 3. Verificar la Instalación

Para verificar que Rust se ha instalado correctamente, puedes ejecutar:

```sh [terminal]
rustc --version
```

Este comando debería mostrar la versión de Rust que tienes instalada. Si ves algo similar a `rustc 1.XX.X (XXXXX YYYY-MM-DD)`, ¡felicidades, ya tienes Rust instalado en tu sistema!

#### 4. Usar los Canales de Rust

Una de las ventajas de usar Rustup es la facilidad con la que puedes cambiar entre diferentes versiones de Rust. Por defecto, Rustup instala la versión Stable. Sin embargo, puedes instalar y usar las versiones Beta y Nightly fácilmente.

Para instalar y usar el canal Beta:

```sh [terminal]
rustup install beta
rustup default beta
```

Para instalar y usar el canal Nightly:

```sh [terminal]
rustup install nightly
rustup default nightly
```

Si en algún momento deseas volver al canal Stable, puedes hacerlo con:

```sh [terminal]
rustup default stable
```

#### 5. Actualizar Rust

Mantener tu instalación de Rust actualizada es fácil con Rustup. Simplemente ejecuta:

```sh [terminal]
rustup update
```

Este comando actualizará Rustup y todos los toolchains instalados a sus versiones más recientes.

### Conclusión

Instalar Rust usando Rustup es un proceso sencillo que te permitirá empezar a desarrollar en Rust rápidamente. Con Rustup, puedes gestionar fácilmente las versiones de Rust y asegurarte de que siempre tienes acceso a las últimas características y mejoras. Ahora que tienes Rust instalado, estás listo para explorar todo lo que este poderoso lenguaje tiene para ofrecer. ¡Feliz codificación!
