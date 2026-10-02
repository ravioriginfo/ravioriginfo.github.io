<script setup>
import { projects } from '../data/portfolio'

const items = projects.filter((p) => p.icon)
</script>

<template>
  <div
    class="relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
  >
    <div class="animate-marquee flex w-max gap-5">
      <RouterLink
        v-for="(p, i) in [...items, ...items]"
        :key="`${p.slug}-${i}`"
        :to="`/projects/${p.slug}`"
        :title="p.title"
        :tabindex="i >= items.length ? -1 : 0"
        :aria-hidden="i >= items.length"
        class="group flex shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white py-2 pr-4 pl-2 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-400 dark:border-slate-800 dark:bg-slate-900"
      >
        <img :src="p.icon" :alt="''" class="size-10 rounded-xl" loading="lazy" />
        <span class="text-sm font-medium whitespace-nowrap text-slate-700 group-hover:text-brand-600 dark:text-slate-300 dark:group-hover:text-brand-400">
          {{ p.title }}
        </span>
      </RouterLink>
    </div>
  </div>
</template>
