<script setup>
import SkillBadge from './SkillBadge.vue'

defineProps({ item: { type: Object, required: true } })
</script>

<template>
  <li class="relative pb-10 pl-8 last:pb-0">
    <span class="absolute top-1.5 left-0 size-3 rounded-full bg-brand-500 ring-4 ring-brand-100 dark:ring-brand-500/20" />
    <span class="absolute top-5 bottom-0 left-[5px] w-px bg-slate-200 dark:bg-slate-800" />
    <p class="font-mono text-xs text-slate-500">{{ item.period }}</p>
    <h3 class="mt-1 text-lg font-semibold">{{ item.role }}</h3>
    <p class="text-sm font-medium text-brand-600 dark:text-brand-400">{{ item.company }}</p>
    <p class="mt-2 text-slate-600 dark:text-slate-400">{{ item.description }}</p>
    <div v-if="item.tags?.length" class="mt-3 flex flex-wrap gap-1.5">
      <SkillBadge v-for="t in item.tags" :key="t" :label="t" />
    </div>
  </li>
</template>
