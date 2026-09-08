<template>
  <div class="news-page">
    <!-- Header Hero -->
    <section class="news-hero" aria-labelledby="noticias-heading">
      <div class="container">
        <p class="section-label">SEDEP Insights & Notícias</p>
        <h1 id="noticias-heading" class="news-hero__title">
          Atualizações sobre tecnologia, inteligência jurídica e inovação.
        </h1>
        <p class="news-hero__sub lead">
          Artigos técnicos, tendências do mercado jurídico, novidades de
          produtos e guias práticos desenvolvidos pela equipe SEDEP.
        </p>

        <!-- Filtros de Categoria -->
        <div
          class="news-categories-nav"
          role="group"
          aria-label="Filtrar por categoria"
        >
          <button
            type="button"
            class="category-filter-btn"
            :class="{ 'category-filter-btn--active': selectedCategory === '' }"
            @click="selectedCategory = ''"
          >
            Todos
          </button>
          <button
            v-for="cat in dynamicCategories"
            :key="cat"
            type="button"
            class="category-filter-btn"
            :class="{ 'category-filter-btn--active': selectedCategory === cat }"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Busca rápida -->
        <div class="news-search-box">
          <span class="news-search-box__icon">🔍</span>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Buscar artigos..."
            class="news-search-box__input"
            aria-label="Buscar artigos"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="news-search-box__clear"
            aria-label="Limpar busca"
          >
            ✕
          </button>
        </div>
      </div>
    </section>

    <!-- Listagem Principal -->
    <section class="section bg-surface-alt" aria-live="polite">
      <div class="container">
        <!-- Loading Skeletons -->
        <div v-if="loading" class="news-grid">
          <div v-for="n in 6" :key="n" class="news-skeleton-card">
            <div class="news-skeleton news-skeleton--img" />
            <div class="news-skeleton news-skeleton--title" />
            <div class="news-skeleton news-skeleton--text" />
          </div>
        </div>

        <!-- Hero Card (primeiro artigo em destaque) + Grid -->
        <template v-else-if="filteredArticles.length > 0">
          <!-- Destaque: primeiro artigo -->
          <article
            v-if="!selectedCategory && !searchQuery && heroArticle"
            class="news-hero-card"
          >
            <NuxtLink
              :to="`/noticias/${heroArticle.slug}`"
              class="news-hero-card__cover-link"
            >
              <img
                :src="
                  heroArticle.coverImage ||
                  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop'
                "
                :alt="heroArticle.title"
                class="news-hero-card__img"
                loading="eager"
              />
              <div class="news-hero-card__overlay" />
            </NuxtLink>
            <div class="news-hero-card__body">
              <div class="news-hero-card__meta">
                <span class="news-hero-card__category">{{
                  heroArticle.category
                }}</span>
                <span>·</span>
                <time :datetime="heroArticle.publishedAt">{{
                  formatDate(heroArticle.publishedAt)
                }}</time>
                <span v-if="heroArticle.readingTime"
                  >· {{ heroArticle.readingTime }} min</span
                >
              </div>
              <h2 class="news-hero-card__title">
                <NuxtLink
                  :to="`/noticias/${heroArticle.slug}`"
                  class="news-hero-card__title-link"
                >
                  {{ heroArticle.title }}
                </NuxtLink>
              </h2>
              <p class="news-hero-card__excerpt">{{ heroArticle.excerpt }}</p>
              <NuxtLink
                :to="`/noticias/${heroArticle.slug}`"
                class="news-hero-card__cta"
              >
                Ler artigo completo →
              </NuxtLink>
            </div>
          </article>

          <!-- Grid dos demais artigos -->
          <div
            class="news-grid"
            :class="{
              'news-grid--with-hero':
                !selectedCategory && !searchQuery && heroArticle,
            }"
          >
            <article
              v-for="article in gridArticles"
              :key="article.id"
              class="news-card"
            >
              <NuxtLink
                :to="`/noticias/${article.slug}`"
                class="news-card__cover-link"
              >
                <img
                  :src="
                    article.coverImage ||
                    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop'
                  "
                  :alt="article.title"
                  class="news-card__cover-img"
                  loading="lazy"
                />
              </NuxtLink>

              <div class="news-card__body">
                <div class="news-card__meta">
                  <span class="news-card__category">{{
                    article.category
                  }}</span>
                  <span class="news-card__dot">·</span>
                  <time :datetime="article.publishedAt" class="news-card__date">
                    {{ formatDate(article.publishedAt) }}
                  </time>
                  <span
                    v-if="article.readingTime"
                    class="news-card__reading-time"
                  >
                    · {{ article.readingTime }} min
                  </span>
                </div>

                <h2 class="news-card__title">
                  <NuxtLink
                    :to="`/noticias/${article.slug}`"
                    class="news-card__title-link"
                  >
                    {{ article.title }}
                  </NuxtLink>
                </h2>

                <p class="news-card__excerpt">{{ article.excerpt }}</p>

                <div class="news-card__footer">
                  <NuxtLink
                    :to="`/noticias/${article.slug}`"
                    class="news-card__read-more"
                  >
                    Ler artigo →
                  </NuxtLink>
                </div>
              </div>
            </article>
          </div>

          <!-- Sem mais resultados -->
          <p
            v-if="
              filteredArticles.length === 0 && (selectedCategory || searchQuery)
            "
            class="news-no-results"
          >
            Nenhum resultado para "{{ searchQuery || selectedCategory }}".
          </p>
        </template>

        <!-- Fallback Sem Artigos -->
        <div v-else class="news-empty">
          <p>
            Nenhuma notícia encontrada{{
              selectedCategory ? ` em "${selectedCategory}"` : ""
            }}{{ searchQuery ? ` para "${searchQuery}"` : "" }}.
          </p>
          <button @click="clearFilters" class="btn-clear-filter">
            Limpar filtros
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

