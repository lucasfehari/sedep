<template>
  <div>
    <!-- Loading State -->
    <div v-if="pending" class="article-loading">
      <div class="article-skeleton-wrap container--narrow">
        <div class="skel skel--back" />
        <div class="skel skel--cat" />
        <div class="skel skel--title" />
        <div class="skel skel--title-sm" />
        <div class="skel skel--lead" />
        <div class="skel skel--author" />
        <div class="skel skel--cover" />
        <div class="skel skel--line" />
        <div class="skel skel--line" />
        <div class="skel skel--line skel--line-short" />
        <div class="skel skel--line" />
        <div class="skel skel--line skel--line-mid" />
      </div>
    </div>

    <!-- Article Content -->
    <article v-else-if="article" class="article-page">

      <!-- ===== HEADER ===== -->
      <header class="article-header">
        <div class="container--narrow">

          <NuxtLink to="/noticias" class="article-back">
            ← Todas as notícias
          </NuxtLink>

          <!-- Meta: categoria + data + leitura -->
          <div class="article-meta-bar">
            <span class="article-category-badge">{{ article.category }}</span>
            <span class="article-meta-dot">·</span>
            <time :datetime="article.publishedAt || article.date" class="article-date">
              {{ formatDate(article.publishedAt || article.date) }}
            </time>
            <span v-if="article.readingTime" class="article-meta-dot">·</span>
            <span v-if="article.readingTime" class="article-reading-time">
              {{ article.readingTime }} min de leitura
            </span>
          </div>

          <!-- Título -->
          <h1 class="article-title">{{ article.title }}</h1>

          <!-- Lead / Excerpt -->
          <p v-if="article.excerpt" class="article-lead">{{ article.excerpt }}</p>

          <!-- Autor -->
          <div v-if="article.author" class="article-author">
            <div class="article-author__avatar">
              <img
                v-if="article.author.avatar && !article.author.avatar.includes('sedep-branco')"
                :src="article.author.avatar"
                :alt="article.author.name"
              />
              <span v-else class="article-author__initials">
                {{ getInitials(article.author.name) }}
              </span>
            </div>
            <div class="article-author__info">
              <p class="article-author__name">{{ article.author.name }}</p>
              <p class="article-author__role">{{ article.author.role }}</p>
            </div>
          </div>

        </div>
      </header>

      <!-- ===== COVER IMAGE ===== -->
      <div v-if="article.coverImage" class="article-cover-wrapper">
        <div class="container--narrow">
          <figure class="article-cover-figure">
            <img
              :src="article.coverImage"
              :alt="article.title"
              class="article-cover-img"
            />
          </figure>
        </div>
      </div>

      <!-- ===== BODY ===== -->
      <div class="article-body">
        <div class="container--narrow prose" v-html="article.content" />
      </div>

      <!-- ===== TAGS ===== -->
      <div v-if="article.tags && article.tags.length > 0" class="article-tags-wrap">
        <div class="container--narrow">
          <div class="article-tags">
            <span class="article-tags__label">Tags:</span>
            <NuxtLink
              v-for="tag in article.tags"
              :key="tag"
              :to="`/noticias?q=${tag}`"
              class="article-tag-pill"
            >
              #{{ tag }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- ===== DIVIDER ===== -->
      <div class="container--narrow">
        <hr class="article-divider" />
      </div>

      <!-- ===== CTA FOOTER ===== -->
      <footer class="article-cta">
        <div class="container--narrow">
          <div class="article-cta__card">
            <div class="article-cta__content">
              <p class="article-cta__eyebrow">Gostou deste conteúdo?</p>
              <h2 class="article-cta__title">Explore as soluções da SEDEP</h2>
              <p class="article-cta__desc">
                Tecnologia jurídica de ponta para escritórios e departamentos jurídicos que buscam eficiência real.
              </p>
            </div>
            <div class="article-cta__actions">
              <BaseButton to="/solucoes" variant="primary">Conhecer Soluções</BaseButton>
              <BaseButton to="/noticias" variant="secondary">Ver mais notícias</BaseButton>
            </div>
          </div>
        </div>
      </footer>

    </article>

    <!-- Not Found -->
    <div v-else class="article-not-found">
      <div class="container">
        <div class="article-not-found__inner">
          <span class="article-not-found__icon">📄</span>
          <h1>Artigo não encontrado</h1>
          <p>O conteúdo que você está procurando pode ter sido movido ou excluído.</p>
          <NuxtLink to="/noticias" class="article-back-btn">← Voltar para todas as notícias</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'

const route = useRoute()
const slug = route.params.slug as string

definePageMeta({ layout: 'default' })

interface ArticleFull {
  id: string | number
  title: string
  slug: string
  category: string
  tags?: string[]
  publishedAt?: string
  date?: string
  excerpt?: string
  content: string
  coverImage?: string
  readingTime?: number
  author?: {
    name: string
    role: string
    avatar?: string
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    focusKeyword?: string
    canonicalUrl?: string
    robots?: string
    ogImage?: string
    schemaType?: string
  }
}

