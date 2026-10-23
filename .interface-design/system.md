# Rustlings Web — Interface system

Source of truth: `figma/` export of "[Design System] RustLangES" (pages: Sistema de diseño, Sitio web, Roadmap).
Tokens and component classes live in `src/styles/global.css`.

## Direction

A Spanish-speaking dev learning Rust in the browser, guided by the RustLangES community.
Feel: a hand-made workbook with stickers. Neo-brutalist: solid 1px black outlines,
hard offset shadows (no blur), flat fills, Ferris orange as the single action color,
lilac as the secondary/"roadmap" color. Playful but legible. No glows, no gradients,
no blur, no glassmorphism, no soft drop shadows.

Light + dark themes (`html[data-theme]`, toggle via `ThemeToggle.astro`, stored in
`localStorage.theme`). Code surfaces (editor, terminal, `pre`) are dark in both themes.

## Tokens (Tailwind utilities)

| Role | Utility | Light | Dark |
|---|---|---|---|
| Page bg | `bg-canvas` | #fafafa | #2e2e2e |
| Card bg | `bg-surface` | #ffffff | #3d3d3d |
| Raised/hover bg, table head | `bg-surface-raised` | #f6f6f6 | #454545 |
| Inputs | `bg-sunken` | #fafafa | #222222 |
| Text primary | `text-ink` | #222 | #f6f6f6 |
| Text secondary | `text-ink-muted` | #5d5d5d | #d1d1d1 |
| Text tertiary / disabled / meta | `text-ink-subtle` | #6d6d6d | #b0b0b0 |
| Outline (cards, buttons, badges) | `border-line` | #000 | #000 |
| Dividers inside cards | `border-line-soft` | #d9d9d9 | #5d5d5d |
| Secondary-button outline | `border-edge` | #222 | #f6f6f6 |
| Primary action fill | `bg-ferris` / hover `bg-ferris-hover` | #ff6e1f / #f04906 | #ffb270 / #ff8637 |
| Text on ferris | `text-on-ferris` | #000 | #000 |
| Accent text, links, active nav | `text-ferris-ink` | #c73407 | #ff8637 |
| Soft orange bg (hero, highlight) | `bg-ferris-tint` | #fff2e5 | #3b2119 |
| Orange chip | `bg-ferris-chip` | #ffd2a8 | #7f260f |
| Lilac fill (illustrative) | `bg-lilac` | #9a8afb | #7a5bf7 |
| Lilac card bg (roadmap/track) | `bg-lilac-tint` | #f4f3ff | #240f66 |
| Lilac chip | `bg-lilac-chip` | #d9d6fe | #3e1c96 |
| Lilac text / hover outline | `text-lilac-ink` | #5927da | #bcb5fd |
| Success / warning / danger / neutral | `text-success` + `bg-success-bg`, etc. | | |
| Code | `bg-code-bg`, `bg-code-raised`, `border-code-line`, `text-code-ink`, `text-code-muted` | #222 family | same |
| Footer band / feature band | `bg-band text-on-band` | #ff6711 | #f04906 |
| Hero band | `bg-hero text-on-hero`, `text-on-hero-muted`, `text-hero-accent` | #fff2e5 / #222 / #5d5d5d / #c73407 | #c73407 / #f6f6f6 / #ffebd4 / #ffd2a8 |
| Alternating section | `bg-section-alt` | #f6f6f6 | #222222 |

