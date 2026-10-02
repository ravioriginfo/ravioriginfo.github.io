import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, scrollBehavior } from './router'
import reveal from './directives/reveal'
import './style.css'

// Every route is pre-rendered to static HTML at build time (see ssgOptions in
// vite.config.js) so search engines get real content and a 200 status.
export const createApp = ViteSSG(App, { routes, scrollBehavior }, ({ app }) => {
  app.directive('reveal', reveal)
})
