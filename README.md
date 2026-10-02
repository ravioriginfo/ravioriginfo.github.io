# Ravi Sorathiya — Portfolio

Vue 3 + Vite + Tailwind CSS v4 + Vue Router. Deploys to GitHub Pages.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # pre-renders every page to static HTML in dist/ (+ sitemap.xml)
npm run preview   # serve the production build
```

## Edit content

All text lives in `src/data/portfolio.js` (profile, socials, skills, experience, education, projects).
Images go in `public/images/` and are referenced as `/images/...`. Put a resume at `public/resume.pdf` and set `resumeUrl: '/resume.pdf'`.

## Deploy to GitHub Pages

1. Create a repo named exactly `ravioriginfo.github.io`.
2. Push this project to its `main` branch.
3. In the repo: **Settings → Pages → Source: GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push to `main`.
   Site URL: `https://ravioriginfo.github.io/`

## SEO

- Every route is pre-rendered at build time with `vite-ssg` (real HTML, HTTP 200 on GitHub Pages).
- Per-page title, description, canonical, Open Graph / Twitter tags and JSON-LD: `src/composables/seo.js`.
- `sitemap.xml` is generated on build (`vite.config.js` → `ssgOptions.onFinished`); `public/robots.txt` points to it.
- Social preview image: `public/og.png` (1200×630).
