<div align="center">

<a href="https://ravioriginfo.github.io/">
  <img src="public/og.png" alt="Ravi Sorathiya — Android Developer portfolio" width="100%" />
</a>

# Ravi Sorathiya — Portfolio

**Android developer · Kotlin & Jetpack Compose · 11 apps live on Google Play**

### 🌐 [ravioriginfo.github.io](https://ravioriginfo.github.io/)

[![Live site](https://img.shields.io/badge/Live-ravioriginfo.github.io-10b981?style=for-the-badge&logo=googlechrome&logoColor=white)](https://ravioriginfo.github.io/)
[![Deploy](https://img.shields.io/github/actions/workflow/status/ravioriginfo/ravioriginfo.github.io/deploy.yml?branch=main&style=for-the-badge&label=Deploy&logo=githubactions&logoColor=white)](https://github.com/ravioriginfo/ravioriginfo.github.io/actions)

![Vue](https://img.shields.io/badge/Vue_3-35495E?logo=vuedotjs&logoColor=4FC08D)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-0F172A?logo=tailwindcss&logoColor=38BDF8)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222?logo=githubpages&logoColor=white)

</div>

---

## 🔗 Quick links

| Page | URL |
| --- | --- |
| 🏠 Home | https://ravioriginfo.github.io/ |
| 👤 About & tech explorer | https://ravioriginfo.github.io/about |
| 📱 All apps (search + filters) | https://ravioriginfo.github.io/projects |
| 🟢 Only apps live on Google Play | https://ravioriginfo.github.io/projects?status=live |
| 📄 Flagship — PDF Reader & Editor | https://ravioriginfo.github.io/projects/pdf-reader |
| ✉️ Contact | https://ravioriginfo.github.io/contact |

> 💡 **Tip:** press <kbd>Ctrl</kbd> + <kbd>K</kbd> anywhere on the site to search every app.

---

## 📱 Featured apps

| | App | What it is | Status |
| :---: | --- | --- | --- |
| <img src="public/images/apps/pdf-reader.png" width="48" /> | [**PDF Reader & Editor**](https://ravioriginfo.github.io/projects/pdf-reader) | Annotate, sign, edit text, lock, convert & scan PDFs | 🟠 In progress |
| <img src="public/images/apps/phone-call.png" width="48" /> | [**Phone Call**](https://ravioriginfo.github.io/projects/phone-call) | Default dialer with spam blocking & call themes | 🟢 [Google Play](https://play.google.com/store/apps/details?id=com.phonecall.phone.contact.callerdialer) |
| <img src="public/images/apps/messages-compose.webp" width="48" /> | [**Messages**](https://ravioriginfo.github.io/projects/messages-compose) | Default SMS & MMS app built in Jetpack Compose | 🟢 [Google Play](https://play.google.com/store/apps/details?id=com.message.textmessenger.smsapp) |
| <img src="public/images/apps/gallery-pro.webp" width="48" /> | [**Gallery - Photo Gallery**](https://ravioriginfo.github.io/projects/gallery-pro) | Compose gallery with timeline, editor & photo picker | 🟢 [Google Play](https://play.google.com/store/apps/details?id=com.gallery.picturegalleryapp.gallerypro) |

➡️ **[See all 16 apps →](https://ravioriginfo.github.io/projects)**

---

## ✨ What's on the site

- **Search & filters:** find apps by name, feature or tech. Filters live in the URL, so you can share a filtered view.
- **Command palette:** <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd> jumps to any app or page.
- **Project pages:** features, an "under the hood" tech breakdown, a Google Play link, related apps, prev/next.
- **Tech explorer:** click any technology on the About page to see which apps use it.
- **Polish:** typewriter hero, count-up stats, icon marquee, scroll reveal, cursor spotlight, dark mode.
- **SEO-ready:** every page is pre-rendered HTML with meta tags, structured data and a sitemap.

---

## ✏️ How to update the site

Almost everything is in **one file: [`src/data/portfolio.js`](src/data/portfolio.js)**.

| I want to… | Edit this |
| --- | --- |
| Change my name, bio, email, tagline | `profile` |
| Add LinkedIn / X / other links | `socials` |
| Update skills | `skills` |
| Add a job or education entry | `experience` / `education` |
| Add, edit or remove an app | `projects` |
| Change the colour theme | `--color-brand-*` in [`src/style.css`](src/style.css) |

### ➕ Add a new app (3 steps)

1. **Put the icon** in `public/images/apps/`, e.g. `my-app.png` (512×512 works best).
2. **Add an entry** to `projects` in `src/data/portfolio.js`:

   ```js
   {
     slug: 'my-app',                       // URL → /projects/my-app
     title: 'My App',
     type: 'Productivity',                 // Messaging | Dialer & Contacts | Gallery & Media | Productivity | Social
     status: 'live',                       // live | completed | in-progress
     featured: false,                      // true = show on the home page
     icon: '/images/apps/my-app.png',
     playUrl: play('com.example.myapp'),   // omit if not on Google Play
     summary: 'One sentence about the app.',
     features: ['Feature one', 'Feature two'],
     highlights: ['Interesting technical detail'],
     tags: ['Kotlin', 'Jetpack Compose', 'Room'],
   },
   ```

3. **Publish:**

   ```bash
   git add -A
   git commit -m "Add My App"
   git push
   ```

   GitHub Actions rebuilds the site, and the new page (and sitemap entry) goes live in about 1–2 minutes.

### 📝 Still to fill in

- [ ] Real email in `profile.email` (currently `hello@example.com`)
- [ ] Company & dates in `experience`
- [ ] `education`
- [ ] LinkedIn / other profiles in `socials`
- [ ] Optional: `public/resume.pdf`, then set `resumeUrl: '/resume.pdf'`

---

## 🛠️ Run it locally

Requires **Node 20+**.

```bash
npm install
npm run dev       # dev server → http://localhost:5173
npm run build     # pre-render every page to dist/ (+ sitemap.xml)
npm run preview   # serve the production build
```

---

## 🗂️ Project structure

```
├── .github/workflows/deploy.yml   # build + deploy to GitHub Pages on push to main
├── public/
│   ├── images/apps/               # app icons
│   ├── og.png                     # social share image (1200×630)
│   └── robots.txt
├── src/
│   ├── data/portfolio.js          # ⭐ all site content
│   ├── views/                     # pages: Home, About, Projects, ProjectDetail, Contact, 404
│   ├── components/                # ProjectCard, CommandPalette, TypeWriter, CountUp, …
│   ├── composables/seo.js         # per-page meta tags + JSON-LD
│   ├── directives/reveal.js       # v-reveal scroll animation
│   ├── router/index.js            # routes
│   └── style.css                  # Tailwind theme (green brand colours)
└── vite.config.js                 # pre-render routes + sitemap generation
```

---

## 🚀 Deployment

Hosted on **GitHub Pages** at **https://ravioriginfo.github.io/**.

- Every push to `main` triggers [`deploy.yml`](.github/workflows/deploy.yml): `npm ci`, then `npm run build`, then publish `dist/`.
- Check progress under the [**Actions** tab](https://github.com/ravioriginfo/ravioriginfo.github.io/actions).
- One-time setting (already done): **Settings → Pages → Source: GitHub Actions**.

---

## 🔍 SEO

| What | Where |
| --- | --- |
| Pre-rendered HTML for every page (HTTP 200) | `vite-ssg`, routes in `vite.config.js` |
| Title, description, canonical, Open Graph, Twitter | `src/composables/seo.js` |
| Structured data (Person, SoftwareApplication, Breadcrumbs) | `useSeo()` calls in each view |
| Sitemap | auto-generated → https://ravioriginfo.github.io/sitemap.xml |
| Robots | https://ravioriginfo.github.io/robots.txt |

**Next step:** add the site in [Google Search Console](https://search.google.com/search-console) and submit `sitemap.xml`.

---

<div align="center">

Made with 💚 by **Ravi Sorathiya** · [ravioriginfo.github.io](https://ravioriginfo.github.io/)

</div>
