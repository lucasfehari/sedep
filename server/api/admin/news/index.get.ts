import { defineEventHandler } from 'h3'
import { requireAdminAuth } from '../../../utils/auth'
import { readArticles } from '../../../utils/newsStorage'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const articles = await readArticles()
  return articles
})
