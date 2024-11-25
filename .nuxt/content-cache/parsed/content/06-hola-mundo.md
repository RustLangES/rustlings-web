{"parsed":{"_path":"/06-hola-mundo","_dir":"","_draft":false,"_partial":false,"_locale":"","title":"Escribiendo Tu Primer Programa en Rust: Una Guía Paso a Paso","description":"","nextPath":"","previousPath":"05-editor","body":{"type":"root","children":[{"type":"element","tag":"h1","props":{"id":"escribiendo-tu-primer-programa-en-rust-una-guía-paso-a-paso"},"children":[{"type":"text","value":"Escribiendo Tu Primer Programa en Rust: Una Guía Paso a Paso"}]},{"type":"element","tag":"div","props":{"className":["NOTE"]},"children":[{"type":"text","value":"\n  "},{"type":"element","tag":"p","props":{"className":["title"]},"children":[{"type":"text","value":"Nota"}]},{"type":"text","value":"\n  "},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Puedes escribir el código directamente aqui. 😀"}]}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Rust es un lenguaje de programación moderno que se destaca por su seguridad y rendimiento. Si estás listo para dar tus primeros pasos en Rust, esta guía te ayudará a configurar tu entorno y a escribir tu primer programa sencillo. Vamos a crear un proyecto llamado \"hola_mundo\" utilizando Cargo, la herramienta de gestión de proyectos de Rust."}]},{"type":"element","tag":"h2","props":{"id":"qué-es-cargo"},"children":[{"type":"text","value":"¿Qué es Cargo?"}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Cargo es la navaja suiza de Rust. Permite gestionar proyectos, probar código, manejar dependencias, y mucho más. Es una herramienta esencial para cualquier desarrollador de Rust."}]},{"type":"element","tag":"h2","props":{"id":"paso-1-crear-un-proyecto-con-cargo"},"children":[{"type":"text","value":"Paso 1: Crear un Proyecto con Cargo"}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Para crear tu primer proyecto con Cargo, abre una terminal y ejecuta el siguiente comando:"}]},{"type":"element","tag":"pre","props":{"className":"language-sh shiki shiki-themes dracula","code":"cargo new hola_mundo\n","filename":"terminal","language":"sh","meta":"","style":""},"children":[{"type":"element","tag":"code","props":{"__ignoreMap":""},"children":[{"type":"element","tag":"span","props":{"class":"line","line":1},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-default:#50FA7B"},"children":[{"type":"text","value":"cargo"}]},{"type":"element","tag":"span","props":{"style":"--shiki-default:#F1FA8C"},"children":[{"type":"text","value":" new"}]},{"type":"element","tag":"span","props":{"style":"--shiki-default:#F1FA8C"},"children":[{"type":"text","value":" hola_mundo\n"}]}]}]}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Este comando creará un nuevo directorio y un proyecto llamado \"hola_mundo\". Cargo generará los archivos necesarios y un directorio para ti. Vamos a explorar lo que ha creado."}]},{"type":"element","tag":"h2","props":{"id":"paso-2-explorar-la-estructura-del-proyecto"},"children":[{"type":"text","value":"Paso 2: Explorar la Estructura del Proyecto"}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Navega al directorio del proyecto y lista los archivos:"}]},{"type":"element","tag":"pre","props":{"className":"language-sh shiki shiki-themes dracula","code":"cd hola_mundo\nls\n","filename":"terminal","language":"sh","meta":"","style":""},"children":[{"type":"element","tag":"code","props":{"__ignoreMap":""},"children":[{"type":"element","tag":"span","props":{"class":"line","line":1},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-default:#8BE9FD"},"children":[{"type":"text","value":"cd"}]},{"type":"element","tag":"span","props":{"style":"--shiki-default:#F1FA8C"},"children":[{"type":"text","value":" hola_mundo\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":2},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-default:#50FA7B"},"children":[{"type":"text","value":"ls\n"}]}]}]}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Deberías ver los siguientes elementos:"}]},{"type":"element","tag":"ul","props":{},"children":[{"type":"element","tag":"li","props":{},"children":[{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":"Cargo.toml"}]},{"type":"text","value":": Archivo de configuración de Cargo."}]},{"type":"element","tag":"li","props":{},"children":[{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":"src"}]},{"type":"text","value":": Directorio de código fuente.\n"},{"type":"element","tag":"ul","props":{},"children":[{"type":"element","tag":"li","props":{},"children":[{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":"main.rs"}]},{"type":"text","value":": Archivo principal de Rust que contiene el punto de entrada del programa."}]}]}]}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Cargo también inicializa un nuevo repositorio Git junto con un archivo "},{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":".gitignore"}]},{"type":"text","value":"."}]},{"type":"element","tag":"h2","props":{"id":"paso-3-entender-el-código-generado"},"children":[{"type":"text","value":"Paso 3: Entender el Código Generado"}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Abre el archivo "},{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":"src/main.rs"}]},{"type":"text","value":" en tu editor de texto favorito. Verás el siguiente código:"}]},{"type":"element","tag":"pre","props":{"className":"language-rs shiki shiki-themes dracula","code":"fn main() {\n    println!(\"Hello, world!\");\n}\n","filename":"main.rs","language":"rs","meta":"","style":""},"children":[{"type":"element","tag":"code","props":{"__ignoreMap":""},"children":[{"type":"element","tag":"span","props":{"class":"line","line":1},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-default:#FF79C6"},"children":[{"type":"text","value":"fn"}]},{"type":"element","tag":"span","props":{"style":"--shiki-default:#50FA7B"},"children":[{"type":"text","value":" main"}]},{"type":"element","tag":"span","props":{"style":"--shiki-default:#F8F8F2"},"children":[{"type":"text","value":"() {\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":2},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-default:#50FA7B"},"children":[{"type":"text","value":"    println!"}]},{"type":"element","tag":"span","props":{"style":"--shiki-default:#F8F8F2"},"children":[{"type":"text","value":"("}]},{"type":"element","tag":"span","props":{"style":"--shiki-default:#F1FA8C"},"children":[{"type":"text","value":"\"Hello, world!\""}]},{"type":"element","tag":"span","props":{"style":"--shiki-default:#F8F8F2"},"children":[{"type":"text","value":");\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":3},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-default:#F8F8F2"},"children":[{"type":"text","value":"}\n"}]}]}]}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Vamos a desglosar este código línea por línea."}]},{"type":"element","tag":"h3","props":{"id":"la-función-main"},"children":[{"type":"text","value":"La Función "},{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":"main"}]}]},{"type":"element","tag":"pre","props":{"className":"language-rs shiki shiki-themes dracula","code":"fn main() {\n\n}\n","filename":"main.rs","language":"rs","meta":"","style":""},"children":[{"type":"element","tag":"code","props":{"__ignoreMap":""},"children":[{"type":"element","tag":"span","props":{"class":"line","line":1},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-default:#FF79C6"},"children":[{"type":"text","value":"fn"}]},{"type":"element","tag":"span","props":{"style":"--shiki-default:#50FA7B"},"children":[{"type":"text","value":" main"}]},{"type":"element","tag":"span","props":{"style":"--shiki-default:#F8F8F2"},"children":[{"type":"text","value":"() {\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":2},"children":[{"type":"element","tag":"span","props":{"emptyLinePlaceholder":true},"children":[{"type":"text","value":"\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":3},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-default:#F8F8F2"},"children":[{"type":"text","value":"}\n"}]}]}]}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Estas líneas definen una función llamada "},{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":"main"}]},{"type":"text","value":". La función "},{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":"main"}]},{"type":"text","value":" es especial: siempre es el primer código que se ejecuta en cada programa ejecutable de Rust. Aquí, la primera línea declara una función llamada "},{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":"main"}]},{"type":"text","value":" que no tiene parámetros y no devuelve nada. Si hubiera parámetros, irían dentro de los paréntesis "},{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":"()"}]},{"type":"text","value":"."}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"El cuerpo de la función está envuelto en "},{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":"{}"}]},{"type":"text","value":". Rust requiere llaves alrededor de todos los cuerpos de función. Es buena costumbre colocar la llave de apertura en la misma línea que la declaración de la función, agregando un espacio entre ambos."}]},{"type":"element","tag":"h3","props":{"id":"el-cuerpo-de-la-función-main"},"children":[{"type":"text","value":"El Cuerpo de la Función "},{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":"main"}]}]},{"type":"element","tag":"pre","props":{"className":"language-rs shiki shiki-themes dracula","code":"println!(\"Hello, world!\");\n","filename":"main.rs","language":"rs","meta":"","style":""},"children":[{"type":"element","tag":"code","props":{"__ignoreMap":""},"children":[{"type":"element","tag":"span","props":{"class":"line","line":1},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-default:#50FA7B"},"children":[{"type":"text","value":"println!"}]},{"type":"element","tag":"span","props":{"style":"--shiki-default:#F8F8F2"},"children":[{"type":"text","value":"("}]},{"type":"element","tag":"span","props":{"style":"--shiki-default:#F1FA8C"},"children":[{"type":"text","value":"\"Hello, world!\""}]},{"type":"element","tag":"span","props":{"style":"--shiki-default:#F8F8F2"},"children":[{"type":"text","value":");\n"}]}]}]}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Esta línea hace todo el trabajo en este pequeño programa: imprime texto en la pantalla."}]},{"type":"element","tag":"p","props":{},"children":[{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":"println!"}]},{"type":"text","value":" llama a una macro de Rust. Si hubiéramos llamado a una función en su lugar, habríamos ingresado "},{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":"println"}]},{"type":"text","value":" (sin el "},{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":"!"}]},{"type":"text","value":"). Hablaremos de macros en Rust más adelante. Por ahora, solo necesitas saber que usar un "},{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":"!"}]},{"type":"text","value":" significa que estamos llamando a una macro en lugar de una función normal y que las macros no siempre siguen las mismas reglas que las funciones."}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Terminamos la línea con un punto y coma ("},{"type":"element","tag":"code","props":{"className":[]},"children":[{"type":"text","value":";"}]},{"type":"text","value":"), lo que indica que esta expresión ha terminado y la siguiente está lista para comenzar. La mayoría de las líneas de código de Rust terminan con un punto y coma."}]},{"type":"element","tag":"h2","props":{"id":"paso-4-ejecutar-el-programa"},"children":[{"type":"text","value":"Paso 4: Ejecutar el Programa"}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Ahora que entendemos el código, es hora de ejecutarlo. En la terminal, ejecuta:"}]},{"type":"element","tag":"pre","props":{"className":"language-sh shiki shiki-themes dracula","code":"cargo run\n","filename":"terminal","language":"sh","meta":"","style":""},"children":[{"type":"element","tag":"code","props":{"__ignoreMap":""},"children":[{"type":"element","tag":"span","props":{"class":"line","line":1},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-default:#50FA7B"},"children":[{"type":"text","value":"cargo"}]},{"type":"element","tag":"span","props":{"style":"--shiki-default:#F1FA8C"},"children":[{"type":"text","value":" run\n"}]}]}]}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Deberías ver una salida similar a esta:"}]},{"type":"element","tag":"pre","props":{"className":"language-console shiki shiki-themes dracula","code":"$ cargo run\n  Finished dev [unoptimized + debuginfo] target(s) in 0.0 secs\n  Running `target/debug/hola_mundo`\nHello, world!\n","filename":"terminal","language":"console","meta":"","style":""},"children":[{"type":"element","tag":"code","props":{"__ignoreMap":""},"children":[{"type":"element","tag":"span","props":{"class":"line","line":1},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-default:#F8F8F2"},"children":[{"type":"text","value":"$ cargo run\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":2},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-default:#F8F8F2"},"children":[{"type":"text","value":"  Finished dev [unoptimized + debuginfo] target(s) in 0.0 secs\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":3},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-default:#F8F8F2"},"children":[{"type":"text","value":"  Running `target/debug/hola_mundo`\n"}]}]},{"type":"element","tag":"span","props":{"class":"line","line":4},"children":[{"type":"element","tag":"span","props":{"style":"--shiki-default:#F8F8F2"},"children":[{"type":"text","value":"Hello, world!\n"}]}]}]}]},{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Si todo funciona correctamente, ¡felicitaciones! Has escrito y ejecutado tu primer programa en Rust."}]},{"type":"element","tag":"style","props":{},"children":[{"type":"text","value":"html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}"}]}],"toc":{"title":"","searchDepth":2,"depth":2,"links":[{"id":"qué-es-cargo","depth":2,"text":"¿Qué es Cargo?"},{"id":"paso-1-crear-un-proyecto-con-cargo","depth":2,"text":"Paso 1: Crear un Proyecto con Cargo"},{"id":"paso-2-explorar-la-estructura-del-proyecto","depth":2,"text":"Paso 2: Explorar la Estructura del Proyecto"},{"id":"paso-3-entender-el-código-generado","depth":2,"text":"Paso 3: Entender el Código Generado","children":[{"id":"la-función-main","depth":3,"text":"La Función main"},{"id":"el-cuerpo-de-la-función-main","depth":3,"text":"El Cuerpo de la Función main"}]},{"id":"paso-4-ejecutar-el-programa","depth":2,"text":"Paso 4: Ejecutar el Programa"}]}},"_type":"markdown","_id":"content:06-hola-mundo.md","_source":"content","_file":"06-hola-mundo.md","_stem":"06-hola-mundo","_extension":"md"},"hash":"W5ocRnGj7M"}