// GitHub Pages serves 404.html for unknown paths; copying index.html there
// lets the Vue router handle deep links like /projects/my-app on reload.
import { copyFileSync } from 'node:fs'

copyFileSync('dist/index.html', 'dist/404.html')
console.log('Copied dist/index.html -> dist/404.html')
