<script setup>
import { computed, watchEffect } from 'vue'
import { projects, profile } from '../data/portfolio'
import AppIcon from '../components/AppIcon.vue'
import SkillBadge from '../components/SkillBadge.vue'
import NotFoundView from './NotFoundView.vue'

const props = defineProps({ slug: { type: String, required: true } })

const index = computed(() => projects.findIndex((p) => p.slug === props.slug))
const project = computed(() => projects[index.value])
const next = computed(() => projects[(index.value + 1) % projects.length])

watchEffect(() => {
  if (project.value) document.title = `${project.value.title} — ${profile.name}`
})
</script>

<template>
  <NotFoundView v-if="!project" />
  <article v-else class="container-page max-w-4xl py-12 sm:py-16">
    <RouterLink
      to="/projects"
      class="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-600 dark:hover:text-brand-400"
    >
      <AppIcon name="back" class="size-4" /> All projects
    </RouterLink>

    <header class="mt-6">
      <p class="font-mono text-sm text-brand-600 dark:text-brand-400">{{ project.category }} · {{ project.year }}</p>
      <h1 class="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{{ project.title }}</h1>
      <p class="mt-4 text-xl text-slate-600 dark:text-slate-400">{{ project.summary }}</p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a v-if="project.links.live" :href="project.links.live" target="_blank" rel="noopener" class="btn-primary">
          <AppIcon name="external" class="size-4" /> Live demo
        </a>
        <a v-if="project.links.source" :href="project.links.source" target="_blank" rel="noopener" class="btn-ghost">
          <AppIcon name="code" class="size-4" /> Source code
        </a>
      </div>
    </header>

    <div class="mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600">
      <img v-if="project.image" :src="project.image" :alt="project.title" class="size-full object-cover" />
      <div v-else class="grid size-full place-items-center font-mono text-3xl font-semibold text-white/90">
        {{ project.title }}
      </div>
    </div>

    <div class="mt-12 grid gap-10 md:grid-cols-[1fr_14rem]">
      <div class="space-y-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
        <p v-for="(para, i) in project.description" :key="i">{{ para }}</p>
      </div>
      <aside>
        <h2 class="mb-3 text-sm font-semibold uppercase tracking-wide !text-slate-500">Tech stack</h2>
        <div class="flex flex-wrap gap-2">
          <SkillBadge v-for="t in project.tags" :key="t" :label="t" />
        </div>
      </aside>
    </div>

    <div v-if="project.gallery.length" class="mt-12 grid gap-4 sm:grid-cols-2">
      <img
        v-for="(src, i) in project.gallery"
        :key="i"
        :src="src"
        :alt="`${project.title} screenshot ${i + 1}`"
        loading="lazy"
        class="card w-full"
      />
    </div>

    <RouterLink
      v-if="next && next.slug !== project.slug"
      :to="`/projects/${next.slug}`"
      class="card group mt-16 flex items-center justify-between p-6 transition hover:border-brand-400"
    >
      <div>
        <p class="text-sm text-slate-500">Next project</p>
        <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ next.title }}</p>
      </div>
      <AppIcon name="arrow" class="size-5 text-brand-600 transition group-hover:translate-x-1 dark:text-brand-400" />
    </RouterLink>
  </article>
</template>
