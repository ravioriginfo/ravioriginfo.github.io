<script setup>
import { computed, ref } from 'vue'
import { projects } from '../data/portfolio'
import ProjectCard from '../components/ProjectCard.vue'
import SectionHeading from '../components/SectionHeading.vue'

const categories = ['All', ...new Set(projects.map((p) => p.category))]
const active = ref('All')
const filtered = computed(() =>
  active.value === 'All' ? projects : projects.filter((p) => p.category === active.value),
)
</script>

<template>
  <div class="container-page py-16 sm:py-20">
    <SectionHeading
      eyebrow="// projects"
      title="Things I've built"
      subtitle="A selection of personal and professional projects."
    />

    <div class="mb-8 flex flex-wrap gap-2" role="tablist">
      <button
        v-for="c in categories"
        :key="c"
        role="tab"
        :aria-selected="active === c"
        class="rounded-full px-4 py-1.5 text-sm font-medium transition"
        :class="active === c
          ? 'bg-brand-600 text-white'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'"
        @click="active = c"
      >
        {{ c }}
      </button>
    </div>

    <TransitionGroup tag="div" name="page" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard v-for="p in filtered" :key="p.slug" :project="p" />
    </TransitionGroup>
  </div>
</template>
