<template>
  <div class="news-page">
    <!-- Header Hero -->
    <section class="news-hero" aria-labelledby="noticias-heading">
      <div class="container">
        <p class="section-label">SEDEP Notícias</p>
        <h1 id="noticias-heading" class="news-hero__title">
          Atualizações diárias com inteligência das principais notícias dos tribunais de todo o Brasil
        </h1>
        <p class="news-hero__sub lead">
          Notícias, artigos técnicos, tendências de decisões jurídicas atualizadas diariamente de todo o Brasil.
        </p>

        <!-- Painel Estruturado de Filtros -->
        <div class="news-filter-panel" role="search" aria-label="Filtros de notícias">
          <!-- Box 1: Jurisdições & Tribunais -->
          <div class="news-filter-box">
            <!-- Tribunais Superiores e Federais -->
            <div class="news-filter-group">
              <div class="news-filter-group__header">
                <span class="news-filter-group__icon">🏛️</span>
                <span class="news-filter-group__title">Tribunais Superiores e Federais</span>
              </div>
              <div class="news-pills-list">
                <button
                  v-for="court in courtList"
                  :key="court"
                  type="button"
                  class="category-filter-btn"
                  :class="{ 'category-filter-btn--active': selectedCourt === court }"
                  @click="toggleCourt(court)"
                >
                  {{ court }}
                </button>
              </div>
            </div>

            <div class="news-filter-box__divider" />

            <!-- Estados (UFs) -->
            <div class="news-filter-group">
              <div class="news-filter-group__header">
                <span class="news-filter-group__icon">📍</span>
                <span class="news-filter-group__title">Estados (UFs)</span>
              </div>
              <div class="news-pills-list">
                <button
                  type="button"
                  class="category-filter-btn"
                  :class="{ 'category-filter-btn--active': selectedState === '' }"
                  @click="selectedState = ''"
                >
                  Todos
                </button>
                <button
                  v-for="uf in stateList"
                  :key="uf"
                  type="button"
                  class="category-filter-btn"
                  :class="{ 'category-filter-btn--active': selectedState === uf }"
                  @click="toggleState(uf)"
                >
                  {{ uf }}
                </button>
              </div>
            </div>
          </div>

          <!-- Box 2: Temas Jurídicos -->
          <div class="news-filter-box news-filter-box--themes">
            <div class="news-filter-group">
              <div class="news-filter-group__header">
                <span class="news-filter-group__icon">⚖️</span>
                <span class="news-filter-group__title">Temas & Áreas do Direito</span>
              </div>
              <div class="news-pills-list">
                <!-- Somente Importantes (Destaque) -->
                <button
                  type="button"
                  class="category-filter-btn category-filter-btn--important"
                  :class="{ 'category-filter-btn--important-active': onlyImportant }"
                  @click="onlyImportant = !onlyImportant"
                >
                  ⭐ Somente importantes
                </button>

                <button
                  v-for="theme in allThemes"
                  :key="theme"
                  type="button"
                  class="category-filter-btn"
                  :class="{ 'category-filter-btn--active': selectedTheme === theme }"
                  @click="toggleTheme(theme)"
                >
                  {{ theme }}
                </button>
              </div>
            </div>
          </div>

          <!-- Barra de Busca Rápida + Resumo de Filtros Ativos -->
          <div class="news-filter-bar">
            <!-- Busca rápida -->
            <div class="news-search-box">
              <span class="news-search-box__icon">🔍</span>
              <input
                v-model="searchQuery"
                type="search"
                placeholder="Buscar notícias por palavra-chave..."
                class="news-search-box__input"
                aria-label="Buscar notícias"
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

            <!-- Chips de filtros ativos -->
            <div v-if="hasActiveFilters" class="news-active-chips">
              <span class="news-active-chips__label">Ativos:</span>
              <button
                v-if="selectedCourt"
                class="news-chip"
                @click="selectedCourt = ''"
                title="Remover tribunal"
              >
                🏛️ {{ selectedCourt }} ✕
              </button>
              <button
                v-if="selectedState"
                class="news-chip"
                @click="selectedState = ''"
                title="Remover estado"
              >
                📍 {{ selectedState }} ✕
              </button>
              <button
                v-if="selectedTheme"
                class="news-chip"
                @click="selectedTheme = ''"
                title="Remover tema"
              >
                ⚖️ {{ selectedTheme }} ✕
              </button>
              <button
                v-if="onlyImportant"
                class="news-chip news-chip--important"
                @click="onlyImportant = false"
                title="Remover somente importantes"
              >
                ⭐ Importantes ✕
              </button>
              <button
                v-if="searchQuery"
                class="news-chip"
                @click="searchQuery = ''"
                title="Limpar busca"
              >
                "{{ searchQuery }}" ✕
              </button>
              <button
                type="button"
                class="news-chip news-chip--clear-all"
                @click="clearFilters"
              >
                Limpar todos
              </button>
            </div>
          </div>
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
            v-if="!hasActiveFilters && heroArticle"
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
                Ler notícia completa →
              </NuxtLink>
            </div>
          </article>

          <!-- Grid dos demais artigos -->
          <div
            class="news-grid"
            :class="{
              'news-grid--with-hero':
                !hasActiveFilters && heroArticle,
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
                    Ler notícia →
                  </NuxtLink>
                </div>
              </div>
            </article>
          </div>

          <!-- Sem mais resultados -->
          <p
            v-if="
              filteredArticles.length === 0 && hasActiveFilters
            "
            class="news-no-results"
          >
            Nenhuma notícia encontrada com os filtros selecionados.
          </p>
        </template>

        <!-- Fallback Sem Artigos -->
        <div v-else class="news-empty">
          <p>
            Nenhuma notícia encontrada com os filtros selecionados.
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
  title: "SEDEP Notícias | Atualizações dos Tribunais do Brasil",
  description:
    "Atualizações diárias com inteligência das principais notícias dos tribunais de todo o Brasil. Notícias, artigos técnicos e tendências de decisões jurídicas.",
  ogTitle: "SEDEP Notícias — Tribunais de Todo o Brasil",
  ogDescription:
    "Atualizações diárias com inteligência das principais notícias dos tribunais de todo o Brasil.",
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

