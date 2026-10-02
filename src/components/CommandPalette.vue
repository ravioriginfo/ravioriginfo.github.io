<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { onKeyStroke, useScrollLock } from '@vueuse/core'
import { nav, projects } from '../data/portfolio'
import AppIcon from './AppIcon.vue'
import StatusBadge from './StatusBadge.vue'
import { projectFields, score, tokenize } from '../utils/search'

const open = defineModel({ type: Boolean, default: false })
const router = useRouter()
const query = ref('')
const active = ref(0)
const input = ref(null)
const locked = useScrollLock(typeof document !== 'undefined' ? document.body : null)

const entries = [
  ...nav.map((n) => ({ id: n.to, label: n.label, hint: 'Page', to: n.to, fields: { title: n.label } })),
  ...projects.map((p) => ({
    id: p.slug,
    label: p.title,
    hint: p.type,
    to: `/projects/${p.slug}`,
    icon: p.icon,
    status: p.status,
    fields: projectFields(p),
  })),
]

const results = computed(() => {
  const tokens = tokenize(query.value)
  if (!tokens.length) return entries
  return entries
    .map((e, i) => ({ e, i, s: score(e.fields, tokens) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map((r) => r.e)
})

watch(results, () => (active.value = 0))
// Keep the highlighted row visible while arrowing through a long list.
watch(active, async (i) => {
  await nextTick()
  document.getElementById(`palette-item-${i}`)?.scrollIntoView({ block: 'nearest' })
})
watch(open, async (v) => {
  locked.value = v
  if (v) {
    query.value = ''
    await nextTick()
    input.value?.focus()
  }
})

onKeyStroke(['k', 'K'], (e) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault()
    open.value = !open.value
  }
})
onKeyStroke('Escape', () => (open.value = false))

function go(entry) {
  if (!entry) return
  open.value = false
  router.push(entry.to)
}

function onKey(e) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    active.value = (active.value + 1) % Math.max(results.value.length, 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    active.value = (active.value - 1 + results.value.length) % Math.max(results.value.length, 1)
  } else if (e.key === 'Enter') {
    go(results.value[active.value])
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-100"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/50 px-4 pt-[12vh] backdrop-blur-sm" @click.self="open = false">
        <div class="card w-full max-w-xl overflow-hidden shadow-2xl" role="dialog" aria-modal="true" aria-label="Search">
          <div class="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
            <AppIcon name="search" class="size-5 text-slate-400" />
            <input
              ref="input"
              v-model="query"
              type="text"
              placeholder="Search apps, tech or pages…"
              class="h-14 flex-1 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
              @keydown="onKey"
            />
            <kbd class="rounded border border-slate-300 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 dark:border-slate-700">ESC</kbd>
          </div>
          <ul class="max-h-[60vh] overflow-y-auto p-2">
            <li v-for="(r, i) in results" :key="r.id">
              <button
                :id="`palette-item-${i}`"
                class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left"
                :class="i === active ? 'bg-brand-50 dark:bg-brand-500/10' : ''"
                @mouseenter="active = i"
                @click="go(r)"
              >
                <img v-if="r.icon" :src="r.icon" alt="" class="size-8 rounded-lg" />
                <span v-else class="grid size-8 place-items-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800">
                  <AppIcon name="arrow" class="size-4" />
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block truncate font-medium text-slate-900 dark:text-white">{{ r.label }}</span>
                  <span class="block text-xs text-slate-500">{{ r.hint }}</span>
                </span>
                <StatusBadge v-if="r.status" :status="r.status" />
              </button>
            </li>
            <li v-if="!results.length" class="px-3 py-8 text-center text-sm text-slate-500">No results for “{{ query }}”</li>
          </ul>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
