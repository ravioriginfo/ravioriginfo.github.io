<script setup>
import { computed, ref, useTemplateRef } from 'vue'
import { useIntersectionObserver, useTransition } from '@vueuse/core'

const props = defineProps({
  value: { type: Number, required: true },
  suffix: { type: String, default: '' },
})

const el = useTemplateRef('el')
const target = ref(0)
const animated = useTransition(target, { duration: 1400, transition: [0.22, 1, 0.36, 1] })
const display = computed(() => Math.round(animated.value))

const { stop } = useIntersectionObserver(el, ([entry]) => {
  if (entry?.isIntersecting) {
    target.value = props.value
    stop()
  }
})
</script>

<template>
  <span ref="el">{{ display }}{{ suffix }}</span>
</template>