// Listas de filtros solicitadas
const courtList = [
  "STF",
  "STJ",
  "TST",
  "CNJ",
  "TRFs",
  "TRF1",
  "TRF2",
  "TRF3",
  "TRF4",
  "TRF5",
  "TRF6",
];

const stateList = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA",
  "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN",
  "RO", "RR", "RS", "SC", "SE", "SP", "TO",
];

const baseThemes = [
  "Administrativo",
  "Agrário",
  "Ambiental",
  "Civil",
  "Comercial ou Empresarial",
  "Consumidor",
  "Direito",
  "Família",
  "LGPD",
  "Mediação, conciliação e arbitragem",
  "Penal ou Criminal",
  "Previdenciário",
  "Tecnologia da Informação",
  "Trabalhista",
  "Tributário",
  "União Estável",
];

const selectedCourt = ref("");
const selectedState = ref("");
const selectedTheme = ref("");
const onlyImportant = ref(false);
const searchQuery = ref("");

// Categorias dinâmicas extraídas dos artigos retornados pela API
const dynamicCategories = computed(() => {
  const cats = new Set(articles.value.map((a) => a.category).filter(Boolean));
  return Array.from(cats);
});

const allThemes = computed(() => {
  const set = new Set(baseThemes);
  for (const cat of dynamicCategories.value) {
    if (!stateList.includes(cat) && !courtList.includes(cat) && cat !== "Importante") {
      set.add(cat);
    }
  }
  return Array.from(set);
});

const hasActiveFilters = computed(() => {
  return !!(
    selectedCourt.value ||
    selectedState.value ||
    selectedTheme.value ||
    onlyImportant.value ||
    searchQuery.value.trim()
  );
});

function toggleCourt(court: string) {
  selectedCourt.value = selectedCourt.value === court ? "" : court;
}

function toggleState(uf: string) {
  selectedState.value = selectedState.value === uf ? "" : uf;
}

function toggleTheme(theme: string) {
  selectedTheme.value = selectedTheme.value === theme ? "" : theme;
}

function clearFilters() {
  selectedCourt.value = "";
  selectedState.value = "";
  selectedTheme.value = "";
  onlyImportant.value = false;
  searchQuery.value = "";
}