Never use raw hex/Tailwind palette colors (`text-red-400`, `bg-[#...]`) in markup except
brand marks (Discord #5865F2 is acceptable only for the Discord glyph itself).
Opacity modifiers on text (`text-ink/50`) are discouraged: use `ink-muted` / `ink-subtle`.

## Dark mode — "Noche de editor" (owner-chosen, 2026-10-23)

Blue-black like a code editor at night; Ferris orange is the only loud color.
- Canvas `#0f1117`, surface `#171a22`, raised `#1f2330`, sunken / section-alt `#0a0c10` / `#0b0d12`.
- Ink `#eef0f6` / muted `#c3c8d6` / subtle `#8d93a5`.
- Outline `--line #343a4c` and hard shadow `--shadow #262b38` (a lifted "plate": black shadows vanish on blue-black).
- Primary `#ff6e1f` with black text; accent text `#ff8a4c`. Lilac tint `#1b1a2e` (muted, never saturated violet).
- Hero is dark (`#141722`); orange lives in the marker + Ferris. Only saturated band: final CTA / footer (`#ff6e1f`, black text).
- Code surfaces retint to `--code-bg #0b0d12` / `--code-raised #141822` in dark (editor theme uses the vars).
- Light mode unchanged.

## Depth

One strategy: outline + hard offset shadow.
- `shadow-hard-sm` (2px 2px 0 black): buttons, badges-in-dropdowns, small cards, mobile cards.
- `shadow-hard` (4px 4px 0): desktop cards, modals.
- `shadow-hard-lg` (6px): hover of interactive cards, hero illustration frames.
- Pressed = `translate(2px,2px)` + no shadow. Hover = `translate(-1px,-1px)` + slightly bigger shadow.

## Radius

- Badges / chips / dots: `rounded-full`
- Inputs, small controls, code blocks, roadmap items: 12px (`rounded-control` / `rounded-xl`)
- Buttons: 16px (`rounded-button`)
- Cards, modals, forms: 20px (`rounded-card`)

## Typography

- **Inter Variable** (`font-sans`) for everything; **Fira Code** (`font-mono`) for code.
- **Akira Expanded** (`font-display`, self-hosted WOFF2 in `/public/fonts`, preloaded): Bold 700 / Super Bold 800. Renders all caps.
  Only for page hero titles (`.type-hero`: 26 → 34 → 44px), the "Rustlings" wordmark, and the 404 numeral. Key words in Super Bold (`font-extrabold`).
  Never for body, UI labels, buttons or user-provided text (names). One per view.
- Scale (mobile → desk): `.type-h1` (32→48 bold), `.type-h2` (24→32 bold), `.type-h3` (20→24 semibold), `.type-h4` (18→20 semibold),
  `.type-subtitle` (16→20, 1.75), body 16/1.6 (14 dense), caption 12, `.type-overline`/`.eyebrow` (12 semibold uppercase tracked).
- Hierarchy via weight + ink level, not size alone.

## Components (classes in global.css)

- `.btn .btn-primary` — orange fill, black outline, 48px h, 16px radius, hard shadow. ONE per view.
- `.btn .btn-secondary` — canvas fill, `edge` outline + shadow; hover turns ferris-ink.
- `.btn-ghost` — text button (nav links, low-priority actions).
- add `.btn-sm` for 40px dense contexts.
- `.btn-icon` — 40px circle icon button (social, theme toggle, close).
- `.card` — surface, outline, 20px radius, hard shadow (2px→4px md). `.card-flat` without shadow.
- `.card-interactive` — add to linked cards: hover lifts with lilac outline + shadow, press flattens.
- `.badge .badge-{success|warning|danger|neutral|ferris|lilac}` — status pills (Completo / Leyendo / Pendiente / No leído).
- `.chip` — lilac category pill.
- `.status-dot` — 16px outlined circle; color with `bg-success` etc.
- `.input`, `.field-label` — forms; focus ring orange; `aria-invalid="true"` → danger.
- `.code-surface` — dark outlined container for editor/terminal mocks.
- `.eyebrow` — section overline in ferris-ink.
- `.container-page` — max 1200, 16px mobile / 32px desk gutters.

## Layout — column grids (Figma "Layouts")

**Site pages** (home, temario, perfil, certificado, verificar, login, privacidad, 404):
- `.container-page` = 1072px max − 2×16px padding → **1040px content**; 16px margin on mobile, exactly **200px** at 1440.
- `.grid-page` = **4 cols / 8px gutter** on mobile → **12 cols / 24px gutter** from `md`.
- Every page-level block takes a column span: `col-span-4 md:col-span-N lg:col-span-N`. No free `fr` ratios or fixed px sidebars.
- Standard splits (lg): hero 7+5 · features 8+4 / 4+8 · roadmap 4+4+4 · community 8+4 · FAQ 4+8 · perfil 8+4 · certificado 8+4 · login 6 centered · privacidad 8 · 404 7+5.
- Vertical rhythm uses the 8px scale (8/16/24/32/40/48); section padding `py-16 md:py-24`.

**Lesson app** (Figma "Roadmap" grid): full-bleed, 16px side margin aligned with the app header, **24px gutter** between content and editor panels (the resize handle is the gutter).

Verified with a Playwright audit at 360/390/768/1024/1440/1920: no horizontal overflow and every `.grid-page` child edge lands on a column line.

## States

Every interactive element: hover, active (pressed), focus-visible (global orange outline), disabled
(neutral-bg + ink-subtle + subtle outline, no shadow). Lists/data: loading, empty, error.

## Signature

Ferris illustration (`/images/brand/ferris-hero.png`), crab pattern (`/images/brand/ferris-pattern.png`)
for banners, sticker-like outlined cards with hard shadows, orange footer band.

## Landing (home) structure

Order follows the visitor's decision path: Hero (value prop + 1 CTA + 4 numbers) → Así funciona (live demo,
the "aha") → Qué vas a aprender (12-module roadmap, 6 on mobile) → Beneficios (4 cards, asymmetric 2+1 / 1+2)
→ Comunidad → FAQ → Final CTA band (peak-end) → Footer.
- H1 states the benefit; brand lives in the header. Key phrase gets `.marker` (highlighter stroke, `--hero-marker`).
- CTAs carry `data-auth="guest|user"` spans; `SiteHeader` swaps them client-side ("Empezar gratis" ↔ "Continuar aprendiendo").
- Sections alternate canvas / `bg-section-alt`; saturated bands (hero, community, final CTA) never sit next to each other.
- Certificate previews are "paper" (fixed light colors) in both themes, like the exported PNG.

## Protected

- **Do not modify the certificate / badge artwork** (canvas drawing in `certificado/[trackId].astro`, `verificar/[certId].astro`, `CertificateModal.astro`). Owner-approved; only page chrome around it may change.
