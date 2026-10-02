<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useClipboard } from '@vueuse/core'
import { projects, profile, statuses } from '../data/portfolio'
import AppIcon from '../components/AppIcon.vue'
import SkillBadge from '../components/SkillBadge.vue'
import StatusBadge from '../components/StatusBadge.vue'
import NotFoundView from './NotFoundView.vue'

const props = defineProps({ slug: { type: String, required: true } })

const index = computed(() => projects.findIndex((p) => p.slug === props.slug))
const project = computed(() => projects[index.value])
const prev = computed(() => projects[(index.value - 1 + projects.length) % projects.length])
const next = computed(() => projects[(index.value + 1) % projects.length])
const related = computed(() =>
  projects.filter((p) => p.slug !== props.slug && p.type === project.value?.type).slice(0, 3),
)

const tab = ref('features')
const { copy, copied } = useClipboard({ copiedDuring: 1600 })
const copyLink = () => copy(window.location.href)

watchEffect(() => {
  if (project.value) document.title = `${project.value.title} — ${profile.name}`
})
</script>

<template>
  <NotFoundView v-if="!project" />
  <article v-else>
    <!-- Header -->
    <header class="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
      <div class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950/30 dark:via-slate-950 dark:to-teal-950/30" />
      <div class="container-page max-w-5xl py-12 sm:py-16">
        <RouterLink to="/projects" class="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-600 dark:hover:text-brand-400">
          <AppIcon name="back" class="size-4" /> All projects
        </RouterLink>

        <div class="mt-8 flex flex-col gap-8 sm:flex-row sm:items-center">
          <img
            v-if="project.icon"
            :src="project.icon"
            :alt="`${project.title} icon`"
            class="size-28 shrink-0 rounded-[1.75rem] shadow-xl ring-1 ring-black/5 sm:size-32"
          />
          <div v-else class="bg-brand-gradient grid size-28 shrink-0 place-items-center rounded-[1.75rem] text-4xl font-bold text-white">
            {{ project.title[0] }}
          </div>
          <div>
            <div class="flex flex-wrap items-center gap-3">
              <StatusBadge :status="project.status" />
              <span class="font-mono text-sm text-brand-600 dark:text-brand-400">{{ project.type }}</span>
            </div>
            <h1 class="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">{{ project.title }}</h1>
            <p class="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">{{ project.summary }}</p>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap gap-3">
          <a v-if="project.playUrl" :href="project.playUrl" target="_blank" rel="noopener" class="btn-primary">
            <AppIcon name="play" class="size-4" /> Get it on Google Play
          </a>
          <span v-else class="btn cursor-default bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {{ statuses[project.status].label }} — not published yet
          </span>
          <button class="btn-ghost" @click="copyLink">
            <AppIcon :name="copied ? 'check' : 'external'" class="size-4" /> {{ copied ? 'Link copied' : 'Copy link' }}
          </button>
        </div>
      </div>
    </header>

    <div class="container-page max-w-5xl py-12">
      <div class="grid gap-10 lg:grid-cols-[1fr_17rem]">
        <!-- Tabs -->
        <section>
          <div class="mb-6 inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-900" role="tablist">
            <button
              v-for="t in [{ id: 'features', label: 'Features', icon: 'sparkle' }, { id: 'tech', label: 'Under the hood', icon: 'layers' }]"
              :key="t.id"
              role="tab"
              :aria-selected="tab === t.id"
              class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition"
              :class="tab === t.id ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-800 dark:text-brand-400' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'"
              @click="tab = t.id"
            >
              <AppIcon :name="t.icon" class="size-4" /> {{ t.label }}
            </button>
          </div>

          <Transition name="page" mode="out-in">
            <ul v-if="tab === 'features'" key="features" class="space-y-3">
              <li v-for="(f, i) in project.features" :key="f" v-reveal="i * 60" class="card flex gap-3 p-4">
                <span class="bg-brand-gradient grid size-6 shrink-0 place-items-center rounded-full text-white">
                  <AppIcon name="check" class="size-3.5" />
                </span>
                <span class="text-slate-700 dark:text-slate-300">{{ f }}</span>
              </li>
            </ul>
            <ul v-else key="tech" class="space-y-3">
              <li v-for="h in project.highlights" :key="h" class="card flex gap-3 p-4">
                <AppIcon name="code" class="mt-0.5 size-5 shrink-0 text-brand-500" />
                <span class="text-slate-700 dark:text-slate-300">{{ h }}</span>
              </li>
            </ul>
          </Transition>

          <p v-if="project.variants" class="mt-6 rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
            <strong class="text-slate-900 dark:text-white">Variants:</strong> {{ project.variants }}
          </p>
        </section>

        <!-- Sidebar -->
        <aside class="space-y-6">
          <div class="card p-5">
            <h2 class="mb-3 text-xs font-semibold tracking-wide !text-slate-500 uppercase">Tech stack</h2>
            <div class="flex flex-wrap gap-2">
              <RouterLink v-for="t in project.tags" :key="t" :to="{ path: '/projects', query: { q: t } }" :title="`Other projects using ${t}`">
                <SkillBadge :label="t" class="transition hover:bg-brand-100 dark:hover:bg-brand-500/20" />
              </RouterLink>
            </div>
          </div>
          <div v-if="project.basedOn" class="card p-5 text-sm text-slate-600 dark:text-slate-400">
            <h2 class="mb-2 text-xs font-semibold tracking-wide !text-slate-500 uppercase">Open-source base</h2>
            Built on top of the open-source <strong class="text-slate-900 dark:text-white">{{ project.basedOn }}</strong> project, extended and rebranded.
          </div>
        </aside>
      </div>

      <!-- Related -->
      <section v-if="related.length" class="mt-16">
        <h2 class="mb-5 text-xl font-bold">More {{ project.type.toLowerCase() }} apps</h2>
        <div class="grid gap-4 sm:grid-cols-3">
          <RouterLink
            v-for="r in related"
            :key="r.slug"
            :to="`/projects/${r.slug}`"
            class="card flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:border-brand-400"
          >
            <img v-if="r.icon" :src="r.icon" alt="" class="size-12 rounded-xl" />
            <div class="min-w-0">
              <p class="truncate font-semibold text-slate-900 dark:text-white">{{ r.title }}</p>
              <StatusBadge :status="r.status" class="mt-1" />
            </div>
          </RouterLink>
        </div>
      </section>

      <!-- Prev / next -->
      <nav class="mt-16 grid gap-4 sm:grid-cols-2">
        <RouterLink :to="`/projects/${prev.slug}`" class="card group flex items-center gap-4 p-5 transition hover:border-brand-400">
          <AppIcon name="back" class="size-5 text-brand-600 transition group-hover:-translate-x-1 dark:text-brand-400" />
          <div>
            <p class="text-xs text-slate-500">Previous</p>
            <p class="font-semibold text-slate-900 dark:text-white">{{ prev.title }}</p>
          </div>
        </RouterLink>
        <RouterLink :to="`/projects/${next.slug}`" class="card group flex items-center justify-end gap-4 p-5 text-right transition hover:border-brand-400">
          <div>
            <p class="text-xs text-slate-500">Next</p>
            <p class="font-semibold text-slate-900 dark:text-white">{{ next.title }}</p>
          </div>
          <AppIcon name="arrow" class="size-5 text-brand-600 transition group-hover:translate-x-1 dark:text-brand-400" />
        </RouterLink>
      </nav>
    </div>
  </article>
</template>
