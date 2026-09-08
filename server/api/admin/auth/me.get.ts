import { defineEventHandler } from 'h3'
import { verifyAdminSession } from '../../../utils/auth'

export default defineEventHandler((event) => {
  const isAuth = verifyAdminSession(event)
  if (!isAuth) {
    return {
      authenticated: false,
      user: null,
    }
  }

  return {
    authenticated: true,
    user: {
      email: 'admin@sedep.com.br',
      name: 'Administrador SEDEP',
      role: 'Editor Chefe',
    },
  }
})
