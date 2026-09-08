<template>
  <div class="admin-shell" :class="{ 'admin-shell--sidebar-open': sidebarOpen }">
    <!-- Overlay mobile -->
    <div
      v-if="sidebarOpen"
      class="admin-sidebar-overlay"
      @click="sidebarOpen = false"
      aria-hidden="true"
    />

    <!-- Sidebar -->
    <aside class="admin-sidebar" :class="{ 'admin-sidebar--open': sidebarOpen }">
      <div class="admin-sidebar__header">
        <NuxtLink to="/admin" class="admin-brand" @click="sidebarOpen = false">
          <img src="/sedep-branco.png" alt="SEDEP" class="admin-brand__logo" width="100" height="28" />
          <span class="admin-brand__badge">Studio CMS</span>
        </NuxtLink>
        <button class="admin-sidebar__close" @click="sidebarOpen = false" aria-label="Fechar menu">
          ✕
        </button>
      </div>

      <nav class="admin-nav" aria-label="Navegação do Painel">
        <div class="admin-nav__group">
          <p class="admin-nav__label">Visão Geral</p>
          <NuxtLink
            to="/admin"
            class="admin-nav__link"
            :class="{ 'admin-nav__link--active': route.path === '/admin' }"
            @click="sidebarOpen = false"
          >
            <span class="admin-nav__icon">⚡</span>
            <span>Dashboard</span>
          </NuxtLink>
        </div>

        <div class="admin-nav__group">
          <p class="admin-nav__label">Gestão Editorial</p>
          <NuxtLink
            to="/admin/noticias"
            class="admin-nav__link"
            :class="{ 'admin-nav__link--active': isNoticiasRoute }"
            @click="sidebarOpen = false"
          >
            <span class="admin-nav__icon">📰</span>
            <span>Todas as Notícias</span>
            <span v-if="articleCount > 0" class="admin-nav__count">{{ articleCount }}</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/noticias/novo"
            class="admin-nav__link"
            :class="{ 'admin-nav__link--active': route.path === '/admin/noticias/novo' }"
            @click="sidebarOpen = false"
          >
            <span class="admin-nav__icon">✨</span>
            <span>Novo Artigo</span>
          </NuxtLink>
        </div>

        <div class="admin-nav__group">
          <p class="admin-nav__label">Front-end</p>
          <a href="/noticias" target="_blank" class="admin-nav__link admin-nav__link--external">
            <span class="admin-nav__icon">📄</span>
            <span>Página Pública</span>
            <span class="admin-nav__ext-icon">↗</span>
          </a>
          <a href="/" target="_blank" class="admin-nav__link admin-nav__link--external">
            <span class="admin-nav__icon">🌐</span>
            <span>Site Principal</span>
            <span class="admin-nav__ext-icon">↗</span>
          </a>
        </div>
      </nav>

      <div class="admin-sidebar__footer">
        <div class="admin-user-card">
          <div class="admin-user-card__avatar">{{ userInitials }}</div>
          <div class="admin-user-card__info">
            <p class="admin-user-card__name">{{ userName }}</p>
            <p class="admin-user-card__role">{{ userRole }}</p>
          </div>
        </div>
        <button @click="handleLogout" class="admin-logout-btn" title="Encerrar Sessão">
          <span>Sair</span>
          <span class="admin-logout-btn__icon">⏻</span>
        </button>
      </div>
    </aside>

    <!-- Área Principal -->
    <div class="admin-main">
      <header class="admin-topbar">
        <div class="admin-topbar__left">
          <button class="admin-hamburger" @click="sidebarOpen = !sidebarOpen" aria-label="Abrir menu">
            <span /><span /><span />
          </button>
          <NuxtLink to="/admin" class="admin-topbar__breadcrumb">SEDEP Studio</NuxtLink>
          <span class="admin-topbar__sep">/</span>
          <span class="admin-topbar__current">{{ currentSectionTitle }}</span>
        </div>
        <div class="admin-topbar__right">
          <NuxtLink to="/admin/noticias/novo" class="admin-btn admin-btn--primary">
            <span>+ Publicar Artigo</span>
          </NuxtLink>
        </div>
      </header>

      <main class="admin-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const route = useRoute()
const sidebarOpen = ref(false)
const articleCount = ref(0)
const userName = ref('Administrador')
const userRole = ref('Editor Chefe')
const userInitials = computed(() => {
  return userName.value
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'AD'
})

const isNoticiasRoute = computed(() => {
  return route.path.startsWith('/admin/noticias') && route.path !== '/admin/noticias/novo'
})

const currentSectionTitle = computed(() => {
  if (route.path === '/admin') return 'Visão Geral'
  if (route.path === '/admin/noticias/novo') return 'Criar Artigo'
  if (route.path.startsWith('/admin/noticias/') && route.path !== '/admin/noticias') return 'Editor de Artigo'
  if (route.path === '/admin/noticias') return 'Gestão de Notícias'
  return 'Painel Administrativo'
})

async function handleLogout() {
  try {
    await $fetch('/api/admin/auth/logout', { method: 'POST' })
  } catch {}
  navigateTo('/admin/login')
}