definePageMeta({ layout: "default" });

useSeoMeta({
  title: "Notícias & Artigos Jurídicos | SEDEP",
  description:
    "Acompanhe as atualizações da SEDEP sobre inteligência artificial no direito, software jurídico, LGPD, Cyber Security e tendências da advocacia.",
  ogTitle: "Notícias & Insights Jurídicos — SEDEP",
  ogDescription:
    "Artigos técnicos e atualizações sobre tecnologia jurídica, IA, Cyber Security e gestão de escritórios.",
  ogType: "website",
});

interface Article {
  id: string | number;
  title: string;
  slug: string;
  category: string;
  tags?: string[];
  publishedAt?: string;
  excerpt: string;
  coverImage?: string;
  readingTime?: number;
}

const loading = ref(true);
const articles = ref<Article[]>([]);
const selectedCategory = ref("");
const searchQuery = ref("");

// Categorias dinâmicas extraídas dos artigos retornados pela API
const dynamicCategories = computed(() => {
  const cats = new Set(articles.value.map((a) => a.category).filter(Boolean));
  return Array.from(cats);
});

const filteredArticles = computed(() => {
  let result = articles.value;
  if (selectedCategory.value) {
    result = result.filter(
      (a) => a.category?.toLowerCase() === selectedCategory.value.toLowerCase(),
    );
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase();
    result = result.filter(
      (a) =>
        a.title?.toLowerCase().includes(q) ||
        a.excerpt?.toLowerCase().includes(q) ||
        a.tags?.some((t) => t.toLowerCase().includes(q)),
    );
  }
  return result;
});

const heroArticle = computed(() => filteredArticles.value[0] || null);
const gridArticles = computed(() => {
  // Se há hero card, remove o primeiro da grade
  if (!selectedCategory.value && !searchQuery.value && heroArticle.value) {
    return filteredArticles.value.slice(1);
  }
  return filteredArticles.value;
});

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function clearFilters() {
  selectedCategory.value = "";
  searchQuery.value = "";
}

onMounted(async () => {
  try {
    const data = await $fetch<Article[]>("/api/news", {
      params: { per_page: 24 },
    });
    articles.value = data || [];
  } catch (error) {
    console.error("Erro ao carregar notícias:", error);
    articles.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* ===== HERO ===== */
.news-hero {
  padding-top: clamp(5rem, 9vw, 7.5rem);
  padding-bottom: clamp(3rem, 5vw, 4.5rem);
  background: linear-gradient(
    175deg,
    #ffffff 0%,
    #ebf2ff 30%,
    #e6f0ff 40%,
    var(--color-faz-light, #8faef5) 100%
  );
  position: relative;
  overflow: hidden;
}

/* Suaviza ainda mais com um véu leve */
.news-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.12) 0%,
    transparent 50%
  );
  pointer-events: none;
}

.news-hero__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: var(--color-ink);
  letter-spacing: var(--letter-spacing-tight);
  margin-bottom: var(--space-4);
  max-width: 24ch;
}

.news-hero__sub {
  max-width: 60ch;
  color: var(--color-ink-medium);
  margin-bottom: var(--space-8);
}

/* ===== FILTROS ===== */
.news-categories-nav {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.category-filter-btn {
  background-color: rgba(24, 72, 184, 0.08);
  color: var(--color-faz);
  border: 1px solid rgba(24, 72, 184, 0.2);
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full, 9999px);
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.category-filter-btn:hover {
  background-color: rgba(24, 72, 184, 0.14);
  color: var(--color-faz);
}

.category-filter-btn--active {
  background-color: var(--color-faz) !important;
  color: #ffffff !important;
  font-weight: 700;
  border-color: var(--color-faz) !important;
}

/* ===== SEARCH ===== */
.news-search-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(24, 72, 184, 0.07);
  border: 1px solid rgba(24, 72, 184, 0.18);
  border-radius: 10px;
  padding: 0.6rem 1rem;
  max-width: 400px;
  transition: all 0.2s ease;
}

