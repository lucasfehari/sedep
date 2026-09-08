<template>
  <component
    :is="tag"
    :href="href"
    :to="to"
    :type="!href && !to ? type : undefined"
    :class="classes"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="btn__spinner" aria-hidden="true" />
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'ghost' | 'text'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  href?: string
  to?: string
  disabled?: boolean
  loading?: boolean
  pill?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  pill: false,
})

const tag = computed(() => {
  if (props.href) return 'a'
  if (props.to) return resolveComponent('NuxtLink')
  return 'button'
})

const classes = computed(() => [
  'btn',
  `btn--${props.variant}`,
  `btn--${props.size}`,
  {
    'btn--loading': props.loading,
    'btn--disabled': props.disabled,
    'btn--pill': props.pill,
  },
])
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-weight: var(--font-weight-bold);
  font-size: var(--text-base);
  text-decoration: none;
  border: 1.5px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
  user-select: none;
  position: relative;
  line-height: 1;
}

.btn:active:not(.btn--disabled) {
  transform: scale(0.98);
}

.btn--pill {
  border-radius: var(--radius-pill);
}

/* Tamanhos */
.btn--sm {
  height: 38px;
  padding: 0 16px;
  font-size: var(--text-sm);
}

.btn--md {
  height: 46px;
  padding: 0 24px;
  font-size: var(--text-sm);
  letter-spacing: -0.01em;
}

.btn--lg {
  height: 52px;
  padding: 0 28px;
  font-size: var(--text-base);
}

/* Primary — Vibrant SaaS Blue */
.btn--primary {
  background-color: var(--color-primary);
  color: #FFFFFF;
  border-color: var(--color-primary);
  box-shadow: 0 2px 4px rgba(0, 82, 204, 0.2);
}

.btn--primary:hover:not(.btn--disabled) {
  background-color: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
  box-shadow: 0 4px 12px rgba(0, 82, 204, 0.3);
}

/* Dark — High Contrast Navy/Black (matching Aurum "Conheça nossos softwares") */
.btn--dark {
  background-color: #0F172A;
  color: #FFFFFF;
  border-color: #0F172A;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.15);
}

.btn--dark:hover:not(.btn--disabled) {
  background-color: #1E293B;
  border-color: #1E293B;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.2);
}

/* Secondary / Outline — White card with clean slate border (matching Aurum "Conheça a Aurum") */
.btn--secondary,
.btn--outline {
  background-color: #FFFFFF;
  color: var(--color-ink);
  border-color: #0F172A;
}

.btn--secondary:hover:not(.btn--disabled),
.btn--outline:hover:not(.btn--disabled) {
  background-color: #F8FAFC;
  border-color: #1E293B;
}

/* Ghost / Clean Blue Outline (matching Aurum "Fazer login no Astrea") */
.btn--ghost {
  background-color: #FFFFFF;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.btn--ghost:hover:not(.btn--disabled) {
  background-color: var(--color-primary-light);
}

/* Text */
.btn--text {
  background-color: transparent;
  color: var(--color-primary);
  border-color: transparent;
  padding: 0;
  height: auto;
}

.btn--text:hover:not(.btn--disabled) {
  color: var(--color-primary-hover);
}

.btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.btn--loading {
  cursor: wait;
  pointer-events: none;
}

.btn__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: btn-spin 0.6s linear infinite;
}

@keyframes btn-spin {
  to { transform: rotate(360deg); }
}
</style>
