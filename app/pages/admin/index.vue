<template>
  <div class="admin-dashboard">
    <!-- Header com Boas-vindas -->
    <div class="dashboard-header">
      <div>
        <h1 class="dashboard-title">Central Editorial SEDEP</h1>
        <p class="dashboard-subtitle">Gerencie artigos, metadados para indexação no Google e desempenho de conteúdo.</p>
      </div>
      <div class="dashboard-actions">
        <NuxtLink to="/admin/noticias/novo" class="admin-btn admin-btn--primary">
          <span>+ Criar Novo Artigo</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Cards de Métricas -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-card__header">
          <span class="metric-card__label">Total de Artigos</span>
          <span class="metric-card__icon">📚</span>
        </div>
        <p class="metric-card__value">{{ totalArticles }}</p>
        <p class="metric-card__sub">{{ publishedArticles }} publicados · {{ draftArticles }} rascunhos</p>
      </div>

      <div class="metric-card">
        <div class="metric-card__header">
          <span class="metric-card__label">Artigos Indexáveis (SEO)</span>
          <span class="metric-card__icon">🎯</span>
        </div>
        <p class="metric-card__value">{{ seoOptimizedCount }}</p>
        <p class="metric-card__sub">Com Meta Tags e Schema.org ativos</p>
      </div>

      <div class="metric-card">
        <div class="metric-card__header">
          <span class="metric-card__label">Visualizações Totais</span>
          <span class="metric-card__icon">📈</span>
        </div>
        <p class="metric-card__value">{{ totalViews }}</p>
        <p class="metric-card__sub">Engajamento orgânico</p>
      </div>

      <div class="metric-card">
        <div class="metric-card__header">
          <span class="metric-card__label">Categorias Ativas</span>
          <span class="metric-card__icon">🏷️</span>
        </div>
        <p class="metric-card__value">{{ categoriesCount }}</p>
        <p class="metric-card__sub">IA, Software, Cyber Security, etc.</p>
      </div>
    </div>

    <!-- Artigos Recentes -->
    <div class="dashboard-section">
      <div class="dashboard-section__header">
        <h2 class="dashboard-section__title">Artigos Recentes</h2>
        <NuxtLink to="/admin/noticias" class="dashboard-section__link">Ver todos os artigos →</NuxtLink>
      </div>

      <div v-if="loading" class="dashboard-loading">
        Carregando dados editoriais...
      </div>

      <div v-else-if="articles.length > 0" class="recent-table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Artigo</th>
              <th>Categoria</th>
              <th>Status</th>
              <th>Data</th>
              <th>Visualizações</th>
              <th style="text-align: right;">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in articles.slice(0, 5)" :key="article.id">
              <td>
                <div class="table-article">
                  <img :src="article.coverImage" :alt="article.title" class="table-article__thumb" />
                  <div class="table-article__info">
                    <p class="table-article__title">{{ article.title }}</p>
                    <span class="table-article__slug">/noticias/{{ article.slug }}</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="table-badge">{{ article.category }}</span>
              </td>
              <td>
                <span
                  class="status-pill"
                  :class="article.status === 'published' ? 'status-pill--published' : 'status-pill--draft'"
                >
                  {{ article.status === 'published' ? '● Publicado' : '○ Rascunho' }}
                </span>
              </td>
              <td>
                <span class="table-date">{{ formatDate(article.publishedAt) }}</span>
              </td>
              <td>
                <span class="table-views">👁️ {{ article.views || 0 }}</span>
              </td>
              <td style="text-align: right;">
                <div class="table-actions">
                  <NuxtLink :to="`/admin/noticias/${article.id}`" class="action-btn action-btn--edit">
                    Editar (SEO)
                  </NuxtLink>
                  <NuxtLink
                    v-if="article.status === 'published'"
                    :to="`/noticias/${article.slug}`"
                    target="_blank"
                    class="action-btn action-btn--view"
                    title="Ver no site"
                  >
                    ↗
                  </NuxtLink>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="empty-state">
        <p>Nenhum artigo cadastrado ainda.</p>
        <NuxtLink to="/admin/noticias/novo" class="admin-btn admin-btn--primary" style="margin-top: 1rem;">
          Criar Primeiro Artigo
        </NuxtLink>
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
  coverImage: string
  status: 'published' | 'draft'
  publishedAt: string
  views: number
  seo: {
    metaTitle: string
    metaDescription: string
  }
}