.news-search-box:focus-within {
  background: rgba(24, 72, 184, 0.12);
  border-color: var(--color-faz);
}

.news-search-box__icon {
  font-size: 0.85rem;
  opacity: 0.6;
  flex-shrink: 0;
}

.news-search-box__input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--color-sedep-navy-dark);
  font-size: 0.875rem;
  outline: none;
  min-width: 0;
}

.news-search-box__input::placeholder {
  color: var(--color-ink-muted);
}

.news-search-box__clear {
  background: none;
  border: none;
  color: var(--color-ink-muted);
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0.1rem;
  line-height: 1;
  flex-shrink: 0;
  transition: color 0.15s;
}

.news-search-box__clear:hover {
  color: var(--color-ink);
}

/* ===== HERO CARD ===== */
.news-hero-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  background: var(--color-surface);
  border: var(--border-thin);
  border-radius: var(--radius-xl, 16px);
  overflow: hidden;
  margin-bottom: 2.5rem;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.news-hero-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -15px rgba(10, 61, 124, 0.18);
}

.news-hero-card__cover-link {
  display: block;
  position: relative;
  overflow: hidden;
  height: 100%;
  min-height: 300px;
}

.news-hero-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.news-hero-card:hover .news-hero-card__img {
  transform: scale(1.04);
}

.news-hero-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(10, 61, 124, 0.1) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.news-hero-card__body {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.news-hero-card__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-xs);
  color: var(--color-ink-light);
}

.news-hero-card__category {
  font-weight: 700;
  color: var(--color-sedep-blue);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.news-hero-card__title {
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  line-height: 1.25;
  margin: 0;
  letter-spacing: -0.02em;
}

.news-hero-card__title-link {
  color: var(--color-ink);
  text-decoration: none;
  transition: color 0.15s ease;
}

.news-hero-card__title-link:hover {
  color: var(--color-sedep-blue);
}

.news-hero-card__excerpt {
  font-size: var(--text-sm);
  color: var(--color-ink-medium);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-hero-card__cta {
  display: inline-flex;
  align-items: center;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-sedep-blue);
  text-decoration: none;
  margin-top: 0.5rem;
  transition: gap 0.2s ease;
}

.news-hero-card__cta:hover {
  text-decoration: underline;
}

/* ===== GRID ===== */
.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
}

/* ===== NEWS CARD ===== */
.news-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  border: var(--border-thin);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.news-card:hover {
  border-color: var(--color-sedep-blue-mid);
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -10px rgba(10, 61, 124, 0.15);
}

.news-card__cover-link {
  display: block;
  height: 200px;
  overflow: hidden;
  background-color: var(--color-surface-alt);
}

.news-card__cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-card:hover .news-card__cover-img {
  transform: scale(1.04);
}

.news-card__body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.news-card__meta {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: var(--text-xs);
  color: var(--color-ink-light);
  margin-bottom: var(--space-3);
}

.news-card__category {
  font-weight: 700;
  color: var(--color-sedep-blue);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.news-card__title {
  font-size: var(--text-lg);
  line-height: 1.35;
  margin-bottom: var(--space-3);
}

.news-card__title-link {
  color: var(--color-ink);
  text-decoration: none;
  transition: color 0.15s ease;
}

.news-card__title-link:hover {
  color: var(--color-sedep-blue);
}

.news-card__excerpt {
  font-size: var(--text-sm);
  color: var(--color-ink-medium);
  line-height: 1.55;
  margin-bottom: var(--space-6);
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card__footer {
  padding-top: var(--space-4);
  border-top: var(--border-thin);
}

.news-card__read-more {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-sedep-blue);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.news-card__read-more:hover {
  text-decoration: underline;
}

/* ===== SKELETONS ===== */
.news-skeleton-card {
  background-color: var(--color-surface);
  border: var(--border-thin);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.news-skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface-alt) 25%,
    var(--color-border) 50%,
    var(--color-surface-alt) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.news-skeleton--img {
  height: 180px;
}
.news-skeleton--title {
  height: 24px;
  width: 80%;
}
.news-skeleton--text {
  height: 60px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* ===== EMPTY ===== */
.news-empty,
.news-no-results {
  text-align: center;
  padding: 4rem 1rem;
  color: var(--color-ink-medium);
}

.btn-clear-filter {
  margin-top: 1rem;
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background-color: var(--color-sedep-blue);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: var(--text-sm);
  font-weight: 600;
  transition: opacity 0.15s;
}

.btn-clear-filter:hover {
  opacity: 0.85;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .news-hero-card {
    grid-template-columns: 1fr;
  }
  .news-hero-card__cover-link {
    min-height: 240px;
  }
}

@media (max-width: 640px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
  .news-search-box {
    max-width: 100%;
  }
}
</style>
