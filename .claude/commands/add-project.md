---
description: Add an Android app from D:\workspace to the portfolio site (or process the PROJECTS.md inbox)
argument-hint: "[source folder under D:\\workspace, e.g. producation/NewApp] [notes]"
---

Add a project to the portfolio site, following **CLAUDE.md → Workflows → Add a project** exactly.

Input: $ARGUMENTS

- If a folder is given, add that project. Any extra words are owner notes (e.g. "feature it", "in progress").
- If no folder is given, process every line in the **Inbox** section of `docs/PROJECTS.md`.

Steps (details in CLAUDE.md):
1. Check `docs/PROJECTS.md`, both Excluded and Registry (to spot variants by applicationId).
2. Read the source folder read-only: app_name, applicationId, stack, libraries, manifest features.
3. Check Google Play status with curl to decide `live` vs `completed`/`in-progress`.
4. Copy the icon to `public/images/apps/<slug>.<ext>`.
5. Add the entry to `src/data/portfolio.js`, following the rules in `docs/SITE_PLAN.md` §3. No secrets.
6. Update `docs/PROJECTS.md`: Registry row, Totals, clear the Inbox line, Changelog line with today's date.
7. Update counts: README "See all N apps", plus the profile/SEO texts and og.png if the live count changed.
8. `npm run check` and `npm run build` must pass.
9. Commit, push to `main`, wait for the deploy to succeed, and confirm `https://ravioriginfo.github.io/projects/<slug>` returns 200.

Finish with a short summary: what was added, its status, its live URL, and anything the owner should confirm.
