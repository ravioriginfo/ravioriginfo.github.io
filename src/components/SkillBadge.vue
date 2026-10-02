<script setup>
defineProps({ label: { type: String, required: true } })
</script>

<template>
  <span
    class="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-400"
  >
    {{ label }}
  </span>
</template>
