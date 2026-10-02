<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { postTags, posts, SITE_URL } from '../data/portfolio'
import PostCard from '../components/PostCard.vue'
import SectionHeading from '../components/SectionHeading.vue'
import { personSchema, useSeo } from '../composables/seo'

const route = useRoute()
const router = useRouter()

// Tag filter lives in the URL (?tag=Kotlin) so filtered views can be shared.
const tag = computed({
  get: () => (typeof route.query.tag === 'string' ? route.query.tag : ''),
  set: (v) => router.replace({ query: { ...route.query, tag: v || undefined } }),
})
const filtered = computed(() => (tag.value ? posts.filter((p) => p.tags.includes(tag.value)) : posts))

useSeo({
  title: 'Dev Notes — Android Development Articles',
  description: 'Articles by Ravi Sorathiya on Android development: Kotlin, Jetpack Compose, telecom APIs, PDF editing and shipping apps to Google Play.',
  path: '/blog',
  jsonLd: [
    {
      '@type': 'Blog',
      name: 'Dev Notes',
      url: `${SITE_URL}/blog`,
      author: { '@id': personSchema['@id'] },
      blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE_URL}/blog/${p.slug}`, datePublished: p.date })),
    },
  ],
})

const pill = (on) =>
  on
    ? 'bg-brand-gradient text-white shadow-md shadow-brand-500/25'
    : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-brand-400 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800'
</script>

<template>
  <div class="container-page py-16 sm:py-20">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <SectionHeading
        as="h1"
        v-reveal
        eyebrow="// dev notes"
        title="Notes from building Android apps"
        subtitle="Deep dives into the problems I solved shipping real apps: telecom APIs, PDF editing, Compose and Play Store engineering."
      />
      <a href="/blog/rss.xml" class="btn-ghost mb-10" target="_blank" rel="noopener">RSS feed</a>
    </div>

    <div v-if="postTags.length > 1" class="mb-8 flex flex-wrap gap-2">
      <button class="rounded-full px-3.5 py-1.5 text-sm font-medium transition" :class="pill(!tag)" @click="tag = ''">All</button>
      <button
        v-for="t in postTags"
        :key="t"
        class="rounded-full px-3.5 py-1.5 text-sm font-medium transition"
        :class="pill(tag === t)"
        @click="tag = tag === t ? '' : t"
      >
        #{{ t }}
      </button>
    </div>

    <TransitionGroup tag="div" name="page" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <PostCard v-for="p in filtered" :key="p.slug" :post="p" />
    </TransitionGroup>

    <p v-if="!filtered.length" class="card py-16 text-center text-slate-500">No articles yet. Check back soon.</p>
  </div>
</template>
