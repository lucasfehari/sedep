import { defineEventHandler, readBody, createError } from 'h3'
import { setAdminSession } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body || {}

  // Credenciais lidas de variáveis de ambiente — nunca hardcoded
  const VALID_EMAIL = process.env.ADMIN_EMAIL || 'admin@sedep.com.br'
  const VALID_PASSWORD = process.env.ADMIN_PASSWORD

  if (!VALID_PASSWORD) {
    console.error('[SEDEP Auth] ADMIN_PASSWORD não configurada nas variáveis de ambiente.')
    throw createError({
      statusCode: 503,
      statusMessage: 'Servidor não configurado corretamente. Contate o administrador.',
    })
  }

  const emailMatch = email?.trim().toLowerCase() === VALID_EMAIL.toLowerCase()
  const passwordMatch = password === VALID_PASSWORD

  if (emailMatch && passwordMatch) {
    setAdminSession(event)
    return {
      success: true,
      user: {
        email: VALID_EMAIL,
        name: 'Administrador SEDEP',
        role: 'Editor Chefe',
      },
    }
  }

  // Delay mínimo para evitar timing attacks
  await new Promise((r) => setTimeout(r, 300))

  throw createError({
    statusCode: 401,
    statusMessage: 'Credenciais inválidas. Verifique seu e-mail e senha.',
  })
})
