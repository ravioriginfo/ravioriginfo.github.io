---
description: Remove an app from the portfolio site and record it as excluded
argument-hint: "<slug or app title> [reason]"
---

Remove a project from the portfolio site, following **CLAUDE.md → Workflows → Remove a project** exactly.

Input: $ARGUMENTS

1. Find the entry in `src/data/portfolio.js` by slug or title. If it's ambiguous, ask.
2. Delete the entry and its icon in `public/images/apps/`.
3. In `docs/PROJECTS.md`:
   - move the Registry row to **Excluded**, with the reason (default "owner asked to remove") and today's date
   - update Totals
   - add a Changelog line
4. If it was featured, promote another app so exactly 4 stay featured. Tell the owner which one.
5. Update the README "See all N apps" count and any texts that mention the app counts.
6. `npm run check` and `npm run build` must pass.
7. Commit, push to `main`, wait for the deploy, and confirm the old URL `https://ravioriginfo.github.io/projects/<slug>` returns 404.

Finish with a one-line confirmation, including the new app totals.
