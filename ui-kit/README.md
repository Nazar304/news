# @zeitpunkt/ui-kit

SCSS design system "International Editorial" for ZEITPUNKT (from the Stitch project).
Monochrome, Hanken Grotesk + Inter (+ Stardom serif), 12-column grid, 0px radius, BEM.

## Commands (from repo root)

```bash
npm run kit:dev     # playground with live reload → http://localhost:5173
npm run kit:build   # dist/ui-kit.css + dist/ui-kit.min.css
```

## Structure

```
src/
  tokens/       colors, typography, layout (Sass maps — single source of truth)
  abstracts/    functions clr() space() rem() z(); mixins mq() type() label() …
  base/         @font-face, :root CSS variables, reset, element defaults
  layout/       .section .wrap .grid(--12, --cols-N) .span-{bp}-N .start-{bp}-N .stack .cluster .spread .split
  components/   one file per component (BEM)
  utilities/    .t-* type, .c-* color, .bg-*, .from-{bp}/.until-{bp}, .visually-hidden
  _tools.scss   tokens + abstracts, no CSS output
  index.scss    full build
js/index.js     menu, ticker, reading progress, A-/A+, toggle groups, share
fonts/stardom/  self-hosted Stardom (ITF Free Font License)
playground/     docs page with every component
```

## Use in an app

```scss
// whole kit
@use 'pkg:@zeitpunkt/ui-kit' with ($font-path: '/fonts');

// in your own component files — tokens & mixins only
@use 'pkg:@zeitpunkt/ui-kit/tools' as *;

.my-block {
  @include type(headline-sm);
  padding: space(md);
  color: clr(on-surface-variant);

  @include mq(lg) { padding: space(lg); }
}
```

Compile with `sass --pkg-importer=node`. Or use plain CSS: `@zeitpunkt/ui-kit/css`.

Fonts in `<head>` (Google): Hanken Grotesk 600–900, Inter 400–600, Playfair Display 400
(Cyrillic fallback for Stardom), Material Symbols Outlined.

## Components

| Block | Modifiers / elements |
|---|---|
| `.btn` | `--outline --subtle --inverse --ghost --link`, `--sm --lg --block --split --icon`, `.btn-group` |
| `.badge` | `--subtle --muted --variant --outline --inverse --dark --md`; `.dot` |
| `.tag` `.chip` `.segmented` | state via `aria-pressed="true"` / `aria-current="page"` |
| `.meta` `.eyebrow` `.section-head` `.breadcrumb` `.ribbon` | |
| `.field` `.input` `.check` `.choice` `.inline-form` `.alert` | |
| `.media` | `--16x9 --4x3 --4x5 --hero`, `__caption __overlay __badge` |
| `.card` | `--lead --compact --muted --flush --tenet --link --clamp`; `.quote-tile` `.chart-tile` |
| `.panel` `.fact` `.toc` | |
| `.plan` | `--featured` |
| `.checklist` `.numbered` `.link-list` | |
| `.pullquote` `.creed` | |
| `.stat` `.meter` `.ratio` `.bars` `.read-progress` | value via `style="--value: 88%"` |
| `.prose` | `--dropcap`, `data-size="0|1|2"`; `.headline` `.lede` `.byline` `.portrait` |
| `.masthead` `.site-footer` `.cta-strip` `.ticker` `.timeline` `.index-table` `.pager` `.pagination` | |
