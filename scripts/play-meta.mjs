// `npm run play-meta -- [slug ...]`
// Reads each live app's own Google Play listing and records the publishing
// developer (Play Console) account in its frontmatter: `developer` + `developerUrl`.
// With no slugs, processes every live app that doesn't have `developer` yet.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadProjects, ROOT_DIR } from './content-fs.mjs'

const wanted = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const { items } = loadProjects()
const targets = items.filter((p) => p.status === 'live' && p.playPackage && (wanted.length ? wanted.includes(p.slug) : !p.developer))
if (!targets.length) {
  console.log('Nothing to do (pass slugs to refresh specific apps).')
  process.exit(0)
}

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim()

for (const p of targets) {
  const html = await fetch(`https://play.google.com/store/apps/details?id=${p.playPackage}&hl=en&gl=US`, {
    headers: { 'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'en' },
  }).then((r) => r.text())
  const m = html.match(/href="(\/store\/apps\/dev(?:eloper)?\?id=[^"]+)"[^>]*><span>([^<]+)<\/span>/)
  if (!m) {
    console.warn(`⚠ ${p.slug}: developer not found on the listing`)
    continue
  }
  const developer = decode(m[2])
  const developerUrl = `https://play.google.com${decode(m[1])}`

  // Set (or replace) the two keys right after playPackage, leaving the rest untouched.
  const file = join(ROOT_DIR, 'content/projects', `${p.slug}.md`)
  let text = readFileSync(file, 'utf8').replace(/^developer: .*\n/m, '').replace(/^developerUrl: .*\n/m, '')
  text = text.replace(/^(playPackage: .*\n)/m, `$1developer: ${JSON.stringify(developer)}\ndeveloperUrl: ${developerUrl}\n`)
  writeFileSync(file, text)
  console.log(`✓ ${p.slug}: ${developer}`)
}
