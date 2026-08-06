# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static website for Equinoccial (Maniobras e Izajes — crane rental / industrial lifting company, Ambato, Ecuador). No frontend framework — plain HTML/CSS/JS assembled by a small custom Node.js build script. Content and site copy are in Spanish.

## Commands

```
npm run build   # node build.js — assembles dist/*.html from partials/ + pages/, copies assets/
npm run serve   # npx serve dist — serves dist/ locally (e.g. http://localhost:3000)
```

There is no test suite, linter, or type checker configured in this project.

Alternative to `npm run serve`: the VS Code "Live Server" extension pointed at `dist/index.html` (auto-reloads on save, but still requires `npm run build` first for `partials/`/`pages/` changes to appear).

## Architecture

This is a template-assembly system, not a framework. The build model:

- `partials/layout.html` — the base HTML shell (`<head>`, `<body>`, script tag) with placeholders `{{TITLE}}`, `{{DESCRIPTION}}`, `{{HEADER}}`, `{{CONTENT}}`, `{{FOOTER}}`.
- `partials/header.html` / `partials/footer.html` — shared header+menu and footer+WhatsApp button, injected into every page.
- `pages/*.content.html` — per-page content only (no head/header/footer), injected into `{{CONTENT}}`.
- `build.js` — defines the `PAGES` array (each entry: `contentFile`, `outputFile`, `title`, `description`), does simple `String.replace` placeholder substitution per page, wipes and regenerates `dist/`, then copies `assets/` into `dist/assets/`.
- `assets/css/styles.css`, `assets/js/script.js` (mobile hamburger menu logic), `assets/img/` — copied verbatim into `dist/assets/`.
- `dist/` — generated output. **Never edit files under `dist/` directly** — `npm run build` wipes and regenerates the whole directory, and hand edits will be silently lost. It's also gitignored.

### Common tasks

- **Change shared content (e.g. phone number)**: edit `partials/header.html` and `partials/footer.html`, then `npm run build`.
- **Add a new page**: create `pages/<name>.content.html`, add a corresponding entry to the `PAGES` array in `build.js`, then `npm run build`.
- **Edit blog content**: `pages/blog.content.html`.
- **Change colors/theme**: `assets/css/styles.css`, brand colors are under the `:root` selector.

No `.git` repository has been initialized yet in this project.
