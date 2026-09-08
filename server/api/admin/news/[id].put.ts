import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { requireAdminAuth } from '../../../utils/auth'
import { updateArticle } from '../../../utils/newsStorage'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID inválido.',
    })
  }

  const body = await readBody(event)
  const updated = await updateArticle(id, body)

  if (!updated) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Artigo não encontrado para atualização.',
    })
  }

  return updated
})
