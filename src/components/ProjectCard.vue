<script setup>
import SkillBadge from './SkillBadge.vue'
import AppIcon from './AppIcon.vue'

defineProps({ project: { type: Object, required: true } })
</script>

<template>
  <RouterLink
    :to="`/projects/${project.slug}`"
    class="card group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:border-brand-400 hover:shadow-lg hover:shadow-brand-500/10"
  >
    <div class="aspect-[16/9] overflow-hidden bg-gradient-to-br from-brand-500 to-violet-600">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="project.title"
        loading="lazy"
        class="size-full object-cover transition duration-300 group-hover:scale-105"
      />
      <div v-else class="grid size-full place-items-center font-mono text-2xl font-semibold text-white/90">
        {{ project.title }}
      </div>
    </div>
    <div class="flex flex-1 flex-col p-5">
      <div class="mb-2 flex items-center justify-between text-xs text-slate-500">
        <span>{{ project.category }}</span>
        <span>{{ project.year }}</span>
      </div>
      <h3 class="text-lg font-semibold">{{ project.title }}</h3>
      <p class="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">{{ project.summary }}</p>
      <div class="mt-4 flex flex-wrap gap-1.5">
        <SkillBadge v-for="t in project.tags" :key="t" :label="t" />
      </div>
      <span class="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
        View project <AppIcon name="arrow" class="size-4 transition group-hover:translate-x-1" />
      </span>
    </div>
  </RouterLink>
</template>
