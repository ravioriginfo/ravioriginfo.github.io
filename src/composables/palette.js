import { ref } from 'vue'

// Shared open state so the nav button and Ctrl/⌘+K drive the same palette.
export const paletteOpen = ref(false)
