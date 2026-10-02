# Site Plan: ravioriginfo.github.io

> The living plan for Ravi Sorathiya's portfolio. AI agents and humans should read this before changing the site, and update it when a decision changes.
> Live site: **https://ravioriginfo.github.io/** · Repo: https://github.com/ravioriginfo/ravioriginfo.github.io

---

## 1. Purpose

Showcase Ravi Sorathiya as an **Android developer (Kotlin, Jetpack Compose)**, with the Google Play apps he has shipped at the centre.

**Primary audiences:** recruiters, clients, other developers.

**Goals, in order:**
1. Prove real shipped work (Google Play apps, with links).
2. Show technical depth (architecture, platform APIs).
3. Make contact easy.
4. Rank for the name "Ravi Sorathiya".

---

## 2. Pages

| Route | View | Purpose |
| --- | --- | --- |
| `/` | `src/views/HomeView.vue` | Hero + typewriter roles, count-up stats, phone mockup, icon marquee, featured apps, flagship spotlight (PDF Reader), CTA |
| `/about` | `src/views/AboutView.vue` | Bio, info card, interactive **tech explorer** (skill → apps), experience & education timelines |
| `/projects` | `src/views/ProjectsView.vue` | All apps; search + status/type filters synced to the URL (`?q=&status=&type=`) |
| `/projects/:slug` | `src/views/ProjectDetailView.vue` | Features / Under-the-hood tabs, tech stack, Google Play badge, open-source credit, related apps, prev/next |
| `/contact` | `src/views/ContactView.vue` | Email, socials, mailto form (static hosting has no backend) |
| `/404` | `src/views/NotFoundView.vue` | Not found (`noindex`) |

**Global UI:**
- Sticky nav with search button and dark-mode toggle
- <kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>K</kbd> command palette (`CommandPalette.vue`)
- Scroll progress bar
- Footer

---

## 3. Content model

All content lives in [`src/data/portfolio.js`](../src/data/portfolio.js). The **list** of apps is tracked in [`PROJECTS.md`](PROJECTS.md).

### Project fields

| Field | Required | Rules |
| --- | --- | --- |
| `slug` | ✅ | kebab-case, unique, becomes `/projects/<slug>`. **Never change after publishing** (breaks links/SEO). |
| `title` | ✅ | Public app name as on Google Play (drop leading `#` from `app_name`). |
| `type` | ✅ | One of: `Messaging`, `Dialer & Contacts`, `Gallery & Media`, `Productivity`, `Social`. Add a new type only if none fits, and record it in the Decision log. |
| `status` | ✅ | `live` (on Google Play, link verified) · `completed` (finished, unpublished) · `in-progress` |
| `featured` | — | `true` shows it on the home page. **Keep exactly 4 featured.** |
| `icon` | ✅ | `/images/apps/<slug>.png\|webp`. See the icon rules below. |
| `playUrl` | live only | `play('<applicationId>')`. Required when `status: 'live'`. |
| `summary` | ✅ | One sentence, user-facing, ≤ 110 chars. Used as the card text and in SEO descriptions. |
| `features` | ✅ | 3–8 user-facing bullets, written from what the code actually does. |
| `highlights` | ✅ | 2–5 technical bullets (architecture, platform APIs, libraries). |
| `tags` | ✅ | 4–10 technologies. **Reuse existing tag spellings** (e.g. `Jetpack Compose`, not `Compose`) so the tech explorer and search group them correctly. |
| `basedOn` | — | Name of the open-source project it's derived from (honest credit, shown on the detail page). |
| `variants` | — | One sentence if several source folders were grouped into this entry. |

### Icon rules
Copy the icon from the app's source, in this order of preference:
1. `app/src/main/ic_launcher-playstore.png` (512×512)
2. `res/mipmap-xxxhdpi/ic_launcher.(png|webp)`
3. The file named in the manifest's `android:icon` (e.g. `@mipmap/app_logo_square`), xxxhdpi or xxhdpi

Save it as `public/images/apps/<slug>.<ext>`. If none exists, leave `icon: ''` and the UI shows a gradient letter tile.

