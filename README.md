# ZEITPUNKT

Editorial site built from the Stitch design "International Editorial".

```
ui-kit/   @zeitpunkt/ui-kit — SCSS design system (tokens, BEM components, JS behaviours, playground)
site/     @zeitpunkt/site   — Hugo static site that consumes the kit
```

## Setup

```bash
npm install            # installs workspaces; Hugo comes from the hugo-extended npm package
```

## Commands

```bash
npm run kit:dev        # UI kit playground  → http://localhost:5173
npm run site:dev       # Hugo + Sass watch  → http://localhost:1313
npm run build          # kit CSS + site → site/public
```

## Writing an article

Create a page bundle `site/content/articles/<slug>/index.md` with a `cover.jpg` next to it.
Front matter: `title`, `date`, `lede`, `rubric`, `categories: [slug]`, `authors: [slug]`, `tags`,
`caption`, `credit`, optional `featured`, `fact`, `readTime`, `issue`.

Shortcodes: `pullquote`, `stat`, `steps`, `figures` (see `site/layouts/_shortcodes/`).
Authors and categories live in `site/content/authors/<slug>/_index.md` and `site/content/categories/<slug>/_index.md`.

## Fonts

Stardom (ITF Free Font License) is self-hosted from `ui-kit/fonts`. It has no Cyrillic glyphs —
Cyrillic text in `--font-serif` falls back to Playfair Display.
