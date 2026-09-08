export default defineNuxtRouteMiddleware(async (to) => {
  // Se for a página de login, permite acesso livre
  if (to.path === '/admin/login') {
    return
  }

  // Verifica sessão no servidor ou cliente
  try {
    const data = await $fetch<{ authenticated: boolean }>('/api/admin/auth/me')
    if (!data || !data.authenticated) {
      return navigateTo('/admin/login')
    }
  } catch (error) {
    return navigateTo('/admin/login')
  }
})
