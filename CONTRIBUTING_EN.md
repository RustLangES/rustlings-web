# Contribution guide

Thank you for wanting to contribute to Rustlings Web. This document explains how to participate in the project, whether by improving the code, fixing bugs, or translating content.

---

## General workflow

This project follows a branch-based workflow:

- `main` — production branch. Only receives merges from `develop`.
- `develop` — integration branch. All pull requests go here.

### Steps to contribute

1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```
   git clone https://github.com/RustLangES/rustlings-web.git
   cd rustlings-web
   ```
3. Create a descriptive branch from `develop`:
   ```
   git checkout develop
   git checkout -b feat/your-change-name
   ```
4. Make your changes and commit with clear messages.
5. Push your branch to your fork:
   ```
   git push origin feat/your-change-name
   ```
6. Open a pull request targeting the `develop` branch of the original repository.
7. A maintainer will review your PR. Once approved, it will be merged into `develop` and, in the next release cycle, into `main`.

### Branch naming conventions

| Type          | Prefix      | Example                         |
|---------------|-------------|---------------------------------|
| New feature   | `feat/`     | `feat/add-user-progress`        |
| Bug fix       | `fix/`      | `fix/nav-buttons-href`          |
| Content       | `content/`  | `content/english-translation`   |
| Documentation | `docs/`     | `docs/update-readme`            |
| Refactor      | `refactor/` | `refactor/content-manager`      |

---

## Contributing with content translations

The course content is organized by language inside `src/content/`:

```
src/content/
  fundamentos-de-rust/
    es/       <- Spanish (existing)
    en/       <- English (you can create this)
    [lang]/   <- Any other future language
```

### Adding a new language

1. Create the language folder inside the corresponding track:
   ```
   src/content/fundamentos-de-rust/[language-code]/
   ```
   Use standard BCP 47 language codes: `en`, `pt`, `fr`, `de`, etc.

2. Translate the `.md` files from the `es/` directory and place them in the new folder, keeping the same file names.

3. Register the new language in the following three files:

   **`src/content-manager.ts`**
   ```ts
   export const supportedLangs = ["es", "en"] as const  // add your language
   ```

   **`astro.config.mjs`**
   ```js
   i18n: {
     defaultLocale: "es",
     locales: ["es", "en"],  // add your language
   }
   ```

   **`src/i18n/ui.ts`**
   ```ts
   export const languages = {
     es: "Espanol",
     en: "English",  // add your language
   }

   export const ui = {
     es: { ... },
     en: {
       "nav.home": "Home",
       "nav.learn": "Learn",
       // ... rest of the keys
     },
   }
   ```

4. Open a pull request targeting `develop` with the `content/` prefix in the branch name.

### Content file structure

Each `.md` file follows the convention `[id].[slug].md`:

```
1.introduccion-rust.md
2.sintaxis-esencial.md
2-1.variables-mutabilidad.md
2-2.tipos-primitivos.md
```

The number before the dot defines the order in the index. Files with a dash (`2-1`, `2-2`) are subsections of the main chapter (`2`).

The frontmatter supports the following properties:

```yaml
---
editor: true          # show the code editor (true/false)
code: |               # initial code in the editor (optional)
  fn main() {}
expectedOutput: ""    # expected output to validate the exercise (optional)
testCode: ""          # additional test code (optional)
---
```

### Fixing existing content

If you find an error in the Spanish or any other language content, you can open a PR directly by editing the corresponding `.md` file in `src/content/fundamentos-de-rust/[lang]/`.

---

## Local installation and development

### 1. Install dependencies

```
npm install
```

### 2. Install Wrangler (Cloudflare CLI)

```
npm install -g wrangler
```

### 3. Configure database

1. Create a D1 database in Cloudflare:
   ```
   wrangler d1 create rustlings
   ```

2. Update `wrangler.toml` with your `database_id` and `database_name`:
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "your-db-name"
   database_id = "your-database-id"
   ```

3. Run migrations:
   ```
   wrangler d1 migrations apply --local
   ```

### 4. Development

For basic development (without backend features):
```
npm run dev
```

For full development with all features:
```
npm run build
wrangler dev
```

The development server will be available at `http://localhost:8787` with Wrangler or `http://localhost:4321` with Astro.

---

## Questions

If you have questions about how to contribute, open an issue in the repository or ask in the project's Discord server.
