# CLAUDE.md

Guidance for AI agents working on this repo. **This site is maintained with AI**, so follow these workflows exactly and keep the docs in sync.

- **What:** Ravi Sorathiya's Android-developer portfolio → **https://ravioriginfo.github.io/**
- **Stack:** Vue 3 + Vite 8 + Tailwind CSS v4 + Vue Router 5, pre-rendered with `vite-ssg`, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Read first

| File | What it is |
| --- | --- |
| [`docs/SITE_PLAN.md`](docs/SITE_PLAN.md) | Pages, content rules (field-by-field), design system, SEO, backlog, **decision log** |
| [`docs/PROJECTS.md`](docs/PROJECTS.md) | **Project registry**: Inbox (to add), Registry (on site), Excluded (never re-add), Changelog |
| [`src/data/portfolio.js`](src/data/portfolio.js) | All site content. The `projects` array must match the PROJECTS.md registry. |

## Commands

```bash
npm run dev      # http://localhost:5173
npm run check    # registry ↔ data sync + content rules (CI runs this; must pass)
npm run build    # pre-render all pages to dist/ + sitemap.xml
```

## Workflows

### Add a project (`/add-project <folder>`, or "process the project inbox")
Source projects live in `D:\workspace\producation\` (shipped) and `D:\workspace\development\` (`completed/`, `ongoing/`).

1. **Check `docs/PROJECTS.md` → Excluded and Registry.** Don't re-add excluded apps. If the `applicationId` already exists in the registry, it's a variant: update that entry (and `variants`) instead of adding a new one.
2. **Read the source folder (read-only; never modify it).** Pick the newest version subfolder and the main app module, then collect:
   - `app_name` (strings.xml) and `applicationId` (build.gradle(.kts))
   - language and UI toolkit (Compose vs XML)
   - main libraries
   - manifest: permissions, activities, services, roles (InCallService, CallScreeningService, default SMS…)
   - any README or CLAUDE.md in the project
3. **Check Google Play status:** `curl -s -o /dev/null -w "%{http_code}" "https://play.google.com/store/apps/details?id=<applicationId>&hl=en"`
   - 200 → `status: 'live'` + `playUrl: play('<id>')`
   - 404 → `completed` or `in-progress` (ask the owner if unclear)
4. **Copy the icon** to `public/images/apps/<slug>.<ext>`, using the preference order in SITE_PLAN §3 → Icon rules.
5. **Add the entry** to `projects` in `src/data/portfolio.js`, following SITE_PLAN §3:
   - user-facing `features`, technical `highlights`, existing tag spellings
   - honest `basedOn` for open-source forks
   - **no secrets**: no ad unit IDs, API keys, keystore info
   - Order within the array: in-progress first, then live, then completed.
6. **Update `docs/PROJECTS.md`:**
   - add the Registry row (same slug/title/status/type/featured/package)
   - update **Totals**
   - remove the Inbox line
   - add a **Changelog** line with today's date
7. **Update the README** "See all N apps" count. If the live-app count changed, also update the numbers in `profile.shortBio` / `tagline`, the HomeView SEO description, AboutView/ProjectsView descriptions, `index.html`, and `public/og.png` (see *Regenerate og.png*).
8. **Verify:**
   - `npm run check` passes
   - `npm run build` succeeds and renders `dist/projects/<slug>.html`
9. **Publish** (the owner expects changes to go live):
   - commit with a clear message and push to `main`
   - wait for the Actions run to succeed
   - confirm with `curl https://ravioriginfo.github.io/projects/<slug>` (expect 200)

### Remove a project (`/remove-project <slug>`)
1. Delete the entry from `portfolio.js` and its icon from `public/images/apps/`.
2. In `docs/PROJECTS.md`:
   - move the row from Registry to **Excluded** (with reason and date)
   - update Totals
   - add a Changelog line
3. If it was `featured`, promote another app so exactly 4 stay featured.
4. Update counts (step 7 above), then `npm run check`, build, commit, push, and verify the old URL returns 404.

### Update a project
Edit the entry in `portfolio.js`. If title/status/type/featured/package changed, update the registry row too, then check, build, push. **Never change a published `slug`.**

### Regenerate og.png (1200×630 social image)
1. Write an HTML card: dark green gradient, name, "Android Developer · Kotlin & Compose", app count line, `ravioriginfo.github.io`, and a 3×3 grid of icons from `public/images/apps/`.
2. Screenshot it with headless Edge:
   `msedge --headless=new --window-size=1200,630 --screenshot=<scratch>\og.png file:///<scratch>/og.html`
   Write to a path **without spaces**, then copy it to `public/og.png`.

## Rules

- **Read-only on `D:\workspace\producation` and `D:\workspace\development`.** Never edit, build or commit there.
- **Never publish secrets:** ad unit IDs, API keys, keystore files or passwords, push-service IDs, source code.
- **Don't invent facts:** no made-up downloads, ratings, clients or dates. Leave placeholders marked `// TODO` for the owner.
- **SSR-safe code only:** no `window`/`document` during component setup (use `onMounted`, handlers, or `typeof document` guards).
- **Per-page SEO** goes through `useSeo()` (`src/composables/seo.js`); don't set `document.title` manually.
- **Record decisions:** when a decision changes, add a row to SITE_PLAN §8 Decision log.
- **Commits:** end messages with the Co-Authored-By trailer used in the history.
