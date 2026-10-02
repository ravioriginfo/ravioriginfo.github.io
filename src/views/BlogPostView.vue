<script setup>
import { computed, useTemplateRef } from 'vue'
import { getPost, posts, profile, projects, SITE_URL } from '../data/portfolio'
import AppIcon from '../components/AppIcon.vue'
import StatusBadge from '../components/StatusBadge.vue'
import TableOfContents from '../components/TableOfContents.vue'
import NotFoundView from './NotFoundView.vue'
import { personSchema, useSeo } from '../composables/seo'
import { useInternalLinks } from '../composables/internalLinks'

const props = defineProps({ slug: { type: String, required: true } })

// Each post is remounted per slug (App.vue keys RouterView by path).
const post = getPost(props.slug)
const index = posts.findIndex((p) => p.slug === props.slug)
const newer = index > 0 ? posts[index - 1] : null
const older = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null
const related = computed(() => (post?.relatedProjects ?? []).map((s) => projects.find((p) => p.slug === s)).filter(Boolean))

const article = useTemplateRef('article')
useInternalLinks(article)

const formatDate = (d) => new Date(d).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })

if (post) {
  const url = `${SITE_URL}/blog/${post.slug}`
  useSeo({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: `/og/blog/${post.slug}.png`,
    type: 'article',
    publishedTime: post.date,
    noindex: post.draft,
    jsonLd: [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        url,
        mainEntityOfPage: url,
        image: `${SITE_URL}/og/blog/${post.slug}.png`,
        keywords: post.tags.join(', '),
        author: { '@type': 'Person', '@id': personSchema['@id'], name: profile.name, url: `${SITE_URL}/` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Dev Notes', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  })
}
</script>

<template>
  <NotFoundView v-if="!post" />
  <article v-else>
    <header class="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
      <div class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950/30 dark:via-slate-950 dark:to-teal-950/30" />
      <div class="container-page max-w-6xl py-12 sm:py-16">
        <div class="max-w-3xl">
        <RouterLink to="/blog" class="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-600 dark:hover:text-brand-400">
          <AppIcon name="back" class="size-4" /> All notes
        </RouterLink>
        <p
          v-if="post.draft"
          class="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-800 dark:text-amber-300"
        >
          Draft: only visible in local preview. Set <code>draft: false</code> in the Markdown file to publish.
        </p>
        <h1 class="mt-6 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">{{ post.title }}</h1>
        <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">{{ post.description }}</p>
        <div class="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-500">
          <span class="font-medium text-slate-900 dark:text-white">{{ profile.name }}</span>
          <span aria-hidden="true">·</span>
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          <span aria-hidden="true">·</span>
          <span>{{ post.readingTime }} min read</span>
        </div>
        <div class="mt-4 flex flex-wrap gap-1.5">
          <RouterLink
            v-for="t in post.tags"
            :key="t"
            :to="{ path: '/blog', query: { tag: t } }"
            class="rounded-full bg-white px-2.5 py-0.5 text-xs text-slate-600 ring-1 ring-slate-200 hover:text-brand-600 hover:ring-brand-400 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-800"
          >
            #{{ t }}
          </RouterLink>
        </div>
        </div>
      </div>
    </header>

    <div class="container-page max-w-6xl py-12">
      <div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div ref="article" class="min-w-0">
          <component :is="post.Body" class="prose-site lg:prose-lg" />
        </div>
        <aside class="hidden lg:block">
          <div class="sticky top-24 space-y-8">
            <TableOfContents :container="article" />
            <div v-if="related.length">
              <p class="mb-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">Apps in this article</p>
              <ul class="space-y-2">
                <li v-for="p in related" :key="p.slug">
                  <RouterLink :to="`/projects/${p.slug}`" class="flex items-center gap-2.5 rounded-lg p-1.5 transition hover:bg-slate-50 dark:hover:bg-slate-800/60">
                    <img v-if="p.icon" :src="p.icon" alt="" class="size-8 rounded-lg" />
                    <span class="min-w-0 flex-1 truncate text-sm font-medium text-slate-900 dark:text-white">{{ p.title }}</span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <!-- Related apps (mobile + end of article) -->
      <section v-if="related.length" class="mt-16 lg:hidden">
        <h2 class="mb-4 text-lg font-bold">Apps in this article</h2>
        <div class="grid gap-3 sm:grid-cols-2">
          <RouterLink v-for="p in related" :key="p.slug" :to="`/projects/${p.slug}`" class="card flex items-center gap-3 p-4">
            <img v-if="p.icon" :src="p.icon" alt="" class="size-10 rounded-xl" />
            <span class="min-w-0 flex-1 truncate font-semibold text-slate-900 dark:text-white">{{ p.title }}</span>
            <StatusBadge :status="p.status" />
          </RouterLink>
        </div>
      </section>

      <nav v-if="newer || older" class="mt-16 grid gap-4 sm:grid-cols-2">
        <RouterLink v-if="older" :to="`/blog/${older.slug}`" class="card group p-5 transition hover:border-brand-400">
          <p class="text-xs text-slate-500">← Older</p>
          <p class="mt-1 font-semibold text-slate-900 dark:text-white">{{ older.title }}</p>
        </RouterLink>
        <span v-else />
        <RouterLink v-if="newer" :to="`/blog/${newer.slug}`" class="card group p-5 text-right transition hover:border-brand-400">
          <p class="text-xs text-slate-500">Newer →</p>
          <p class="mt-1 font-semibold text-slate-900 dark:text-white">{{ newer.title }}</p>
        </RouterLink>
      </nav>
    </div>
  </article>
</template>