const filteredArticles = computed(() => {
  let result = articles.value;

  // Filtro Somente Importantes
  if (onlyImportant.value) {
    result = result.filter((a) => {
      const hasImportantTag = a.tags?.some((t) =>
        t.toLowerCase().includes("importante") ||
        t.toLowerCase().includes("destaque"),
      );
      const isImportantCat = a.category?.toLowerCase() === "importante";
      return hasImportantTag || isImportantCat;
    });
  }

  // Filtro por Tribunal
  if (selectedCourt.value) {
    const c = selectedCourt.value.toLowerCase();
    result = result.filter((a) => {
      if (c === "trfs") {
        return (
          a.tags?.some((t) => t.toLowerCase().startsWith("trf")) ||
          a.category?.toLowerCase().startsWith("trf") ||
          a.title.toLowerCase().includes("trf") ||
          a.excerpt.toLowerCase().includes("trf")
        );
      }
      return (
        a.category?.toLowerCase() === c ||
        a.tags?.some((t) => t.toLowerCase() === c) ||
        a.title.toLowerCase().includes(c) ||
        a.excerpt.toLowerCase().includes(c)
      );
    });
  }

  // Filtro por Estado
  if (selectedState.value) {
    const s = selectedState.value.toLowerCase();
    result = result.filter((a) => {
      const tagMatch = a.tags?.some((t) => t.toLowerCase() === s);
      const catMatch = a.category?.toLowerCase() === s;
      const textMatch =
        new RegExp(`\\b${s}\\b`, "i").test(a.title) ||
        new RegExp(`\\b${s}\\b`, "i").test(a.excerpt);
      return tagMatch || catMatch || textMatch;
    });
  }

  // Filtro por Tema
  if (selectedTheme.value) {
    const th = selectedTheme.value.toLowerCase();
    result = result.filter((a) => {
      const catMatch =
        a.category?.toLowerCase().includes(th) ||
        th.includes(a.category?.toLowerCase());
      const tagMatch = a.tags?.some(
        (t) =>
          t.toLowerCase().includes(th) || th.includes(t.toLowerCase()),
      );
      const textMatch =
        a.title.toLowerCase().includes(th) ||
        a.excerpt.toLowerCase().includes(th);
      return catMatch || tagMatch || textMatch;
    });
  }

  // Busca rápida de texto
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
  // Se há hero card e não há filtros específicos, remove o primeiro da grade
  if (!hasActiveFilters.value && heroArticle.value) {
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

/* ===== PAINEL DE FILTROS ESTRUTURADO ===== */
.news-filter-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  max-width: 100%;
}

.news-filter-box {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(24, 72, 184, 0.16);
  border-radius: 14px;
  padding: 1rem 1.25rem;
  box-shadow: 0 4px 16px rgba(24, 72, 184, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.news-filter-box__divider {
  height: 1px;
  background: rgba(24, 72, 184, 0.1);
  margin: 0.15rem 0;
}

.news-filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.news-filter-group__header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-faz, #1848b8);
}

.news-filter-group__icon {
  font-size: 0.85rem;
}

.news-pills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.category-filter-btn {
  background-color: rgba(24, 72, 184, 0.08);
  color: var(--color-faz, #1848b8);
  border: 1px solid rgba(24, 72, 184, 0.18);
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full, 9999px);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.category-filter-btn:hover {
  background-color: rgba(24, 72, 184, 0.16);
  border-color: var(--color-faz);
  transform: translateY(-1px);
}

.category-filter-btn--active {
  background-color: var(--color-faz, #1848b8) !important;
  color: #ffffff !important;
  font-weight: 700;
  border-color: var(--color-faz) !important;
  box-shadow: 0 2px 8px rgba(24, 72, 184, 0.35);
}

/* Destaque para Somente Importantes */
.category-filter-btn--important {
  background-color: rgba(245, 158, 11, 0.12);
  color: #b45309;
  border-color: rgba(245, 158, 11, 0.35);
  font-weight: 600;
}

.category-filter-btn--important:hover {
  background-color: rgba(245, 158, 11, 0.22);
  border-color: #d97706;
  color: #92400e;
}

.category-filter-btn--important-active {
  background-color: #d97706 !important;
  color: #ffffff !important;
  border-color: #d97706 !important;
  box-shadow: 0 2px 8px rgba(217, 119, 6, 0.4);
}

/* ===== BARRA INFERIOR DE FILTROS & BUSCA ===== */
.news-filter-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.news-active-chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
}

.news-active-chips__label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-ink-muted, #64748b);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.news-chip {
  background: rgba(24, 72, 184, 0.1);
  color: var(--color-faz, #1848b8);
  border: 1px solid rgba(24, 72, 184, 0.25);
  border-radius: 9999px;
  padding: 0.25rem 0.65rem;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.news-chip:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  border-color: #f87171;
}

.news-chip--important {
  background: rgba(245, 158, 11, 0.15);
  color: #b45309;
  border-color: rgba(245, 158, 11, 0.35);
}

.news-chip--clear-all {
  background: #fee2e2;
  color: #b91c1c;
  border-color: #fca5a5;
}

.news-chip--clear-all:hover {
  background: #fecaca;
}

/* ===== SEARCH ===== */
.news-search-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(24, 72, 184, 0.22);
  border-radius: 10px;
  padding: 0.55rem 0.9rem;
  min-width: 280px;
  flex: 1;
  max-width: 480px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.news-search-box:focus-within {
  background: #ffffff;
  border-color: var(--color-faz);
  box-shadow: 0 0 0 3px rgba(24, 72, 184, 0.15);
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
