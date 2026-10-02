<script setup>
import { statuses } from '../data/portfolio'

defineProps({ status: { type: String, required: true } })

const styles = {
  live: 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/30 dark:text-emerald-400',
  completed: 'bg-sky-500/10 text-sky-700 ring-sky-500/30 dark:text-sky-400',
  'in-progress': 'bg-amber-500/10 text-amber-700 ring-amber-500/30 dark:text-amber-400',
}
const dots = { live: 'bg-emerald-500 animate-pulse', completed: 'bg-sky-500', 'in-progress': 'bg-amber-500 animate-pulse' }
</script>

<template>
  <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset" :class="styles[status]">
    <span class="size-1.5 rounded-full" :class="dots[status]" />
    {{ statuses[status]?.short ?? status }}
  </span>
</template>
