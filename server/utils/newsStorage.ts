import { promises as fs } from 'fs'
import { join } from 'path'

export interface ArticleSEO {
  metaTitle: string
  metaDescription: string
  focusKeyword: string
  canonicalUrl?: string
  robots: string
  ogImage?: string
  schemaType: 'NewsArticle' | 'BlogPosting' | 'TechArticle'
}

export interface ArticleAuthor {
  name: string
  role: string
  avatar?: string
}

export interface Article {
  id: string
  title: string
  slug: string
  category: string
  tags: string[]
  excerpt: string
  content: string
  coverImage: string
  author: ArticleAuthor
  status: 'published' | 'draft'
  publishedAt: string
  updatedAt: string
  readingTime: number
  views: number
  seo: ArticleSEO
}

const DATA_FILE_PATH = join(process.cwd(), 'server', 'data', 'news.json')

let memoryCache: Article[] | null = null

export async function readArticles(): Promise<Article[]> {
  if (memoryCache) {
    return memoryCache
  }
  try {
    const raw = await fs.readFile(DATA_FILE_PATH, 'utf-8')
    const parsed = JSON.parse(raw) as Article[]
    memoryCache = parsed
    return parsed
  } catch (error) {
    console.error('[SEDEP CMS] Erro ao carregar arquivo de notícias:', error)
    return []
  }
}

export async function saveArticles(articles: Article[]): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(articles, null, 2), 'utf-8')
    memoryCache = articles // Atualiza cache APÓS escrita bem-sucedida
  } catch (error) {
    memoryCache = null // Invalida cache se a escrita falhar
    console.error('[SEDEP CMS] Erro ao salvar arquivo de notícias:', error)
    throw error
  }
}

export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const plainText = text.replace(/<[^>]*>/g, ' ')
  const wordCount = plainText.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

export async function getPublishedArticles(params?: { category?: string; query?: string; page?: number; perPage?: number }) {
  const all = await readArticles()
  let filtered = all.filter((a) => a.status === 'published')

  if (params?.category) {
    filtered = filtered.filter((a) => a.category.toLowerCase() === params.category!.toLowerCase())
  }

  if (params?.query) {
    const q = params.query.toLowerCase()
    filtered = filtered.filter((a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q)))
  }

  filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  const total = filtered.length
  const page = params?.page || 1
  const perPage = params?.perPage || 12
  const startIndex = (page - 1) * perPage
  const paginated = filtered.slice(startIndex, startIndex + perPage)

  return {
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
    articles: paginated,
  }
}

export async function getArticleBySlug(slug: string, includeDraft = false): Promise<Article | null> {
  const all = await readArticles()
  const found = all.find((a) => a.slug === slug)
  if (!found) return null
  if (!includeDraft && found.status !== 'published') return null
  return found
}

export async function getArticleById(id: string): Promise<Article | null> {
  const all = await readArticles()
  return all.find((a) => a.id === id) || null
}

export async function createArticle(payload: Partial<Article>): Promise<Article> {
  const all = await readArticles()
  const id = `art-${Date.now()}`
  const title = (payload.title || 'Sem título').trim()
  let slug = payload.slug ? generateSlug(payload.slug) : generateSlug(title)

  // Previne colisão de slug
  let counter = 1
  const baseSlug = slug
  while (all.some((a) => a.slug === slug)) {
    slug = `${baseSlug}-${counter++}`
  }

  const now = new Date().toISOString()
  const content = payload.content || ''
  const readingTime = calculateReadingTime(content)

  const newArticle: Article = {
    id,
    title,
    slug,
    category: payload.category || 'Institucional',
    tags: payload.tags || [],
    excerpt: payload.excerpt || '',
    content,
    coverImage: payload.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    author: payload.author || {
      name: 'Redação SEDEP',
      role: 'Editorial',
      avatar: '/sedep-branco.png',
    },
    status: payload.status || 'published',
    publishedAt: payload.publishedAt || now,
    updatedAt: now,
    readingTime,
    views: 0,
    seo: {
      metaTitle: payload.seo?.metaTitle || `${title} | SEDEP`,
      metaDescription: payload.seo?.metaDescription || payload.excerpt || title,
      focusKeyword: payload.seo?.focusKeyword || '',
      canonicalUrl: payload.seo?.canonicalUrl || `https://www.sedep.com.br/noticias/${slug}`,
      robots: payload.seo?.robots || 'index, follow',
      ogImage: payload.seo?.ogImage || payload.coverImage || '',
      schemaType: payload.seo?.schemaType || 'NewsArticle',
    },
  }

  all.unshift(newArticle)
  await saveArticles(all)
  return newArticle
}

export async function updateArticle(id: string, payload: Partial<Article>): Promise<Article | null> {
  const all = await readArticles()
  const index = all.findIndex((a) => a.id === id)
  if (index === -1) return null

  const existing = all[index]
  const title = (payload.title !== undefined ? payload.title : existing.title).trim()
  let slug = payload.slug ? generateSlug(payload.slug) : existing.slug

  // Previne colisão com outros artigos
  if (slug !== existing.slug) {
    let counter = 1
    const baseSlug = slug
    while (all.some((a) => a.id !== id && a.slug === slug)) {
      slug = `${baseSlug}-${counter++}`
    }
  }

  const content = payload.content !== undefined ? payload.content : existing.content
  const readingTime = calculateReadingTime(content)

  const updated: Article = {
    ...existing,
    ...payload,
    id: existing.id,
    title,
    slug,
    content,
    readingTime,
    updatedAt: new Date().toISOString(),
    seo: {
      ...existing.seo,
      ...(payload.seo || {}),
      metaTitle: payload.seo?.metaTitle || existing.seo.metaTitle || `${title} | SEDEP`,
      metaDescription: payload.seo?.metaDescription || payload.excerpt || existing.seo.metaDescription,
      canonicalUrl: payload.seo?.canonicalUrl || existing.seo.canonicalUrl || `https://www.sedep.com.br/noticias/${slug}`,
    },
  }

  all[index] = updated
  await saveArticles(all)
  return updated
}

export async function deleteArticle(id: string): Promise<boolean> {
  const all = await readArticles()
  const filtered = all.filter((a) => a.id !== id)
  if (filtered.length === all.length) return false
  await saveArticles(filtered)
  return true
}

export async function incrementArticleViews(slug: string): Promise<void> {
  const all = await readArticles()
  const target = all.find((a) => a.slug === slug)
  if (target) {
    target.views = (target.views || 0) + 1
    await saveArticles(all)
  }
}
