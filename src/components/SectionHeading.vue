<script setup>
defineProps({
  eyebrow: String,
  title: { type: String, required: true },
  subtitle: String,
  // Use "h1" for the main heading of a page (one per page, for SEO).
  as: { type: String, default: 'h2' },
})
</script>

<template>
  <div class="mb-10">
    <p v-if="eyebrow" class="mb-2 font-mono text-sm font-medium text-brand-600 dark:text-brand-400">{{ eyebrow }}</p>
    <component :is="as" class="text-3xl font-bold tracking-tight sm:text-4xl">{{ title }}</component>
    <p v-if="subtitle" class="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">{{ subtitle }}</p>
  </div>
</template>
