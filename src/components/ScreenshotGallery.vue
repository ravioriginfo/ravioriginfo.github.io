<script setup>
import { ref, useTemplateRef } from 'vue'
import { useScroll } from '@vueuse/core'
import AppIcon from './AppIcon.vue'

// Horizontal, scroll-snapping screenshot strip. Clicking a shot opens a
// PhotoSwipe lightbox (zoom, swipe, keyboard), loaded only on first use.
const props = defineProps({
  shots: { type: Array, required: true }, // [{ src, alt, width?, height? }]
  title: { type: String, default: '' },
})

const strip = useTemplateRef('strip')
const { x, arrivedState } = useScroll(strip, { behavior: 'smooth' })
const opening = ref(false)

function scrollBy(dir) {
  if (strip.value) x.value = strip.value.scrollLeft + dir * strip.value.clientWidth * 0.8
}

async function open(index) {
  if (opening.value) return
  opening.value = true
  try {
    const [{ default: PhotoSwipe }] = await Promise.all([import('photoswipe'), import('photoswipe/style.css')])
    const pswp = new PhotoSwipe({
      dataSource: props.shots.map((s) => ({ src: s.src, width: s.width ?? 720, height: s.height ?? 1280, alt: s.alt })),
      index,
      bgOpacity: 0.92,
      showHideAnimationType: 'fade',
      paddingFn: () => ({ top: 30, bottom: 30, left: 16, right: 16 }),
    })
    pswp.init()
  } finally {
    opening.value = false
  }
}
</script>

<template>
  <section v-if="shots.length" aria-label="Screenshots" class="relative">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-xl font-bold">Screenshots</h2>
      <div class="hidden gap-2 sm:flex">
        <button
          class="grid size-9 place-items-center rounded-full border border-slate-200 transition hover:border-brand-400 disabled:opacity-30 dark:border-slate-700"
          :disabled="arrivedState.left"
          aria-label="Previous screenshots"
          @click="scrollBy(-1)"
        >
          <AppIcon name="back" class="size-4" />
        </button>
        <button
          class="grid size-9 place-items-center rounded-full border border-slate-200 transition hover:border-brand-400 disabled:opacity-30 dark:border-slate-700"
          :disabled="arrivedState.right"
          aria-label="Next screenshots"
          @click="scrollBy(1)"
        >
          <AppIcon name="arrow" class="size-4" />
        </button>
      </div>
    </div>

    <div
      ref="strip"
      class="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:thin] sm:mx-0 sm:px-0"
    >
      <button
        v-for="(s, i) in shots"
        :key="s.src"
        class="group relative h-80 shrink-0 snap-start sm:h-96 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-800 dark:bg-slate-900"
        :style="{ aspectRatio: `${s.width ?? 9} / ${s.height ?? 16}` }"
        :aria-label="`Open ${s.alt}`"
        @click="open(i)"
      >
        <img
          :src="s.src"
          :alt="s.alt"
          :width="s.width"
          :height="s.height"
          loading="lazy"
          decoding="async"
          class="size-full object-cover transition duration-300 group-hover:scale-[1.02]"
        />
      </button>
    </div>
    <p class="mt-1 text-xs text-slate-500">From the {{ title }} Google Play listing · click to enlarge</p>
  </section>
</template>
