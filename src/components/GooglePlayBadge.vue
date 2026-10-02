<script setup>
defineProps({
  href: { type: String, required: true },
  appName: { type: String, default: '' },
  size: { type: String, default: 'md' }, // sm | md | lg
})

const sizes = {
  sm: { wrap: 'h-9 gap-2 px-3 rounded-lg', icon: 'size-5', small: 'text-[8px]', big: 'text-sm' },
  md: { wrap: 'h-11 gap-2.5 px-3.5 rounded-xl', icon: 'size-6', small: 'text-[9px]', big: 'text-base' },
  lg: { wrap: 'h-14 gap-3 px-5 rounded-xl', icon: 'size-8', small: 'text-[11px]', big: 'text-xl' },
}
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener"
    :aria-label="appName ? `Get ${appName} on Google Play` : 'Get it on Google Play'"
    class="inline-flex shrink-0 items-center border border-slate-700 bg-black text-white shadow-sm transition hover:-translate-y-0.5 hover:border-slate-500 hover:shadow-lg hover:shadow-emerald-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-600"
    :class="sizes[size].wrap"
  >
    <svg viewBox="0 0 24 24" :class="sizes[size].icon" aria-hidden="true">
      <path fill="#00D7FE" d="M3.61 1.81 13.79 12 3.61 22.19A1.42 1.42 0 0 1 3 20.99V3c0-.48.23-.92.61-1.19Z" />
      <path fill="#00F076" d="M17.13 8.66 5.16 1.77a1.43 1.43 0 0 0-1.49 0l-.06.04L13.79 12l3.34-3.34Z" />
      <path fill="#FFD400" d="M21.29 11.04 17.13 8.66 13.79 12l3.34 3.34 4.16-2.38a1.1 1.1 0 0 0 0-1.92Z" />
      <path fill="#FF3A44" d="M17.13 15.34 13.79 12 3.61 22.19l.06.04c.46.27 1.03.27 1.49 0l11.97-6.89Z" />
    </svg>
    <span class="flex flex-col leading-none">
      <span class="font-medium tracking-wide uppercase opacity-80" :class="sizes[size].small">Get it on</span>
      <span class="mt-0.5 font-semibold tracking-tight" :class="sizes[size].big">Google Play</span>
    </span>
  </a>
</template>
