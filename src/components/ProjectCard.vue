<script setup>
import { computed, useTemplateRef } from 'vue'
import { useMouseInElement } from '@vueuse/core'
import SkillBadge from './SkillBadge.vue'
import StatusBadge from './StatusBadge.vue'
import AppIcon from './AppIcon.vue'
import GooglePlayBadge from './GooglePlayBadge.vue'

const props = defineProps({ project: { type: Object, required: true } })

// Spotlight that follows the cursor across the card.
const card = useTemplateRef('card')
const { elementX, elementY, isOutside } = useMouseInElement(card)
const spotlight = computed(() =>
  isOutside.value
    ? {}
    : { background: `radial-gradient(320px circle at ${elementX.value}px ${elementY.value}px, rgb(16 185 129 / 0.12), transparent 70%)` },
)
const visibleTags = computed(() => props.project.tags.slice(0, 4))
</script>

<template>
  <div ref="card" class="card group relative flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-brand-400 hover:shadow-xl hover:shadow-brand-500/10">
    <div class="pointer-events-none absolute inset-0 transition-opacity" :style="spotlight" aria-hidden="true" />

    <RouterLink :to="`/projects/${project.slug}`" class="relative flex flex-1 flex-col p-6 focus:outline-none">
      <span class="absolute inset-0" aria-hidden="true" />
      <div class="flex items-start justify-between gap-3">
        <img
          v-if="project.icon"
          :src="project.icon"
          :alt="`${project.title} icon`"
          loading="lazy"
          class="size-16 rounded-2xl shadow-md ring-1 ring-black/5 transition duration-300 group-hover:scale-105 group-hover:-rotate-3"
        />
        <div v-else class="bg-brand-gradient grid size-16 place-items-center rounded-2xl text-2xl font-bold text-white">
          {{ project.title[0] }}
        </div>
        <StatusBadge :status="project.status" />
      </div>

      <p class="mt-5 text-xs font-medium tracking-wide text-brand-600 uppercase dark:text-brand-400">{{ project.type }}</p>
      <h3 class="mt-1 text-lg font-semibold">{{ project.title }}</h3>
      <!-- Plain text here: the whole card is already a link (no nested anchors). -->
      <p v-if="project.developer" class="mt-0.5 truncate text-xs text-slate-500">by {{ project.developer }}</p>
      <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{{ project.summary }}</p>

      <div class="mt-4 flex flex-wrap gap-1.5">
        <SkillBadge v-for="t in visibleTags" :key="t" :label="t" />
        <span v-if="project.tags.length > 4" class="px-1 py-1 text-xs text-slate-500">+{{ project.tags.length - 4 }}</span>
      </div>
    </RouterLink>

    <div class="relative flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-6 py-3 text-sm dark:border-slate-800">
      <RouterLink :to="`/projects/${project.slug}`" class="inline-flex items-center gap-1 font-semibold text-brand-600 dark:text-brand-400">
        Details <AppIcon name="arrow" class="size-4 transition group-hover:translate-x-1" />
      </RouterLink>
      <GooglePlayBadge v-if="project.playUrl" :href="project.playUrl" :app-name="project.title" size="sm" class="relative z-10" />
      <span v-else class="text-xs text-slate-500">{{ project.status === 'in-progress' ? 'Coming soon' : 'Not on Play' }}</span>
    </div>
  </div>
</template>
