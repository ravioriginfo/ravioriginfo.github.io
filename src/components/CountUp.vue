<script setup>
import { computed, ref, useTemplateRef } from 'vue'
import { useIntersectionObserver, useTransition } from '@vueuse/core'

const props = defineProps({
  value: { type: Number, required: true },
  suffix: { type: String, default: '' },
})

// Pre-rendered HTML shows the real number (good for SEO / no-JS); in the
// browser it counts up from 0 the first time it scrolls into view.
const el = useTemplateRef('el')
const started = ref(false)
const target = ref(0)
const animated = useTransition(target, { duration: 1400, transition: [0.22, 1, 0.36, 1] })
const display = computed(() => (started.value ? Math.round(animated.value) : props.value))

const { stop } = useIntersectionObserver(el, ([entry]) => {
  if (entry?.isIntersecting) {
    started.value = true
    target.value = props.value
    stop()
  }
})
</script>

<template>
  <span ref="el">{{ display }}{{ suffix }}</span>
</template>
