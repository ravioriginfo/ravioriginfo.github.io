<script setup>
import { computed } from 'vue'
import { profile, projects, skills, socials, stats } from '../data/portfolio'
import AppIcon from '../components/AppIcon.vue'
import ProjectCard from '../components/ProjectCard.vue'
import SectionHeading from '../components/SectionHeading.vue'
import SkillBadge from '../components/SkillBadge.vue'

const featured = computed(() => projects.filter((p) => p.featured).slice(0, 3))
const topSkills = computed(() => skills.flatMap((g) => g.items).slice(0, 12))
const initials = profile.name.split(' ').map((w) => w[0]).join('')
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div
        class="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[28rem] max-w-3xl rounded-full bg-brand-500/20 blur-3xl dark:bg-brand-500/10"
      />
      <div class="container-page grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p
            v-if="profile.availableForWork"
            class="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400"
          >
            <span class="size-2 animate-pulse rounded-full bg-emerald-500" /> Available for work
          </p>
          <h1 class="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Hi, I'm <span class="text-brand-600 dark:text-brand-400">{{ profile.name }}</span>
          </h1>
          <p class="mt-3 font-mono text-lg text-slate-500">{{ profile.role }}</p>
          <p class="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">{{ profile.tagline }}</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <RouterLink to="/projects" class="btn-primary">
              View my work <AppIcon name="arrow" class="size-4" />
            </RouterLink>
            <RouterLink to="/contact" class="btn-ghost">Get in touch</RouterLink>
          </div>
          <div class="mt-8 flex gap-2">
            <a
              v-for="s in socials"
              :key="s.name"
              :href="s.url"
              target="_blank"
              rel="noopener"
              :aria-label="s.name"
              class="grid size-10 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-800 dark:text-slate-400 dark:hover:text-brand-400"
            >
              <AppIcon :name="s.icon" class="size-5" />
            </a>
          </div>
        </div>

        <div class="mx-auto w-full max-w-xs">
          <div class="relative aspect-square">
            <div class="absolute inset-0 rotate-6 rounded-3xl bg-gradient-to-br from-brand-500 to-violet-600" />
            <div class="card absolute inset-0 grid place-items-center overflow-hidden">
              <img v-if="profile.avatar" :src="profile.avatar" :alt="profile.name" class="size-full object-cover" />
              <span v-else class="text-7xl font-extrabold text-brand-600 dark:text-brand-400">{{ initials }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="container-page pb-16">
        <dl class="grid grid-cols-3 gap-4">
          <div v-for="s in stats" :key="s.label" class="card p-5 text-center">
            <dt class="text-xs text-slate-500 sm:text-sm">{{ s.label }}</dt>
            <dd class="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">{{ s.value }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- About teaser -->
    <section class="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/40">
      <div class="container-page grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="// about" title="A little about me" />
          <p class="text-lg leading-relaxed text-slate-600 dark:text-slate-400">{{ profile.shortBio }}</p>
          <RouterLink
            to="/about"
            class="mt-6 inline-flex items-center gap-1 font-semibold text-brand-600 hover:underline dark:text-brand-400"
          >
            More about me <AppIcon name="arrow" class="size-4" />
          </RouterLink>
        </div>
        <div>
          <p class="mb-4 font-mono text-sm text-slate-500">Technologies I work with</p>
          <div class="flex flex-wrap gap-2">
            <SkillBadge v-for="s in topSkills" :key="s" :label="s" />
          </div>
        </div>
      </div>
    </section>

    <!-- Featured projects -->
    <section class="py-20">
      <div class="container-page">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="// projects" title="Featured work" subtitle="A few things I've built recently." />
          <RouterLink to="/projects" class="btn-ghost mb-10">All projects</RouterLink>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard v-for="p in featured" :key="p.slug" :project="p" />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="pb-20">
      <div class="container-page">
        <div class="rounded-3xl bg-gradient-to-br from-brand-600 to-violet-700 px-6 py-14 text-center text-white sm:px-12">
          <h2 class="text-3xl font-bold !text-white sm:text-4xl">Let's build something together</h2>
          <p class="mx-auto mt-4 max-w-xl text-brand-100">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
          <RouterLink
            to="/contact"
            class="btn mt-8 bg-white text-brand-700 hover:bg-brand-50"
          >
            Contact me <AppIcon name="arrow" class="size-4" />
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
