<script setup>
defineProps({
  eyebrow: String,
  title: { type: String, required: true },
  subtitle: String,
})
</script>

<template>
  <div class="mb-10">
    <p v-if="eyebrow" class="mb-2 font-mono text-sm font-medium text-brand-600 dark:text-brand-400">{{ eyebrow }}</p>
    <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ title }}</h2>
    <p v-if="subtitle" class="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">{{ subtitle }}</p>
  </div>
</template>
