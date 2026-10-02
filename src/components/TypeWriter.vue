<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'

const props = defineProps({
  words: { type: Array, required: true },
  typeSpeed: { type: Number, default: 70 },
  deleteSpeed: { type: Number, default: 35 },
  hold: { type: Number, default: 1600 },
})

const text = ref(props.words[0] ?? '')
const reduced = usePreferredReducedMotion()
let timer
let index = 0
let deleting = true

function tick() {
  const word = props.words[index]
  if (deleting) {
    text.value = word.slice(0, text.value.length - 1)
    if (!text.value) {
      deleting = false
      index = (index + 1) % props.words.length
    }
    timer = setTimeout(tick, props.deleteSpeed)
  } else {
    const next = props.words[index]
    text.value = next.slice(0, text.value.length + 1)
    if (text.value === next) {
      deleting = true
      timer = setTimeout(tick, props.hold)
    } else {
      timer = setTimeout(tick, props.typeSpeed)
    }
  }
}

onMounted(() => {
  if (reduced.value !== 'reduce' && props.words.length > 1) timer = setTimeout(tick, props.hold)
})
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <span>
    <span>{{ text }}</span><span class="caret ml-0.5 inline-block w-[2px] bg-current align-middle" style="height: 1em" aria-hidden="true" />
  </span>
</template>
