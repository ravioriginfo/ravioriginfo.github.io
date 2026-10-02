// Verifies docs/PROJECTS.md (registry) and src/data/portfolio.js agree, and that
// every project entry follows the content rules in docs/SITE_PLAN.md.
// Runs in CI before every deploy: `npm run check`.
import { existsSync, readFileSync } from 'node:fs'
import { projects } from '../src/data/portfolio.js'

const TYPES = ['Messaging', 'Dialer & Contacts', 'Gallery & Media', 'Productivity', 'Social']
const STATUSES = ['live', 'completed', 'in-progress']
const errors = []
const warn = []

// ── Parse the registry table ────────────────────────────────
const md = readFileSync('docs/PROJECTS.md', 'utf8')
const block = md.match(/<!-- registry:start[^>]*-->([\s\S]*?)<!-- registry:end -->/)
if (!block) {
  console.error('✗ docs/PROJECTS.md: registry markers not found')
  process.exit(1)
}
const rows = block[1]
  .split('\n')
  .filter((l) => l.trim().startsWith('|') && !/^\|\s*(Slug|---)/.test(l.trim()))
  .map((l) => l.split('|').slice(1, -1).map((c) => c.trim()))
  .map(([slug, title, status, type, featured, pkg]) => ({ slug, title, status, type, featured: featured === 'yes', pkg: pkg === '—' ? '' : pkg }))

const bySlug = new Map(projects.map((p) => [p.slug, p]))
const regSlugs = new Set(rows.map((r) => r.slug))

// ── Registry ↔ portfolio.js ────────────────────────────────
for (const r of rows) {
  const p = bySlug.get(r.slug)
  if (!p) { errors.push(`${r.slug}: in PROJECTS.md registry but missing from portfolio.js`); continue }
  if (p.title !== r.title) errors.push(`${r.slug}: title differs (registry "${r.title}" vs data "${p.title}")`)
  if (p.status !== r.status) errors.push(`${r.slug}: status differs (registry ${r.status} vs data ${p.status})`)
  if (p.type !== r.type) errors.push(`${r.slug}: type differs (registry ${r.type} vs data ${p.type})`)
  if (!!p.featured !== r.featured) errors.push(`${r.slug}: featured differs (registry ${r.featured} vs data ${!!p.featured})`)
  const pkg = (p.playUrl ?? '').split('id=')[1] ?? ''
  if (pkg !== r.pkg) errors.push(`${r.slug}: Play package differs (registry "${r.pkg}" vs data "${pkg}")`)
}
for (const p of projects) if (!regSlugs.has(p.slug)) errors.push(`${p.slug}: in portfolio.js but missing from PROJECTS.md registry`)

// ── Content rules (docs/SITE_PLAN.md §3) ───────────────────
const slugs = new Set()
for (const p of projects) {
  const at = `${p.slug}:`
  if (slugs.has(p.slug)) errors.push(`${at} duplicate slug`)
  slugs.add(p.slug)
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) errors.push(`${at} slug must be kebab-case`)
  if (!TYPES.includes(p.type)) errors.push(`${at} unknown type "${p.type}" (allowed: ${TYPES.join(', ')})`)
  if (!STATUSES.includes(p.status)) errors.push(`${at} unknown status "${p.status}"`)
  if (p.status === 'live' && !p.playUrl) errors.push(`${at} live apps need playUrl`)
  if (p.status !== 'live' && p.playUrl) warn.push(`${at} has playUrl but status is ${p.status}`)
  if (p.icon && !existsSync(`public${p.icon}`)) errors.push(`${at} icon file not found: public${p.icon}`)
  if (!p.icon) warn.push(`${at} no icon (gradient letter tile will be shown)`)
  if (!p.summary) errors.push(`${at} summary is required`)
  else if (p.summary.length > 110) warn.push(`${at} summary is ${p.summary.length} chars (aim for ≤ 110)`)
  if (!(p.features?.length >= 3)) errors.push(`${at} needs at least 3 features`)
  if (!(p.highlights?.length >= 2)) errors.push(`${at} needs at least 2 highlights`)
  if (!(p.tags?.length >= 3)) errors.push(`${at} needs at least 3 tags`)
}
const featured = projects.filter((p) => p.featured).length
if (featured !== 4) warn.push(`${featured} featured projects (home page layout expects 4)`)

// ── No secrets in content ──────────────────────────────────
const data = readFileSync('src/data/portfolio.js', 'utf8')
for (const [re, what] of [[/ca-app-pub-\d+/, 'AdMob ad unit ID'], [/AIza[0-9A-Za-z_-]{20,}/, 'Google API key'], [/storePassword|keyPassword/, 'keystore secret']])
  if (re.test(data)) errors.push(`portfolio.js contains a ${what}; remove it`)

// ── Report ─────────────────────────────────────────────────
for (const w of warn) console.warn(`⚠ ${w}`)
if (errors.length) {
  for (const e of errors) console.error(`✗ ${e}`)
  console.error(`\n${errors.length} problem(s). See docs/SITE_PLAN.md §3 and docs/PROJECTS.md.`)
  process.exit(1)
}
const count = (s) => projects.filter((p) => p.status === s).length
console.log(`✓ ${projects.length} projects in sync (${count('live')} live · ${count('in-progress')} in progress · ${count('completed')} completed)`)
