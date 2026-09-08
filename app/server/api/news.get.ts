// Proxy seguro para buscar notícias do WordPress REST API.
// Evita CORS no cliente e permite cache no servidor.

import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  const page = Number(query.page) || 1
  const perPage = Math.min(Number(query.per_page) || 10, 20) // máximo 20

  const wpApiUrl = config.public.wpApiUrl || 'https://www.sedep.com.br/wp-json/wp/v2'

  try {
    const posts = await $fetch<any[]>(`${wpApiUrl}/posts`, {
      params: {
        per_page: perPage,
        page,
        _fields: 'id,title,slug,date,excerpt,categories',
        status: 'publish',
        orderby: 'date',
        order: 'desc',
      },
    })

    // Normaliza para formato limpo — desacopla da estrutura do WP
    return posts.map((post: any) => ({
      id: post.id,
      title: post.title?.rendered ? stripHtml(post.title.rendered) : '',
      slug: post.slug || '',
      date: post.date || '',
      excerpt: post.excerpt?.rendered ? truncate(stripHtml(post.excerpt.rendered), 200) : '',
    }))
  } catch (error) {
    // Retorna array vazio graciosamente — o componente trata o fallback
    console.warn('[SEDEP News API] Não foi possível buscar notícias:', error)
    return []
  }
})

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text
  return text.slice(0, maxLen).trim() + '…'
}
