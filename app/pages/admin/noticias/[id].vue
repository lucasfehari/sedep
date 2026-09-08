<template>
  <div>
    <div v-if="pending" class="editor-loading">
      <div class="editor-loading__spinner" />
      <p>Carregando dados do artigo...</p>
    </div>
    <div v-else-if="fetchError" class="editor-error">
      <div class="editor-error__icon">⚠️</div>
      <h2 class="editor-error__title">{{ fetchError.title }}</h2>
      <p class="editor-error__desc">{{ fetchError.message }}</p>
      <div class="editor-error__actions">
        <NuxtLink to="/admin/noticias" class="admin-btn admin-btn--primary">← Voltar para Notícias</NuxtLink>
        <NuxtLink v-if="fetchError.code === 401" to="/admin/login" class="admin-btn admin-btn--ghost">Fazer Login</NuxtLink>
      </div>
    </div>
    <div v-else-if="article">
      <ArticleEditor :initialData="article" :isEditMode="true" />
    </div>
    <div v-else class="editor-not-found">
      <p>Artigo não encontrado.</p>
      <NuxtLink to="/admin/noticias" class="admin-btn admin-btn--primary">Voltar para Notícias</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()
const id = route.params.id as string

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

interface FetchError {
  code: number
  title: string
  message: string
}

const fetchError = ref<FetchError | null>(null)

const { data: article, pending } = await useAsyncData(`admin-article-${id}`, async () => {
  try {
    return await $fetch(`/api/admin/news/${id}`)
  } catch (err: any) {
    const status = err?.statusCode || err?.response?.status || 0
    if (status === 401) {
      fetchError.value = {
        code: 401,
        title: 'Sessão Expirada',
        message: 'Sua sessão de administrador expirou. Faça login novamente para continuar.',
      }
    } else if (status === 404) {
      fetchError.value = {
        code: 404,
        title: 'Artigo não encontrado',
        message: 'O artigo que você está tentando editar não existe ou foi excluído.',
      }
    } else {
      fetchError.value = {
        code: status,
        title: 'Erro ao carregar artigo',
        message: err?.data?.statusMessage || 'Ocorreu um erro inesperado. Tente novamente.',
      }
    }
    return null
  }
})
</script>

<style scoped>
.editor-loading,
.editor-not-found,
.editor-error {
  padding: 4rem 1rem;
  text-align: center;
  color: #94A3B8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.editor-loading__spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(59, 130, 246, 0.2);
  border-top-color: #3B82F6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.editor-error__icon {
  font-size: 2.5rem;
}

.editor-error__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #F1F5F9;
  margin: 0;
}

.editor-error__desc {
  font-size: 0.9rem;
  color: #64748B;
  max-width: 40ch;
  margin: 0;
}

.editor-error__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.5rem;
}

.admin-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: all 0.15s ease;
}

.admin-btn--primary {
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
  color: #FFFFFF;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
}

.admin-btn--ghost {
  background: transparent;
  color: #94A3B8;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.admin-btn--ghost:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #F1F5F9;
}
</style>
