import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// User site (<user>.github.io) is served from the root, so base is '/'.
export default defineConfig({
  base: '/',
  plugins: [vue(), tailwindcss()],
})
