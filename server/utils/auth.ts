import type { H3Event } from 'h3'
import { getCookie, setCookie, deleteCookie, createError } from 'h3'

const ADMIN_TOKEN_COOKIE = 'sedep_admin_session'

// Token de sessão vem de env var — nunca hardcoded em código
function getSessionToken(): string {
  const token = process.env.ADMIN_SESSION_TOKEN
  if (!token) {
    // Fallback seguro apenas em desenvolvimento local
    if (process.env.NODE_ENV !== 'production') {
      return 'sedep-studio-secure-token-2026-auth'
    }
    throw new Error('[SEDEP Auth] ADMIN_SESSION_TOKEN não definida. Configure a variável de ambiente.')
  }
  return token
}

export function verifyAdminSession(event: H3Event): boolean {
  try {
    const token = getCookie(event, ADMIN_TOKEN_COOKIE)
    return token === getSessionToken()
  } catch {
    return false
  }
}

export function requireAdminAuth(event: H3Event) {
  if (!verifyAdminSession(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Acesso restrito. Faça login no Painel Administrativo.',
    })
  }
}

export function setAdminSession(event: H3Event) {
  setCookie(event, ADMIN_TOKEN_COOKIE, getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: '/',
  })
}

export function clearAdminSession(event: H3Event) {
  deleteCookie(event, ADMIN_TOKEN_COOKIE, {
    path: '/',
  })
}
