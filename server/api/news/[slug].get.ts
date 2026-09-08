import { defineEventHandler, getRouterParam, createError } from 'h3'
import { getArticleBySlug, incrementArticleViews } from '../../utils/newsStorage'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug do artigo é obrigatório.',
    })
  }

  const article = await getArticleBySlug(slug)
  if (!article) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Artigo não encontrado ou não publicado.',
    })
  }

  // Incrementa contagem de visualizações de forma assíncrona
  incrementArticleViews(slug).catch((err) => console.error(err))

  return article
})
