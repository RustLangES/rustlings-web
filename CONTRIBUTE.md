# Guia de contribucion

Gracias por querer contribuir a Rustlings Web. Este documento explica como participar en el proyecto, ya sea mejorando el codigo, corrigiendo errores o traduciendo el contenido.

---

## Flujo de trabajo general

Este proyecto sigue un flujo basado en ramas:

- `main` — rama de produccion. Solo recibe merges desde `develop`.
- `develop` — rama de integracion. Todas las pull requests van aqui.

### Pasos para contribuir

1. Haz un fork del repositorio en GitHub.
2. Clona tu fork localmente:
   ```
   git clone https://github.com/RustLangES/rustlings-web.git
   cd rustlings-web
   ```
3. Crea una rama descriptiva desde `develop`:
   ```
   git checkout develop
   git checkout -b feat/nombre-de-tu-cambio
   ```
4. Realiza tus cambios y haz commits con mensajes claros.
5. Sube tu rama a tu fork:
   ```
   git push origin feat/nombre-de-tu-cambio
   ```
6. Abre una pull request hacia la rama `develop` del repositorio original.
7. Un mantenedor revisara tu PR. Una vez aprobado, se hara merge a `develop` y, en el siguiente ciclo de release, a `main`.

### Convenciones de nombrado de ramas

| Tipo          | Prefijo     | Ejemplo                         |
|---------------|-------------|---------------------------------|
| Nueva funcion | `feat/`     | `feat/agregar-progreso-usuario` |
| Correccion    | `fix/`      | `fix/nav-buttons-href`          |
| Contenido     | `content/`  | `content/traduccion-en`         |
| Documentacion | `docs/`     | `docs/actualizar-readme`        |
| Refactor      | `refactor/` | `refactor/content-manager`      |

---

## Contribuir con traducciones de contenido

El contenido del curso esta organizado por idioma dentro de `src/content/`:

```
src/content/
  fundamentos-de-rust/
    es/       <- Espanol (existente)
    en/       <- Ingles (puedes crearlo)
    [lang]/   <- Cualquier otro idioma futuro
```

### Agregar un nuevo idioma

1. Crea la carpeta del idioma dentro del track correspondiente:
   ```
   src/content/fundamentos-de-rust/[codigo-idioma]/
   ```
   Usa codigos de idioma estandar BCP 47: `en`, `pt`, `fr`, `de`, etc.

2. Traduce los archivos `.md` del directorio `es/` y colocalos en la nueva carpeta manteniendo los mismos nombres de archivo.

3. Registra el nuevo idioma en los siguientes tres archivos:

   **`src/content-manager.ts`**
   ```ts
   export const supportedLangs = ["es", "en"] as const  // agrega tu idioma
   ```

   **`astro.config.mjs`**
   ```js
   i18n: {
     defaultLocale: "es",
     locales: ["es", "en"],  // agrega tu idioma
   }
   ```

   **`src/i18n/ui.ts`**
   ```ts
   export const languages = {
     es: "Espanol",
     en: "English",  // agrega tu idioma
   }

   export const ui = {
     es: { ... },
     en: {
       "nav.home": "Home",
       "nav.learn": "Learn",
       // ... resto de las claves
     },
   }
   ```

4. Abre una pull request hacia `develop` con el prefijo `content/` en el nombre de la rama.

### Estructura de los archivos de contenido

Cada archivo `.md` sigue la convencion `[id].[slug].md`:

```
1.introduccion-rust.md
2.sintaxis-esencial.md
2-1.variables-mutabilidad.md
2-2.tipos-primitivos.md
```

El numero antes del punto define el orden en el indice. Los archivos con un guion (`2-1`, `2-2`) son subsecciones del capitulo principal (`2`).

El frontmatter admite las siguientes propiedades:

```yaml
---
editor: true          # muestra el editor de codigo (true/false)
code: |               # codigo inicial en el editor (opcional)
  fn main() {}
expectedOutput: ""    # salida esperada para validar el ejercicio (opcional)
testCode: ""          # codigo de prueba adicional (opcional)
---
```

### Corregir contenido existente

Si encuentras un error en el contenido en espanol u otro idioma, puedes abrir una PR directamente editando el archivo `.md` correspondiente en `src/content/fundamentos-de-rust/[lang]/`.

---

## Instalacion y desarrollo local

```
npm install
npm run dev
```

El servidor de desarrollo estara disponible en `http://localhost:4321`.

---

## Preguntas

Si tienes dudas sobre como contribuir, abre un issue en el repositorio o consulta en el servidor de Discord del proyecto.
