# Ravi Sorathiya — Portfolio

Vue 3 + Vite + Tailwind CSS v4 + Vue Router. Deploys to GitHub Pages.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/ (+ 404.html for deep links)
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
