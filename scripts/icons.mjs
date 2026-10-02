// `npm run icons`: normalises app icons and generates PWA icons.
//  1. public/images/apps/<slug>.(png|jpg|webp) → 256×256 WebP (originals removed),
//     updating `icon:` in content/projects/<slug>.md when the extension changes.
//  2. public/favicon.svg → pwa-192.png, pwa-512.png, maskable-512.png, apple-touch-icon.png
import { existsSync, readdirSync, readFileSync, renameSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'
import { ROOT_DIR } from './content-fs.mjs'

const APPS = join(ROOT_DIR, 'public/images/apps')
const PUBLIC = join(ROOT_DIR, 'public')
const SIZE = 256

let saved = 0
for (const file of readdirSync(APPS)) {
  const m = file.match(/^([a-z0-9-]+)\.(png|jpe?g|webp)$/)
  if (!m) continue
  const [, slug, ext] = m
  const src = join(APPS, file)
  const meta = await sharp(src).metadata()
  if (ext === 'webp' && meta.width <= SIZE) continue // already normalised

  const before = statSync(src).size
  const out = await sharp(src).resize(SIZE, SIZE, { fit: 'cover' }).webp({ quality: 90 }).toBuffer()
  const tmp = join(APPS, `${slug}.tmp.webp`)
  writeFileSync(tmp, out)
  if (ext !== 'webp') unlinkSync(src)
  renameSync(tmp, join(APPS, `${slug}.webp`))
  saved += before - out.length

  const md = join(ROOT_DIR, 'content/projects', `${slug}.md`)
  if (existsSync(md)) {
    const text = readFileSync(md, 'utf8')
    const next = text.replace(/^icon: .*$/m, `icon: /images/apps/${slug}.webp`)
    if (next !== text) writeFileSync(md, next)
  }
  console.log(`icon  ${file} → ${slug}.webp  (${(before / 1024).toFixed(0)} KB → ${(out.length / 1024).toFixed(0)} KB)`)
}

// PWA / home-screen icons from the favicon (maskable gets a safe-zone padding).
const svg = readFileSync(join(PUBLIC, 'favicon.svg'))
for (const [name, size, pad] of [['pwa-192.png', 192, 0], ['pwa-512.png', 512, 0], ['apple-touch-icon.png', 180, 0], ['maskable-512.png', 512, 0.1]]) {
  const inner = Math.round(size * (1 - pad * 2))
  const icon = await sharp(svg, { density: 512 }).resize(inner, inner).png().toBuffer()
  const img = pad
    ? await sharp({ create: { width: size, height: size, channels: 4, background: '#059669' } }).composite([{ input: icon, gravity: 'center' }]).png().toBuffer()
    : icon
  writeFileSync(join(PUBLIC, name), img)
}
console.log(`pwa   icons written · app icons saved ${(saved / 1024).toFixed(0)} KB`)
