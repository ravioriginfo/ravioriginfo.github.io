// `npm run screenshots -- [slug ...] [--max=6]`
// Downloads screenshots from each live app's OWN Google Play listing (the
// owner's published store images), converts them to WebP and records them in
// the app's frontmatter (`screenshots:`). With no slugs, processes every live
// app that has no screenshots yet. Re-run with a slug to refresh that app.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'
import { loadProjects, ROOT_DIR } from './content-fs.mjs'

const args = process.argv.slice(2)
const max = Number(args.find((a) => a.startsWith('--max='))?.split('=')[1] ?? 6)
const wanted = args.filter((a) => !a.startsWith('--'))

const { items } = loadProjects()
const targets = items.filter((p) =>
  p.status === 'live' && p.playPackage && (wanted.length ? wanted.includes(p.slug) : !p.screenshots?.length),
)
if (!targets.length) {
  console.log('Nothing to do (pass slugs to refresh specific apps).')
  process.exit(0)
}

for (const p of targets) {
  const url = `https://play.google.com/store/apps/details?id=${p.playPackage}&hl=en&gl=US`
  const html = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'en' } }).then((r) => r.text())

  // Screenshot <img> tags carry data-screenshot-index; keep listing order, unique images only.
  const shots = []
  for (const m of html.matchAll(/<img[^>]*src="(https:\/\/play-lh\.googleusercontent\.com\/[^"=]+)=[^"]*"[^>]*data-screenshot-index="(\d+)"/g)) {
    if (!shots.some((s) => s.base === m[1])) shots.push({ base: m[1], index: Number(m[2]) })
  }
  shots.sort((a, b) => a.index - b.index)
  const picked = shots.slice(0, max)
  if (!picked.length) {
    console.warn(`⚠ ${p.slug}: no screenshots found on ${url}`)
    continue
  }

  const dir = join(ROOT_DIR, 'public/images/apps', p.slug)
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })

  const entries = []
  for (const [i, s] of picked.entries()) {
    const buf = Buffer.from(await fetch(`${s.base}=w720`).then((r) => r.arrayBuffer()))
    const img = sharp(buf).resize({ width: 720, height: 1280, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 })
    const { data, info } = await img.toBuffer({ resolveWithObject: true })
    writeFileSync(join(dir, `${i + 1}.webp`), data)
    entries.push({ src: `/images/apps/${p.slug}/${i + 1}.webp`, alt: `${p.title} screenshot ${i + 1}`, width: info.width, height: info.height })
  }

  // Replace (or add) the screenshots: block in the frontmatter, leaving the rest untouched.
  const file = join(ROOT_DIR, 'content/projects', `${p.slug}.md`)
  const text = readFileSync(file, 'utf8')
  const end = text.indexOf('\n---', 3)
  let fm = text.slice(0, end).replace(/\nscreenshots:\n(?: {2}- [^\n]*\n(?: {4}[^\n]*\n)*)*/, '\n').replace(/\nscreenshots: \[\]/, '')
  fm = fm.replace(/\n*$/, '\n')
  const block =
    'screenshots:\n' +
    entries.map((e) => `  - src: ${e.src}\n    alt: ${JSON.stringify(e.alt)}\n    width: ${e.width}\n    height: ${e.height}`).join('\n')
  writeFileSync(file, fm + block + text.slice(end))
  console.log(`✓ ${p.slug}: ${entries.length} screenshots (${entries.map((e) => `${e.width}×${e.height}`).join(', ')})`)
}
