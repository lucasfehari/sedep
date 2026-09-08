<template>
  <div class="admin-news-page">

    <!-- Toast -->
    <transition name="toast-anim">
      <div v-if="toast.visible" class="admin-toast" :class="`admin-toast--${toast.type}`" role="alert">
        <span>{{ toast.message }}</span>
      </div>
    </transition>

    <!-- Modal de Confirmação de Exclusão -->
    <transition name="modal-anim">
      <div v-if="deleteModal.open" class="admin-modal-backdrop" @click.self="deleteModal.open = false">
        <div class="admin-modal" role="dialog" aria-modal="true">
          <div class="admin-modal__icon">🗑️</div>
          <h3 class="admin-modal__title">Excluir artigo?</h3>
          <p class="admin-modal__desc">
            Você está prestes a excluir <strong>"{{ deleteModal.article?.title }}"</strong>.
            Esta ação não pode ser desfeita.
          </p>
          <div class="admin-modal__actions">
            <button @click="deleteModal.open = false" class="admin-btn admin-btn--ghost">Cancelar</button>
            <button @click="executeDelete" class="admin-btn admin-btn--danger" :disabled="deleteModal.loading">
              <span v-if="deleteModal.loading" class="btn-spinner" />
              {{ deleteModal.loading ? 'Excluindo...' : 'Sim, excluir' }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <div class="page-header">
      <div>
        <h1 class="page-title">Gestão de Notícias &amp; Artigos</h1>
        <p class="page-subtitle">Crie, edite e configure a otimização de busca (SEO) dos artigos da SEDEP.</p>
      </div>
      <div class="header-actions">
        <NuxtLink to="/admin/noticias/novo" class="admin-btn admin-btn--primary">
          <span>+ Criar Novo Artigo</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Barra de Filtros & Busca -->
    <div class="filter-bar">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por título, palavra-chave ou slug..."
          class="search-input"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="search-clear">✕</button>
      </div>

      <div class="filters-group">
        <select v-model="selectedCategory" class="filter-select">
          <option value="">Todas as Categorias</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>

        <select v-model="selectedStatus" class="filter-select">
          <option value="">Todos os Status</option>
          <option value="published">Publicados</option>
          <option value="draft">Rascunhos</option>
        </select>
      </div>
    </div>

    <!-- Contador -->
    <div class="articles-count">
      <span>{{ filteredArticles.length }} artigo{{ filteredArticles.length !== 1 ? 's' : '' }} encontrado{{ filteredArticles.length !== 1 ? 's' : '' }}</span>
    </div>

    <!-- Tabela de Artigos -->
    <div class="table-container">
      <div v-if="loading" class="table-loading">
        <div class="table-loading__spinner" />
        <span>Carregando artigos...</span>
      </div>

      <table v-else-if="filteredArticles.length > 0" class="admin-table">
        <thead>
          <tr>
            <th>Artigo</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>SEO Score</th>
            <th>Publicação</th>
            <th>Views</th>
            <th style="text-align: right;">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in filteredArticles" :key="article.id" :class="{ 'tr--toggling': togglingId === article.id }">
            <td>
              <div class="article-cell">
                <img
                  :src="article.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=80&auto=format&fit=crop'"
                  :alt="article.title"
                  class="article-cell__thumb"
                />
                <div class="article-cell__info">
                  <NuxtLink :to="`/admin/noticias/${article.id}`" class="article-cell__title">
                    {{ article.title }}
                  </NuxtLink>
                  <span class="article-cell__slug">/noticias/{{ article.slug }}</span>
                </div>
              </div>
            </td>

            <td>
              <span class="category-badge">{{ article.category }}</span>
            </td>

            <td>
              <button
                @click="toggleStatus(article)"
                class="status-toggle-btn"
                :class="article.status === 'published' ? 'status-toggle-btn--published' : 'status-toggle-btn--draft'"
                :disabled="togglingId === article.id"
                :title="article.status === 'published' ? 'Clique para mover para Rascunho' : 'Clique para Publicar'"
              >
                {{ article.status === 'published' ? '● Publicado' : '○ Rascunho' }}
              </button>
            </td>

            <td>
              <div class="seo-score-pill" :class="getScoreClass(calculateSeoScore(article))">
                <span class="seo-score-pill__num">{{ calculateSeoScore(article) }}</span>
                <span class="seo-score-pill__label">/100</span>
              </div>
            </td>

            <td>
              <span class="date-text">{{ formatDate(article.publishedAt) }}</span>
            </td>

            <td>
              <span class="views-text">👁️ {{ article.views || 0 }}</span>
            </td>

            <td style="text-align: right;">
              <div class="actions-cell">
                <NuxtLink :to="`/admin/noticias/${article.id}`" class="btn-action btn-action--edit" title="Editar Artigo &amp; SEO">
                  Editar
                </NuxtLink>
                <NuxtLink
                  v-if="article.status === 'published'"
                  :to="`/noticias/${article.slug}`"
                  target="_blank"
                  class="btn-action btn-action--view"
                  title="Ver no Site"
                >
                  ↗
                </NuxtLink>
                <button
                  @click="confirmDelete(article)"
                  class="btn-action btn-action--delete"
                  title="Excluir Artigo"
                >
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="empty-state">
        <span class="empty-state__icon">📄</span>
        <p>Nenhum artigo encontrado com os filtros selecionados.</p>
        <button v-if="searchQuery || selectedCategory || selectedStatus" @click="clearFilters" class="btn-action btn-action--edit" style="margin-top:0.5rem">
          Limpar filtros
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

interface Article {
  id: string
  title: string
  slug: string
  category: string
  tags: string[]
  excerpt: string
  content: string
  coverImage: string
  status: 'published' | 'draft'
  publishedAt: string
  views: number
  seo: {
    metaTitle: string
    metaDescription: string
    focusKeyword: string
    canonicalUrl?: string
    robots?: string
    ogImage?: string
    schemaType?: string
  }
}

const articles = ref<Article[]>([])
const loading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const togglingId = ref<string | null>(null)

// Toast
const toast = ref({ visible: false, message: '', type: 'success' as 'success' | 'error' })
function showToast(message: string, type: 'success' | 'error' = 'success') {
  toast.value = { visible: true, message, type }
  setTimeout(() => { toast.value.visible = false }, 3500)
}

// Delete modal
const deleteModal = ref({ open: false, article: null as Article | null, loading: false })

function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedStatus.value = ''
}

