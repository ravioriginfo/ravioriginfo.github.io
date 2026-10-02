import { writeFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { projects, SITE_URL } from './src/data/portfolio.js'

const pages = ['/', '/about', '/projects', '/contact', ...projects.map((p) => `/projects/${p.slug}`)]

// User site (<user>.github.io) is served from the root, so base is '/'.
export default defineConfig({
  base: '/',
  plugins: [vue(), tailwindcss()],
  ssgOptions: {
    // flat: /about -> about.html, which GitHub Pages serves at /about with a 200.
    dirStyle: 'flat',
    formatting: 'minify',
    // '/404' renders the catch-all route into 404.html for unknown URLs.
    includedRoutes: () => [...pages, '/404'],
    onFinished() {
      const today = new Date().toISOString().slice(0, 10)
      const priority = (p) => (p === '/' ? '1.0' : p === '/projects' ? '0.9' : p.startsWith('/projects/') ? '0.8' : '0.6')
      const urls = pages
        .map((p) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod><priority>${priority(p)}</priority></url>`)
        .join('\n')
      writeFileSync(
        'dist/sitemap.xml',
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )
      console.log(`sitemap.xml: ${pages.length} URLs`)
    },
  },
})
