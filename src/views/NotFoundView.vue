<script setup>
import AppIcon from '../components/AppIcon.vue'
</script>

<template>
  <div class="container-page grid place-items-center py-32 text-center">
    <div>
      <p class="font-mono text-7xl font-extrabold text-brand-600 dark:text-brand-400">404</p>
      <h1 class="mt-4 text-2xl font-bold">Page not found</h1>
      <p class="mt-2 text-slate-600 dark:text-slate-400">The page you're looking for doesn't exist or has moved.</p>
      <RouterLink to="/" class="btn-primary mt-8"><AppIcon name="back" class="size-4" /> Back home</RouterLink>
    </div>
  </div>
</template>
