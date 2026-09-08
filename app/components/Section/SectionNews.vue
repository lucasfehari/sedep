<template>
  <section class="news-section section bg-surface-alt" aria-labelledby="news-heading">
    <div class="container">

      <!-- Header -->
      <div class="news-section__header">
        <div>
          <p class="section-label">Notícias e Insights</p>
          <h2 id="news-heading" class="news-section__title">
            Acompanhe o que está acontecendo.
          </h2>
        </div>
        <BaseButton to="/noticias" variant="secondary">
          Ver todas as notícias
        </BaseButton>
      </div>

      <!-- Loading Skeletons -->
      <div v-if="loading" class="news-section__skeletons" aria-live="polite" aria-label="Carregando notícias">
        <div class="news-skeleton-card">
          <div class="news-skel news-skel--img" />
          <div class="news-skel news-skel--cat" />
          <div class="news-skel news-skel--title" />
          <div class="news-skel news-skel--text" />
        </div>
        <div v-for="n in 2" :key="n" class="news-skeleton-card news-skeleton-card--small">
          <div class="news-skel news-skel--img-sm" />
          <div class="news-skel news-skel--cat" />
          <div class="news-skel news-skel--title-sm" />
        </div>
      </div>

      <!-- Grid de Notícias -->
      <div v-else-if="articles.length > 0" class="news-section__grid">

        <!-- Artigo Destaque -->
        <article class="news-featured" v-if="featured">
          <NuxtLink :to="`/noticias/${featured.slug}`" class="news-featured__img-link">
            <img
              :src="featured.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=900&auto=format&fit=crop'"
              :alt="featured.title"
              class="news-featured__img"
              loading="lazy"
            />
            <span class="news-featured__category-badge">{{ featured.category || 'Notícias' }}</span>
          </NuxtLink>
          <div class="news-featured__body">
            <div class="news-featured__meta">
              <time :datetime="featured.publishedAt || featured.date" class="news-featured__date">
                {{ formatDate(featured.publishedAt || featured.date) }}
              </time>
              <span v-if="featured.readingTime" class="news-featured__reading">
                · {{ featured.readingTime }} min de leitura
              </span>
            </div>
            <h3 class="news-featured__title">
              <NuxtLink :to="`/noticias/${featured.slug}`" class="news-featured__title-link">
                {{ featured.title }}
              </NuxtLink>
            </h3>
            <p v-if="featured.excerpt" class="news-featured__excerpt">{{ featured.excerpt }}</p>
            <NuxtLink :to="`/noticias/${featured.slug}`" class="news-link-arrow">
              Ler artigo completo →
            </NuxtLink>
          </div>
        </article>

        <!-- Artigos Secundários -->
        <div class="news-secondary">
          <article
            v-for="article in secondary"
            :key="article.id"
            class="news-card-small"
          >
            <NuxtLink :to="`/noticias/${article.slug}`" class="news-card-small__img-link">
              <img
                :src="article.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop'"
                :alt="article.title"
                class="news-card-small__img"
                loading="lazy"
              />
            </NuxtLink>
            <div class="news-card-small__body">
              <div class="news-card-small__meta">
                <span v-if="article.category" class="news-card-small__cat">{{ article.category }}</span>
                <span class="news-card-small__sep">·</span>
                <time :datetime="article.publishedAt || article.date" class="news-card-small__date">
                  {{ formatDate(article.publishedAt || article.date) }}
                </time>
              </div>
              <h3 class="news-card-small__title">
                <NuxtLink :to="`/noticias/${article.slug}`" class="news-card-small__link">
                  {{ article.title }}
                </NuxtLink>
              </h3>
              <NuxtLink :to="`/noticias/${article.slug}`" class="news-link-arrow news-link-arrow--sm">
                Ler →
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>

      <!-- Fallback -->
      <div v-else class="news-section__fallback">
        <p>Acompanhe atualizações sobre legislação, tecnologia jurídica e novidades da SEDEP.</p>
        <BaseButton to="/noticias" variant="primary">Acessar notícias</BaseButton>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Article {
  id: string | number
  title: string
  slug: string
  publishedAt?: string
  date?: string
  excerpt?: string
  category?: string
  coverImage?: string
  readingTime?: number
}

const loading = ref(true)
const articles = ref<Article[]>([])

const featured = computed(() => articles.value[0] || null)
const secondary = computed(() => articles.value.slice(1, 3))

function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

