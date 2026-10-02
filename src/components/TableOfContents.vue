<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'

// Builds a table of contents from the rendered article's h2/h3 headings
// (they get ids from markdown-it-anchor) and highlights the one in view.
const props = defineProps({ container: { type: Object, default: null } })

const items = ref([])
const active = ref('')
let observer

watch(() => props.container, init, { flush: 'post', immediate: true })

function init(container) {
  const root = container?.$el ?? container
  if (!root || typeof IntersectionObserver === 'undefined') return
  observer?.disconnect()
  const headings = [...root.querySelectorAll('h2[id], h3[id]')]
  items.value = headings.map((h) => ({ id: h.id, text: h.textContent.replace(/\s*#$/, ''), level: h.tagName === 'H3' ? 3 : 2 }))
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting)
      if (visible.length) active.value = visible[0].target.id
    },
    { rootMargin: '-80px 0px -70% 0px' },
  )
  headings.forEach((h) => observer.observe(h))
}
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <nav v-if="items.length" aria-label="On this page" class="text-sm">
    <p class="mb-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">On this page</p>
    <ul class="space-y-1.5 border-l border-slate-200 dark:border-slate-800">
      <li v-for="i in items" :key="i.id">
        <a
          :href="`#${i.id}`"
          class="-ml-px block border-l py-0.5 transition"
          :class="[
            i.level === 3 ? 'pl-6' : 'pl-3',
            active === i.id
              ? 'border-brand-500 font-medium text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white',
          ]"
        >
          {{ i.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>
