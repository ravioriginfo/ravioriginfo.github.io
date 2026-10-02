import { useEventListener } from '@vueuse/core'
import { useRouter } from 'vue-router'

/**
 * Markdown renders plain <a href="/projects/x"> links. This makes clicks on
 * internal links inside `target` use the SPA router instead of a full reload.
 */
export function useInternalLinks(target) {
  const router = useRouter()
  useEventListener(target, 'click', (e) => {
    const a = e.target.closest?.('a[href]')
    if (!a || a.target === '_blank' || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return
    const href = a.getAttribute('href')
    if (!href?.startsWith('/') || href.startsWith('//')) return
    e.preventDefault()
    router.push(href)
  })
}
