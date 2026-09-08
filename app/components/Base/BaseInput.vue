<template>
  <div class="field" :class="{ 'field--error': !!error }">
    <label v-if="label" :for="id" class="field__label">
      {{ label }}
      <span v-if="required" class="field__required" aria-label="obrigatório">*</span>
    </label>

    <div class="field__control">
      <!-- Textarea -->
      <textarea
        v-if="type === 'textarea'"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :rows="rows"
        :aria-describedby="error ? `${id}-error` : hint ? `${id}-hint` : undefined"
        :aria-invalid="!!error"
        class="field__input field__textarea"
        v-bind="$attrs"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      >{{ modelValue }}</textarea>

      <!-- Select -->
      <select
        v-else-if="type === 'select'"
        :id="id"
        :name="name"
        :disabled="disabled"
        :required="required"
        :aria-describedby="error ? `${id}-error` : hint ? `${id}-hint` : undefined"
        :aria-invalid="!!error"
        class="field__input field__select"
        v-bind="$attrs"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option v-if="placeholder" value="" disabled :selected="!modelValue">{{ placeholder }}</option>
        <slot />
      </select>

      <!-- Input padrão -->
      <input
        v-else
        :id="id"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :value="modelValue"
        :aria-describedby="error ? `${id}-error` : hint ? `${id}-hint` : undefined"
        :aria-invalid="!!error"
        class="field__input"
        v-bind="$attrs"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <p v-if="error" :id="`${id}-error`" class="field__error" role="alert">{{ error }}</p>
    <p v-else-if="hint" :id="`${id}-hint`" class="field__hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  name?: string
  type?: 'text' | 'email' | 'tel' | 'password' | 'textarea' | 'select' | 'number'
  label?: string
  placeholder?: string
  modelValue?: string
  error?: string
  hint?: string
  disabled?: boolean
  required?: boolean
  autocomplete?: string
  rows?: number
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  rows: 4,
  disabled: false,
  required: false,
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.field__label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-ink);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.field__required {
  color: var(--color-error);
  font-weight: var(--font-weight-bold);
}

.field__input {
  width: 100%;
  height: 44px;
  padding: 0 var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-ink);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
  outline: none;
  appearance: none;
  -webkit-appearance: none;
}

.field__input::placeholder {
  color: var(--color-ink-xlight);
}

.field__input:focus {
  border-color: var(--color-sedep-blue-mid);
  box-shadow: 0 0 0 3px rgba(21, 87, 168, 0.12);
}

.field__textarea {
  height: auto;
  padding: var(--space-3) var(--space-4);
  resize: vertical;
  min-height: 100px;
}

.field__select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' fill='none' viewBox='0 0 12 7'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-4) center;
  padding-right: var(--space-10);
  cursor: pointer;
}

/* Estado de erro */
.field--error .field__input {
  border-color: var(--color-error);
}

.field--error .field__input:focus {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
}

.field__error {
  font-size: var(--text-sm);
  color: var(--color-error);
  margin: 0;
  max-width: none;
}

.field__hint {
  font-size: var(--text-sm);
  color: var(--color-ink-light);
  margin: 0;
  max-width: none;
}

/* Disabled */
.field__input:disabled {
  background-color: var(--color-surface-alt);
  color: var(--color-ink-light);
  cursor: not-allowed;
}
</style>