const categories = computed(() => {
  const cats = new Set(articles.value.map((a) => a.category))
  return Array.from(cats).filter(Boolean)
})

const filteredArticles = computed(() => {
  return articles.value.filter((article) => {
    if (selectedStatus.value && article.status !== selectedStatus.value) return false
    if (selectedCategory.value && article.category !== selectedCategory.value) return false
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      const matchTitle = article.title?.toLowerCase().includes(q)
      const matchSlug = article.slug?.toLowerCase().includes(q)
      const matchKey = article.seo?.focusKeyword?.toLowerCase().includes(q)
      if (!matchTitle && !matchSlug && !matchKey) return false
    }
    return true
  })
})

function calculateSeoScore(article: Article): number {
  let score = 0
  const title = article.title || ''
  const metaTitle = article.seo?.metaTitle || ''
  const metaDesc = article.seo?.metaDescription || ''
  const keyword = (article.seo?.focusKeyword || '').toLowerCase()
  const content = article.content || ''

  if (metaTitle.length >= 30 && metaTitle.length <= 70) score += 25
  else if (metaTitle.length > 0) score += 15

  if (metaDesc.length >= 100 && metaDesc.length <= 165) score += 25
  else if (metaDesc.length > 0) score += 15

  if (keyword) {
    score += 10
    if (title.toLowerCase().includes(keyword)) score += 10
    if (metaDesc.toLowerCase().includes(keyword)) score += 10
    if (content.toLowerCase().includes(keyword)) score += 10
  } else {
    if (content.length > 300) score += 20
  }

  if (article.coverImage) score += 10

  return Math.min(100, Math.max(0, score))
}

function getScoreClass(score: number): string {
  if (score >= 80) return 'seo-score-pill--good'
  if (score >= 50) return 'seo-score-pill--warning'
  return 'seo-score-pill--bad'
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

async function loadArticles() {
  loading.value = true
  try {
    const data = await $fetch<Article[]>('/api/admin/news')
    articles.value = data || []
  } catch (error) {
    showToast('Erro ao carregar artigos. Tente novamente.', 'error')
  } finally {
    loading.value = false
  }
}

async function toggleStatus(article: Article) {
  if (togglingId.value) return
  togglingId.value = article.id
  const newStatus = article.status === 'published' ? 'draft' : 'published'
  try {
    await $fetch(`/api/admin/news/${article.id}`, {
      method: 'PUT',
      body: { status: newStatus },
    })
    article.status = newStatus
    showToast(`Artigo ${newStatus === 'published' ? 'publicado' : 'movido para rascunho'} com sucesso.`)
  } catch {
    showToast('Erro ao atualizar status do artigo.', 'error')
  } finally {
    togglingId.value = null
  }
}

function confirmDelete(article: Article) {
  deleteModal.value = { open: true, article, loading: false }
}

async function executeDelete() {
  const article = deleteModal.value.article
  if (!article) return
  deleteModal.value.loading = true
  try {
    await $fetch(`/api/admin/news/${article.id}`, { method: 'DELETE' })
    articles.value = articles.value.filter((a) => a.id !== article.id)
    deleteModal.value.open = false
    showToast(`"${article.title}" foi excluído permanentemente.`)
  } catch {
    showToast('Erro ao excluir o artigo. Tente novamente.', 'error')
    deleteModal.value.loading = false
  }
}

onMounted(() => {
  loadArticles()
})
</script>

<style scoped>
.admin-news-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: -0.02em;
  margin: 0 0 0.25rem 0;
}

.page-subtitle {
  font-size: 0.9rem;
  color: #94A3B8;
  margin: 0;
}

