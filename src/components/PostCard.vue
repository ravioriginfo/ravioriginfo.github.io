<script setup>
import AppIcon from './AppIcon.vue'

defineProps({ post: { type: Object, required: true } })

const formatDate = (d) => new Date(d).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })
</script>

<template>
  <RouterLink
    :to="`/blog/${post.slug}`"
    class="card group flex flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-400 hover:shadow-xl hover:shadow-brand-500/10"
  >
    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
      <time :datetime="post.date">{{ formatDate(post.date) }}</time>
      <span aria-hidden="true">·</span>
      <span>{{ post.readingTime }} min read</span>
      <span v-if="post.draft" class="rounded-full bg-amber-500/15 px-2 py-0.5 font-medium text-amber-700 dark:text-amber-400">Draft</span>
    </div>
    <h3 class="mt-3 text-lg leading-snug font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">{{ post.title }}</h3>
    <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{{ post.description }}</p>
    <div class="mt-4 flex flex-wrap gap-1.5">
      <span v-for="t in post.tags.slice(0, 3)" :key="t" class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">#{{ t }}</span>
    </div>
    <span class="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
      Read article <AppIcon name="arrow" class="size-4 transition group-hover:translate-x-1" />
    </span>
  </RouterLink>
</template>
