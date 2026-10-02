<script setup>
import { profile, socials } from '../data/portfolio'
import AppIcon from './AppIcon.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-slate-200 py-8 dark:border-slate-800">
    <div class="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
      <p class="text-sm text-slate-500">© {{ year }} {{ profile.name }}. Built with Vue &amp; Tailwind.</p>
      <div class="flex gap-2">
        <a
          v-for="s in socials"
          :key="s.name"
          :href="s.url"
          target="_blank"
          rel="noopener"
          :aria-label="s.name"
          class="grid size-9 place-items-center rounded-md text-slate-500 transition hover:text-brand-600 dark:hover:text-brand-400"
        >
          <AppIcon :name="s.icon" class="size-5" />
        </a>
      </div>
    </div>
  </footer>
</template>
