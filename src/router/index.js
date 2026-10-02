import { createRouter, createWebHistory } from 'vue-router'
import { profile } from '../data/portfolio'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue'), meta: { title: 'About' } },
  { path: '/projects', name: 'projects', component: () => import('../views/ProjectsView.vue'), meta: { title: 'Projects' } },
  { path: '/projects/:slug', name: 'project', component: () => import('../views/ProjectDetailView.vue'), props: true, meta: { title: 'Project' } },
  { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue'), meta: { title: 'Contact' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue'), meta: { title: 'Not found' } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} — ${profile.name}` : `${profile.name} — Portfolio`
})

export default router
