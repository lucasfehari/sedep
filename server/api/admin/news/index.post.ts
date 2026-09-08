import { defineEventHandler, readBody, createError } from 'h3'
import { requireAdminAuth } from '../../../utils/auth'
import { createArticle } from '../../../utils/newsStorage'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const body = await readBody(event)

  if (!body || !body.title) {
    throw createError({
      statusCode: 400,
      statusMessage: 'O título do artigo é obrigatório.',
    })
  }

  const created = await createArticle(body)
  return created
})
