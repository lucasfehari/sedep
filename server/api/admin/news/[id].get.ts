import { defineEventHandler, getRouterParam, createError } from 'h3'
import { requireAdminAuth } from '../../../utils/auth'
import { getArticleById } from '../../../utils/newsStorage'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID inválido.',
    })
  }

  const article = await getArticleById(id)
  if (!article) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Artigo não encontrado.',
    })
  }

  return article
})
