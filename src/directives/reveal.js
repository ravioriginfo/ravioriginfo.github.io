// v-reveal — fades/slides an element in the first time it scrolls into view.
// Optional value is a delay in ms: v-reveal="150"
export default {
  mounted(el, { value }) {
    el.classList.add('reveal')
    if (value) el.style.setProperty('--reveal-delay', `${value}ms`)

    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    el._revealObserver = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    el._revealObserver.observe(el)
  },
  unmounted(el) {
    el._revealObserver?.disconnect()
  },
}