const { data: article, pending } = await useAsyncData<ArticleFull | null>(
  `article-${slug}`,
  async () => {
    try {
      return await $fetch<ArticleFull>(`/api/news/${slug}`)
    } catch {
      return null
    }
  }
)

function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function getInitials(name?: string): string {
  if (!name) return 'SE'
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

// SEO & Structured Data
watchEffect(() => {
  if (article.value) {
    const title = article.value.seo?.metaTitle || `${article.value.title} | SEDEP`
    const description =
      article.value.seo?.metaDescription ||
      article.value.excerpt ||
      article.value.content.replace(/<[^>]*>/g, '').slice(0, 160)
    const image =
      article.value.seo?.ogImage ||
      article.value.coverImage ||
      'https://www.sedep.com.br/sedep-branco.png'
    const canonical =
      article.value.seo?.canonicalUrl ||
      `https://www.sedep.com.br/noticias/${article.value.slug}`
    const robots = article.value.seo?.robots || 'index, follow'

    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogImage: image,
      ogType: 'article',
      ogUrl: canonical,
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: image,
      robots,
    })

    useHead({
      link: [{ rel: 'canonical', href: canonical }],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': article.value.seo?.schemaType || 'NewsArticle',
            headline: article.value.title,
            description,
            image: image ? [image] : [],
            datePublished: article.value.publishedAt || article.value.date,
            dateModified: article.value.publishedAt || article.value.date,
            author: {
              '@type': 'Organization',
              name: article.value.author?.name || 'SEDEP',
            },
            publisher: {
              '@type': 'Organization',
              name: 'SEDEP',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.sedep.com.br/sedep-branco.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonical,
            },
          }),
        },
      ],
    })
  }
})
</script>

<style scoped>
/* ===== LOADING ===== */
.article-loading {
  padding: clamp(4rem, 8vw, 7rem) 0 4rem;
}

.article-skeleton-wrap {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skel {
  background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 6px;
}

.skel--back   { height: 14px; width: 130px; }
.skel--cat    { height: 12px; width: 90px; margin-top: 0.5rem; }
.skel--title  { height: 44px; width: 90%; margin-top: 0.75rem; }
.skel--title-sm { height: 40px; width: 70%; }
.skel--lead   { height: 18px; width: 95%; margin-top: 0.5rem; }
.skel--author { height: 40px; width: 200px; border-radius: 20px; margin-top: 0.5rem; }
.skel--cover  { height: 380px; border-radius: 16px; margin-top: 1.5rem; }
.skel--line   { height: 14px; width: 100%; }
.skel--line-short { width: 55%; }
.skel--line-mid   { width: 80%; }

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ===== HEADER ===== */
.article-header {
  padding-top: clamp(4rem, 8vw, 7rem);
  padding-bottom: 2.5rem;
  background: var(--color-surface-alt);
  border-bottom: 1px solid var(--color-border);
}

.article-back {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-faz);
  text-decoration: none;
  margin-bottom: 2rem;
  transition: opacity 0.15s ease;
}

.article-back:hover {
  opacity: 0.75;
}

.article-meta-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.article-category-badge {
  display: inline-block;
  padding: 0.2rem 0.7rem;
  background: var(--color-primary-light);
  color: var(--color-faz);
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-radius: 20px;
}

.article-meta-dot {
  color: var(--color-border-hover);
  font-size: var(--text-xs);
}

.article-date,
.article-reading-time {
  font-size: var(--text-xs);
  color: var(--color-ink-light);
  font-weight: 500;
}

.article-title {
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  color: var(--color-ink);
  line-height: 1.2;
  margin-bottom: 1.25rem;
  letter-spacing: -0.025em;
}

.article-lead {
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: var(--color-ink-medium);
  line-height: 1.65;
  margin-bottom: 1.75rem;
  max-width: 68ch;
}

/* Autor */
.article-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.article-author__avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-faz) 0%, var(--color-sedep-navy) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid var(--color-border);
}

.article-author__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-author__initials {
  font-size: 0.8rem;
  font-weight: 800;
  color: #FFFFFF;
  letter-spacing: -0.02em;
}

.article-author__info {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.article-author__name {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-ink);
  margin: 0;
}

.article-author__role {
  font-size: var(--text-xs);
  color: var(--color-ink-light);
  margin: 0;
}

/* ===== COVER ===== */
.article-cover-wrapper {
  padding: 2.5rem 0;
  background: var(--color-surface-alt);
  border-bottom: 1px solid var(--color-border);
}

.article-cover-figure {
  margin: 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 40px -12px rgba(15, 23, 42, 0.18);
}

.article-cover-img {
  width: 100%;
  max-height: 520px;
  object-fit: cover;
  display: block;
}