const articles = ref<Article[]>([])
const loading = ref(true)

const totalArticles = computed(() => articles.value.length)
const publishedArticles = computed(() => articles.value.filter((a) => a.status === 'published').length)
const draftArticles = computed(() => articles.value.filter((a) => a.status === 'draft').length)
const totalViews = computed(() => articles.value.reduce((acc, curr) => acc + (curr.views || 0), 0))
const seoOptimizedCount = computed(() => articles.value.filter((a) => a.seo?.metaTitle && a.seo?.metaDescription).length)
const categoriesCount = computed(() => new Set(articles.value.map((a) => a.category)).size)

function formatDate(dateStr: string): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

onMounted(async () => {
  try {
    const data = await $fetch<Article[]>('/api/admin/news')
    articles.value = data || []
  } catch (error) {
    console.error('Erro ao carregar artigos:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.dashboard-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: -0.02em;
  margin: 0 0 0.25rem 0;
}

.dashboard-subtitle {
  font-size: 0.9rem;
  color: #94A3B8;
  margin: 0;
}

/* Metrics */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.metric-card {
  background-color: #0B1120;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.metric-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-card__label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748B;
}

.metric-card__icon {
  font-size: 1.1rem;
}

.metric-card__value {
  font-size: 2rem;
  font-weight: 800;
  color: #F8FAFC;
  margin: 0;
  letter-spacing: -0.03em;
}

.metric-card__sub {
  font-size: 0.75rem;
  color: #94A3B8;
  margin: 0;
}

/* Section */
.dashboard-section {
  background-color: #0B1120;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
}

.dashboard-section__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.dashboard-section__title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
}

.dashboard-section__link {
  font-size: 0.85rem;
  color: #60A5FA;
  text-decoration: none;
  font-weight: 500;
}

.dashboard-section__link:hover {
  text-decoration: underline;
}

/* Table */
.recent-table-wrapper {
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.875rem;
}

.admin-table th {
  padding: 0.75rem 1rem;
  color: #64748B;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.admin-table td {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  vertical-align: middle;
}

.table-article {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.table-article__thumb {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.table-article__title {
  font-weight: 600;
  color: #F1F5F9;
  margin: 0 0 0.2rem 0;
  max-width: 420px;
  line-height: 1.3;
}

.table-article__slug {
  font-size: 0.75rem;
  color: #64748B;
  font-family: monospace;
}

.table-badge {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  font-size: 0.75rem;
  color: #94A3B8;
}

.status-pill {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-pill--published {
  background-color: rgba(34, 197, 94, 0.15);
  color: #4ADE80;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.status-pill--draft {
  background-color: rgba(234, 179, 8, 0.15);
  color: #FACC15;
  border: 1px solid rgba(234, 179, 8, 0.3);
}

.table-date, .table-views {
  color: #94A3B8;
  font-size: 0.8rem;
}

.table-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.15s ease;
}

.action-btn--edit {
  background-color: rgba(59, 130, 246, 0.15);
  color: #60A5FA;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.action-btn--edit:hover {
  background-color: rgba(59, 130, 246, 0.25);
}

.action-btn--view {
  background-color: rgba(255, 255, 255, 0.06);
  color: #94A3B8;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.action-btn--view:hover {
  background-color: rgba(255, 255, 255, 0.12);
  color: #FFFFFF;
}

.dashboard-loading, .empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #64748B;
}

@media (max-width: 1024px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