onMounted(async () => {
  try {
    const data = await $fetch<Article[]>('/api/news', { params: { per_page: 3 } })
    articles.value = data || []
  } catch {
    articles.value = []
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* ===== SECTION ===== */
.news-section {
  border-top: 1px solid var(--color-border);
}

.news-section__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: var(--space-10);
  gap: var(--space-6);
  flex-wrap: wrap;
}

.news-section__title {
  font-size: var(--text-4xl);
  color: var(--color-ink);
  margin-top: var(--space-3);
  margin-bottom: 0;
}

/* ===== GRID PRINCIPAL ===== */
.news-section__grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: var(--space-8);
  align-items: start;
}

/* ===== FEATURED CARD ===== */
.news-featured {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.news-featured:hover {
  border-color: var(--color-faz);
  box-shadow: 0 12px 32px -10px rgba(24, 72, 184, 0.15);
  transform: translateY(-3px);
}

.news-featured__img-link {
  display: block;
  position: relative;
  height: 260px;
  overflow: hidden;
  background: var(--color-surface-alt);
}

.news-featured__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.news-featured:hover .news-featured__img {
  transform: scale(1.04);
}

.news-featured__category-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(24, 72, 184, 0.9);
  color: #FFFFFF;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  backdrop-filter: blur(4px);
}

.news-featured__body {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.news-featured__meta {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: var(--text-xs);
  color: var(--color-ink-light);
}

.news-featured__date {
  font-weight: 500;
}

.news-featured__reading {
  color: var(--color-ink-muted);
}

.news-featured__title {
  font-size: var(--text-xl);
  line-height: 1.3;
  color: var(--color-ink);
  margin: 0;
}

.news-featured__title-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.15s ease;
}

.news-featured__title-link:hover {
  color: var(--color-faz);
}

.news-featured__excerpt {
  font-size: var(--text-sm);
  color: var(--color-ink-medium);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ===== SECONDARY STACK ===== */
.news-secondary {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.news-card-small {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.news-card-small:hover {
  border-color: var(--color-faz);
  box-shadow: 0 4px 16px -6px rgba(24, 72, 184, 0.12);
}

.news-card-small__img-link {
  flex-shrink: 0;
  width: 88px;
  height: 72px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-surface-alt);
  display: block;
}

.news-card-small__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-card-small:hover .news-card-small__img {
  transform: scale(1.06);
}

.news-card-small__body {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.news-card-small__meta {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.7rem;
  color: var(--color-ink-light);
}

.news-card-small__cat {
  font-weight: 700;
  color: var(--color-faz);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.news-card-small__sep {
  color: var(--color-border-hover);
}

.news-card-small__title {
  font-size: var(--text-sm);
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-ink);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card-small__link {
  color: inherit;
  text-decoration: none;
  transition: color 0.15s ease;
}

.news-card-small__link:hover {
  color: var(--color-faz);
}

/* ===== LINK ARROW ===== */
.news-link-arrow {
  display: inline-flex;
  align-items: center;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-faz);
  text-decoration: none;
  margin-top: 0.25rem;
  transition: gap 0.2s ease;
  letter-spacing: -0.01em;
}

.news-link-arrow:hover {
  text-decoration: underline;
}

.news-link-arrow--sm {
  font-size: 0.75rem;
  margin-top: auto;
}

/* ===== SKELETONS ===== */
.news-section__skeletons {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: var(--space-8);
  align-items: start;
}

.news-skeleton-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  padding: 0 0 1.5rem 0;
}

.news-skeleton-card--small {
  flex-direction: row;
  padding: 1rem;
  border-radius: 12px;
  align-items: flex-start;
  gap: 1rem;
}

.news-skel {
  background: linear-gradient(90deg, var(--color-surface-alt) 25%, var(--color-border) 50%, var(--color-surface-alt) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.news-skel--img    { height: 240px; border-radius: 0; }
.news-skel--img-sm { width: 88px; min-width: 88px; height: 72px; border-radius: 8px; }
.news-skel--cat    { height: 12px; width: 70px; margin: 0.5rem 1.75rem 0; }
.news-skel--title  { height: 22px; width: 85%; margin: 0 1.75rem; }
.news-skel--title-sm { height: 16px; width: 80%; }
.news-skel--text   { height: 52px; margin: 0 1.75rem; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ===== FALLBACK ===== */
.news-section__fallback {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-6);
  max-width: 500px;
  color: var(--color-ink-medium);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .news-section__grid,
  .news-section__skeletons {
    grid-template-columns: 1fr;
  }

  .news-secondary {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .news-secondary {
    grid-template-columns: 1fr;
  }

  .news-section__header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
