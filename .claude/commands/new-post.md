---
description: Draft a Dev Notes article from the real source projects (stays a draft until the owner approves)
argument-hint: "<topic or app, e.g. 'how the alarm clock schedules exact alarms'>"
---

Write a new blog article, following **CLAUDE.md → Workflows → Write an article** exactly.

Topic: $ARGUMENTS (if empty, take the first entry under **Ideas** in `docs/POSTS.md`)

1. Find the relevant source project(s) under `D:\workspace\producation` / `D:\workspace\development` and read the actual code, read-only. Note the real class names, APIs and decisions.
2. Create `content/blog/<kebab-slug>.md`. Frontmatter per `postSchema` in `src/content/schema.js`:
   - title, description ≤ 170 chars, today's date, 3–6 tags, relatedProjects (existing slugs)
   - **draft: true**
3. Body:
   - a short intro
   - `##` sections that tell the story (problem → approach → lessons)
   - simplified code snippets marked as simplified, with no secrets
   - a "Takeaways" list
   - links to apps as `/projects/<slug>`
4. Never invent metrics, user counts, dates or clients.
5. Update `docs/POSTS.md`: add the Registry row (status `draft`), update Totals, remove the idea line if it came from Ideas, and add a Changelog line.
6. Run `npm run check`.
7. Tell the owner how to review it (`npm run dev`, then open `/blog/<slug>`, or read the Markdown file). Leave `draft: true`. Publish only when they explicitly approve.
