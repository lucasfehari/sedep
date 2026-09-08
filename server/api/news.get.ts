import { defineEventHandler, getQuery } from 'h3'
import { getPublishedArticles } from '../utils/newsStorage'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const page = Number(query.page) || 1
  const perPage = Math.min(Number(query.per_page) || 12, 50)
  const category = query.category ? String(query.category) : undefined
  const q = query.q ? String(query.q) : undefined

  try {
    const result = await getPublishedArticles({
      page,
      perPage,
      category,
      query: q,
    })

    return result.articles
  } catch (error) {
    console.error('[SEDEP News API] Erro ao listar notícias:', error)
    return []
  }
})