/* Filter Bar */
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background-color: #0B1120;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #070B14;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 0.85rem;
  border-radius: 6px;
  flex: 1;
  max-width: 450px;
}

.search-icon {
  font-size: 0.85rem;
  opacity: 0.6;
}

.search-input {
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-size: 0.875rem;
  width: 100%;
  outline: none;
}

.filters-group {
  display: flex;
  gap: 0.75rem;
}

.filter-select {
  background-color: #070B14;
  color: #E2E8F0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 0.85rem;
  border-radius: 6px;
  font-size: 0.85rem;
  outline: none;
  cursor: pointer;
}

/* Table Container */
.table-container {
  background-color: #0B1120;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.875rem;
}

.admin-table th {
  padding: 1rem 1.25rem;
  color: #64748B;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.admin-table td {
  padding: 1.1rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  vertical-align: middle;
}

.article-cell {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.article-cell__thumb {
  width: 52px;
  height: 52px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.article-cell__info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.article-cell__title {
  font-weight: 600;
  color: #F8FAFC;
  text-decoration: none;
  max-width: 380px;
  line-height: 1.35;
  transition: color 0.15s ease;
}

.article-cell__title:hover {
  color: #60A5FA;
}

.article-cell__slug {
  font-size: 0.75rem;
  color: #64748B;
  font-family: monospace;
}

.category-badge {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  font-size: 0.75rem;
  color: #94A3B8;
}

.status-toggle-btn {
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.15s ease;
}

.status-toggle-btn--published {
  background-color: rgba(34, 197, 94, 0.15);
  color: #4ADE80;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.status-toggle-btn--draft {
  background-color: rgba(234, 179, 8, 0.15);
  color: #FACC15;
  border: 1px solid rgba(234, 179, 8, 0.3);
}

.seo-score-pill {
  display: inline-flex;
  align-items: baseline;
  gap: 0.15rem;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8rem;
}

.seo-score-pill--good {
  background-color: rgba(34, 197, 94, 0.15);
  color: #4ADE80;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.seo-score-pill--warning {
  background-color: rgba(234, 179, 8, 0.15);
  color: #FACC15;
  border: 1px solid rgba(234, 179, 8, 0.3);
}

.seo-score-pill--bad {
  background-color: rgba(239, 68, 68, 0.15);
  color: #F87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.seo-score-pill__label {
  font-size: 0.65rem;
  opacity: 0.7;
}

.date-text, .views-text {
  color: #94A3B8;
  font-size: 0.8rem;
}

.actions-cell {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
}

.btn-action {
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: all 0.15s ease;
}

.btn-action--edit {
  background-color: rgba(59, 130, 246, 0.15);
  color: #60A5FA;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.btn-action--edit:hover {
  background-color: rgba(59, 130, 246, 0.25);
}

.btn-action--view {
  background-color: rgba(255, 255, 255, 0.06);
  color: #94A3B8;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-action--view:hover {
  background-color: rgba(255, 255, 255, 0.12);
  color: #FFFFFF;
}

.btn-action--delete {
  background-color: rgba(239, 68, 68, 0.1);
  color: #F87171;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.btn-action--delete:hover {
  background-color: rgba(239, 68, 68, 0.2);
}

.table-loading, .empty-state {
  padding: 3rem 1rem;
  text-align: center;
  color: #64748B;
}

@media (max-width: 800px) {
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .search-box {
    max-width: none;
  }
}

/* ===== TOAST & MODAL ===== */
.admin-toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  background-color: #1E293B;
  color: #F8FAFC;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-left: 4px solid #3B82F6;
}

.admin-toast--success {
  border-left-color: #10B981;
}

.admin-toast--error {
  border-left-color: #EF4444;
}

.toast-anim-enter-active,
.toast-anim-leave-active {
  transition: all 0.3s ease;
}
.toast-anim-enter-from,
.toast-anim-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.admin-modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(4px);
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.admin-modal {
  background-color: #1E293B;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.admin-modal__icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.admin-modal__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #F1F5F9;
  margin: 0 0 0.5rem 0;
}

.admin-modal__desc {
  font-size: 0.9rem;
  color: #94A3B8;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

.admin-modal__actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.admin-btn--danger {
  background-color: #EF4444;
  color: white;
}

.admin-btn--danger:hover:not(:disabled) {
  background-color: #DC2626;
}

.admin-btn--danger:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.modal-anim-enter-active,
.modal-anim-leave-active {
  transition: opacity 0.2s ease;
}
.modal-anim-enter-from,
.modal-anim-leave-to {
  opacity: 0;
}

/* Spinners e UI extras */
.btn-spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
}

.table-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.table-loading__spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255,255,255,0.1);
  border-radius: 50%;
  border-top-color: #3B82F6;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state__icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.articles-count {
  font-size: 0.85rem;
  color: #94A3B8;
  margin-bottom: 0.5rem;
}

.tr--toggling {
  opacity: 0.5;
  pointer-events: none;
}
</style>
