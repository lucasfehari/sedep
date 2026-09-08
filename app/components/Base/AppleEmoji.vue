<template>
  <span class="apple-emoji-wrapper" :style="wrapperStyle">
    <img
      :src="emojiUrl"
      :alt="alt || emoji"
      class="apple-emoji-img"
      :style="imgStyle"
      loading="lazy"
      decoding="async"
      @error="onError"
      v-if="!hasError"
    />
    <span v-else class="apple-emoji-fallback">{{ emoji }}</span>
  </span>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    emoji: string
    size?: number | string
    alt?: string
    valign?: string
  }>(),
  {
    size: '1em',
    alt: '',
    valign: '-0.15em',
  }
)

const hasError = ref(false)

function onError() {
  hasError.value = true
}

// Codifica o emoji para a URL do CDN Apple Emoji
const emojiUrl = computed(() => {
  const cleanEmoji = props.emoji.trim()
  return `https://emojicdn.elk.sh/${encodeURIComponent(cleanEmoji)}?style=apple`
})

const sizeValue = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`
  }
  return props.size
})

const wrapperStyle = computed(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: props.valign,
  width: sizeValue.value,
  height: sizeValue.value,
  lineHeight: '1',
}))

const imgStyle = computed(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain' as const,
  display: 'inline-block',
  pointerEvents: 'none' as const,
  userSelect: 'none' as const,
}))
</script>

<style scoped>
.apple-emoji-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.apple-emoji-img {
  display: inline-block;
  vertical-align: middle;
}

.apple-emoji-fallback {
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
  font-size: inherit;
  line-height: 1;
}
</style>
