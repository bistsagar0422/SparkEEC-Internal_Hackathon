# SparkEEC 1.0 — Website (React + Vite)

The official website for **SparkEEC 1.0**, a 27-hour hackathon by SOCISE-EEC at
Everest Engineering College. Single-page app with client-side page switching,
a live countdown, and a persistent light/dark theme.

## Run it

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

Requires Node 18+.

## Project structure

```
index.html            App shell, SEO/OG meta, favicon, fonts, data-theme on <html>
public/               copied verbatim to the site root at build time
  sparkeec-logo.png   ← ADD THIS (see "Logo" below) — favicon + nav brand mark
  site.webmanifest    PWA manifest
  robots.txt
src/
  main.jsx            React entry point
  styles.css          theme CSS variables, keyframes, card component styles
  lib.jsx             sx() style helper, useHover, HoverBox, useCountdown, merge
  data.js             all content (tracks, schedule, prizes, rules, FAQ, team…)
  assets/             logos + committee photos (imported, hashed & optimized)
  App.jsx             Nav, Home, Tracks, Schedule, Prizes, Rules, Register, Footer
```

## Logo (one manual step)

The SparkEEC brand mark is loaded as a static file. **Save the logo image as
`public/sparkeec-logo.png`** (ideally a square PNG, transparent or white
background, ~512×512). It then appears automatically as the nav brand mark, the
browser favicon, and the social-share/OG image. Until the file exists the nav
gracefully falls back to the animated "SparkEEC" wordmark — nothing breaks.

## Deploy (static hosting)

`npm run build` emits a fully static site to `dist/` with **relative asset
paths** (`base: './'`), so it works from a root domain or any sub-path.

- **Netlify / Vercel / Cloudflare Pages** — build command `npm run build`,
  publish directory `dist`.
- **GitHub Pages** — push `dist/` to the `gh-pages` branch (e.g. with the
  `gh-pages` package), or use a Pages action. Relative paths already handle the
  `/<repo>/` sub-path.
- **Any web server** — copy the contents of `dist/` to the web root. It's a
  single page with no server-side routing, so no SPA rewrite rules are needed.

For accurate social-share previews, replace the relative `og:image` in
`index.html` with your deployed absolute URL once you have a domain.

## How it works

- **Routing** — `App` holds a `page` state; the nav swaps which page component
  renders. No router dependency (add `react-router-dom` if you want real URLs).
- **Theme** — `data-theme="dark|light"` is set on `<html>`; all colors are CSS
  variables in `styles.css`, so flipping the attribute restyles everything. The
  choice persists in `localStorage`.
- **Styling** — inline styles are written as CSS strings and parsed by `sx()` in
  `lib.jsx`; `HoverBox` merges a second style string on hover. If you prefer
  classic CSS classes, they translate 1:1.
- **Countdown** — `useCountdown` targets `EVENT_START`/`EVENT_END` in `data.js`
  and switches to a "we are live" / "wrapped" message automatically.

## Customizing

- **Content** — edit the arrays in `src/data.js`.
- **Registration** — set `REGISTRATION_OPEN` and `REGISTRATION_URL` at the top of
  `src/App.jsx` (wire the button to your real form).
- **Colors / theme** — edit the CSS variables in `src/styles.css`.
- **Committee** — `TEAM` in `data.js`; the Advisor and Event Lead are featured
  separately in the Organizing Committee block in `App.jsx`.