onMounted(async () => {
  try {
    const me = await $fetch<{ authenticated: boolean; user: { name: string; role: string; email: string } | null }>('/api/admin/auth/me')
    if (me?.user?.name) userName.value = me.user.name
    if (me?.user?.role) userRole.value = me.user.role
  } catch {}

  try {
    const articles = await $fetch<any[]>('/api/admin/news')
    articleCount.value = articles?.length || 0
  } catch {}
})
</script>

<style scoped>
.admin-shell {
  display: flex;
  min-height: 100vh;
  background-color: #070B14;
  color: #E2E8F0;
  font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
}

/* ===== SIDEBAR ===== */
.admin-sidebar {
  width: 268px;
  background-color: #0B1120;
  border-right: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.admin-sidebar__header {
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.admin-sidebar__close {
  display: none;
  background: none;
  border: none;
  color: #64748B;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
  line-height: 1;
}

.admin-brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
}

.admin-brand__logo {
  height: 22px;
  width: auto;
  object-fit: contain;
}

.admin-brand__badge {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
  color: #FFFFFF;
  padding: 0.18rem 0.45rem;
  border-radius: 4px;
}

/* Nav */
.admin-nav {
  padding: 1.25rem 0.75rem;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.admin-nav__group {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.admin-nav__label {
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #475569;
  padding: 0 0.75rem 0.4rem 0.75rem;
  margin: 0;
}

.admin-nav__link {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.75rem;
  border-radius: 8px;
  color: #64748B;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.15s ease;
  position: relative;
}

.admin-nav__link:hover {
  background-color: rgba(255, 255, 255, 0.04);
  color: #CBD5E1;
}

.admin-nav__link--active {
  background: rgba(59, 130, 246, 0.1);
  color: #60A5FA;
  font-weight: 600;
}

.admin-nav__link--active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 20%;
  bottom: 20%;
  width: 3px;
  background: #3B82F6;
  border-radius: 0 3px 3px 0;
}

.admin-nav__icon {
  font-size: 0.95rem;
  width: 18px;
  display: inline-flex;
  justify-content: center;
  flex-shrink: 0;
}

.admin-nav__count {
  margin-left: auto;
  background: rgba(255,255,255,0.07);
  color: #94A3B8;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 10px;
}

.admin-nav__ext-icon {
  margin-left: auto;
  font-size: 0.75rem;
  opacity: 0.4;
}

/* Sidebar Footer */
.admin-sidebar__footer {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  background-color: rgba(8, 13, 24, 0.8);
}

.admin-user-card {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.admin-user-card__avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1D4ED8 0%, #7C3AED 100%);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  flex-shrink: 0;
}

.admin-user-card__info {
  min-width: 0;
}

.admin-user-card__name {
  font-size: 0.82rem;
  font-weight: 600;
  color: #E2E8F0;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-user-card__role {
  font-size: 0.72rem;
  color: #475569;
  margin: 0;
}

.admin-logout-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.45rem 0.75rem;
  background: transparent;
  border: 1px solid rgba(239, 68, 68, 0.18);
  border-radius: 7px;
  color: #94A3B8;
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  width: 100%;
}

.admin-logout-btn:hover {
  background-color: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.35);
  color: #F87171;
}

/* ===== MAIN AREA ===== */
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.admin-topbar {
  height: 60px;
  background-color: #0B1120;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.75rem;
  position: sticky;
  top: 0;
  z-index: 20;
  flex-shrink: 0;
}

.admin-hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  margin-right: 0.5rem;
}

.admin-hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background-color: #94A3B8;
  border-radius: 2px;
  transition: all 0.2s ease;
}

.admin-topbar__left {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
}

.admin-topbar__breadcrumb {
  color: #475569;
  text-decoration: none;
  transition: color 0.15s ease;
}

.admin-topbar__breadcrumb:hover {
  color: #94A3B8;
}

.admin-topbar__sep {
  color: #334155;
}

.admin-topbar__current {
  color: #E2E8F0;
  font-weight: 600;
}

.admin-topbar__right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.admin-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* ===== BUTTONS ===== */
.admin-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: all 0.15s ease;
}

.admin-btn--primary {
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
  color: #FFFFFF;
  box-shadow: 0 2px 10px rgba(37, 99, 235, 0.25);
}

.admin-btn--primary:hover {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
  transform: translateY(-1px);
}

/* ===== OVERLAY ===== */
.admin-sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(2px);
  z-index: 39;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .admin-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 40;
    transform: translateX(-100%);
    height: 100%;
    width: 280px;
  }

  .admin-sidebar--open {
    transform: translateX(0);
    box-shadow: 4px 0 30px rgba(0,0,0,0.4);
  }

  .admin-sidebar__close {
    display: block;
  }

  .admin-sidebar-overlay {
    display: block;
  }

  .admin-hamburger {
    display: flex;
  }

  .admin-topbar {
    padding: 0 1rem;
  }

  .admin-content {
    padding: 1.25rem;
  }
}
</style>
