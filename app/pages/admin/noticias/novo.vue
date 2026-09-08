<template>
  <div>
    <ArticleEditor :isEditMode="false" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})
</script>