### Writing rules
- Describe only what the code shows. **Never invent** downloads, ratings, users or clients.
- **Never copy secrets** into the site: ad unit IDs (`ca-app-pub-…`), API keys (`AIza…`), keystore info, push app IDs.
- If the app is a fork or rebrand of open-source code, set `basedOn`.
- Group variant folders of one product (same `applicationId`) into **one** entry.

---

## 4. Design system

- **Theme:** emerald → green → teal gradient. Tokens are `--color-brand-*` in [`src/style.css`](../src/style.css).
- **Utilities:** `bg-brand-gradient`, `text-gradient`, `card`, `btn-primary`, `btn-ghost`, `container-page`.
- **Status colours:** live = emerald, completed = sky, in-progress = amber (`StatusBadge.vue`).
- **Motion:**
  - `v-reveal` directive for scroll-in animations
  - `TypeWriter`, `CountUp` and `IconMarquee` components
  - All motion respects `prefers-reduced-motion`
- **Dark mode:** class-based (`useDark`), with the system preference as the default.
- **Icons:** inline SVGs in `AppIcon.vue`, so there's no icon library dependency.
- **Play links:** use `GooglePlayBadge.vue` (sizes `sm | md | lg`).

---

## 5. Tech & build

- **Stack:** Vue 3, Vite 8, Tailwind CSS v4, Vue Router 5, @vueuse/core
- **Pre-rendering:** `vite-ssg` pre-renders every route to static HTML (`dirStyle: 'flat'`), so `/about` is served from `about.html` with HTTP 200.
- **Route list:** comes from `projects` in `vite.config.js`. New apps get a page and a sitemap entry automatically.
- **SSR safety:** code must not touch `window`/`document` during setup. Use `onMounted`, event handlers, or `typeof document` guards.
- **Deploy:** push to `main` → `.github/workflows/deploy.yml` runs `npm ci` → `npm run check` → `npm run build` → GitHub Pages.

---

## 6. SEO

- Per-page meta tags come from `useSeo()` in [`src/composables/seo.js`](../src/composables/seo.js): title, description, canonical, Open Graph, Twitter, JSON-LD.
- **JSON-LD:** Person + WebSite (home), ProfilePage (about), CollectionPage/ItemList (projects), SoftwareApplication + BreadcrumbList (each app).
- **Generated:** `sitemap.xml` on build. **Static:** `public/robots.txt`, `public/og.png` (1200×630).
- **When the profile changes notably** (new app count, new headline), regenerate `public/og.png`. The process is in [`CLAUDE.md`](../CLAUDE.md) → *Regenerate og.png*.

---

## 7. Backlog

- [ ] Real email in `profile.email` (currently `hello@example.com`)
- [ ] Company & dates in `experience`; fill `education`
- [ ] LinkedIn / other profiles in `socials`
- [ ] Optional: `public/resume.pdf` + `resumeUrl`
- [ ] Google Search Console: add the `google-site-verification` meta tag, then submit `sitemap.xml`
- [ ] Set the repo "Website" field to https://ravioriginfo.github.io/
- [ ] Ideas: screenshots gallery per app, Play Store ratings (only if fetched from real data), blog/notes

---

## 8. Decision log

Newest first. Record decisions that a future agent might otherwise undo.

| Date | Decision |
| --- | --- |
| 2026-10-02 | Only published (or actively developed) apps are shown; unpublished duplicates removed. See `PROJECTS.md` → Excluded. |
| 2026-10-02 | Search matches every word in any order, ranked title > keywords/tags > text (`src/utils/search.js`). |
| 2026-10-02 | Pre-render with `vite-ssg` so deep links return 200 (the earlier SPA used a `404.html` fallback, which blocked indexing). |
| 2026-10-02 | Green gradient theme replaced indigo/violet (owner preference). |
| 2026-10-02 | Variant folders of one product are grouped into one card (e.g. MessageUpdate + Message_SavexDesing). |
| 2026-10-02 | Google Play links are shown publicly (owner approved); no source code, keys or ad IDs are ever published. |