/* ===== BODY / PROSE ===== */
.article-body {
  padding: 3.5rem 0 2rem;
}

/* Estilos de prose para o HTML vindo do CMS */
.article-body :deep(.prose),
.prose {
  color: var(--color-ink-medium);
  font-size: 1.0625rem;
  line-height: 1.8;
}

.article-body :deep(h1),
.article-body :deep(h2),
.article-body :deep(h3),
.article-body :deep(h4) {
  color: var(--color-ink);
  line-height: 1.25;
  letter-spacing: -0.02em;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.article-body :deep(h2) { font-size: clamp(1.4rem, 2.5vw, 1.875rem); }
.article-body :deep(h3) { font-size: clamp(1.1rem, 2vw, 1.375rem); }
.article-body :deep(h4) { font-size: 1.125rem; }

.article-body :deep(p) {
  margin-bottom: 1.5rem;
  color: var(--color-ink-medium);
  font-size: 1.0625rem;
  line-height: 1.8;
}

.article-body :deep(a) {
  color: var(--color-faz);
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 500;
}

.article-body :deep(a:hover) {
  color: var(--color-primary-hover);
}

.article-body :deep(ul),
.article-body :deep(ol) {
  padding-left: 1.75rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.article-body :deep(li) {
  color: var(--color-ink-medium);
  line-height: 1.7;
  font-size: 1.0625rem;
}

.article-body :deep(blockquote) {
  border-left: 4px solid var(--color-faz);
  padding: 1rem 1.5rem;
  margin: 2rem 0;
  background: var(--color-primary-subtle);
  border-radius: 0 12px 12px 0;
  font-style: italic;
  color: var(--color-ink);
}

.article-body :deep(blockquote p) {
  margin-bottom: 0;
  font-size: 1.1rem;
}

.article-body :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  color: var(--color-ink);
}

.article-body :deep(pre) {
  background: var(--color-ink);
  border-radius: 12px;
  padding: 1.5rem;
  overflow-x: auto;
  margin: 2rem 0;
}

.article-body :deep(pre code) {
  background: transparent;
  border: none;
  color: #E2E8F0;
  font-size: 0.875rem;
  padding: 0;
}

.article-body :deep(img) {
  width: 100%;
  border-radius: 12px;
  margin: 1.5rem 0;
  box-shadow: 0 8px 24px -8px rgba(0,0,0,0.12);
}

.article-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 2.5rem 0;
}

.article-body :deep(strong) {
  color: var(--color-ink);
  font-weight: 700;
}

.article-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.9rem;
}

.article-body :deep(th) {
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 700;
  color: var(--color-ink);
}

.article-body :deep(td) {
  border: 1px solid var(--color-border);
  padding: 0.65rem 1rem;
  color: var(--color-ink-medium);
}

/* ===== TAGS ===== */
.article-tags-wrap {
  padding-bottom: 2.5rem;
}

.article-tags {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.article-tags__label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-ink-light);
}

.article-tag-pill {
  display: inline-block;
  padding: 0.25rem 0.7rem;
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: var(--text-xs);
  color: var(--color-ink-light);
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s;
}

.article-tag-pill:hover {
  border-color: var(--color-faz);
  color: var(--color-faz);
}

/* ===== DIVIDER ===== */
.article-divider {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 0 0 3rem 0;
}

/* ===== CTA FOOTER ===== */
.article-cta {
  padding-bottom: clamp(3rem, 6vw, 5rem);
}

.article-cta__card {
  background: linear-gradient(135deg, var(--color-sedep-navy) 0%, #0F2D7A 100%);
  border-radius: 20px;
  padding: clamp(2rem, 4vw, 3rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.article-cta__content {
  flex: 1;
  min-width: 280px;
}

.article-cta__eyebrow {
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 0.5rem;
}

.article-cta__title {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  color: #FFFFFF;
  margin-bottom: 0.65rem;
  line-height: 1.25;
}

.article-cta__desc {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.6;
  max-width: 50ch;
  margin: 0;
}

.article-cta__actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex-shrink: 0;
}

/* ===== NOT FOUND ===== */
.article-not-found {
  padding: 8rem 0;
}

.article-not-found__inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.article-not-found__icon {
  font-size: 3rem;
  display: block;
}

.article-not-found h1 {
  font-size: var(--text-2xl);
  color: var(--color-ink);
}

.article-not-found p {
  color: var(--color-ink-light);
}

.article-back-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 1.5rem;
  background: var(--color-faz);
  color: #FFFFFF;
  border-radius: 8px;
  font-weight: 600;
  font-size: var(--text-sm);
  text-decoration: none;
  transition: opacity 0.15s;
  margin-top: 0.5rem;
}

.article-back-btn:hover {
  opacity: 0.85;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .article-cta__card {
    flex-direction: column;
    align-items: flex-start;
  }

  .article-cta__actions {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
