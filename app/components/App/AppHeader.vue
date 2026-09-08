<template>
  <header
    class="header"
    :class="{
      'header--scrolled': isScrolled,
      'header--menu-open': isMobileMenuOpen,
    }"
    role="banner"
  >
    <!-- Top Announcement Banner (Opcional - SaaS standard) -->
    <div class="header__topbar">
      <div class="container header__topbar-inner">
        <span class="header__topbar-text">
          <strong>Pioneirismo & IA Jurídica:</strong> Conheça a nova geração de
          inteligência jurídica da SEDEP.
        </span>
        <NuxtLink to="/experimente" class="header__topbar-link">
          Solicitar demonstração →
        </NuxtLink>
      </div>
    </div>

    <div class="container">
      <div class="header__inner">
        <!-- Logo SEDEP Oficial -->
        <NuxtLink
          to="/"
          class="header__logo"
          aria-label="SEDEP — Página inicial"
        >
          <img
            src="/sedep-branco.png"
            alt="SEDEP"
            class="header__logo-img"
            width="120"
            height="34"
          />
        </NuxtLink>

        <!-- Navegação Desktop (Estilo Aurum SaaS) -->
        <nav class="header__nav" aria-label="Navegação principal">
          <ul class="header__nav-list" role="list">
            <!-- Sobre a SEDEP -->
            <li
              class="header__nav-item"
              @mouseenter="openDropdown('sobre')"
              @mouseleave="closeDropdown"
            >
              <button
                class="header__nav-trigger"
                :aria-expanded="activeDropdown === 'sobre'"
                @click="toggleDropdown('sobre')"
              >
                Sobre a SEDEP
                <svg
                  class="header__chevron"
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div
                class="header__dropdown"
                :class="{
                  'header__dropdown--open': activeDropdown === 'sobre',
                }"
              >
                <div class="header__dropdown-menu">
                  <NuxtLink
                    to="/sobre"
                    class="header__dropdown-item"
                    @click="closeDropdownNow"
                  >
                    <span class="header__dropdown-title">A SEDEP</span>
                    <span class="header__dropdown-sub"
                      >Mais de 40 anos de história e inovação</span
                    >
                  </NuxtLink>
                  <NuxtLink
                    to="/tecnologia"
                    class="header__dropdown-item"
                    @click="closeDropdownNow"
                  >
                    <span class="header__dropdown-title"
                      >Tecnologia & Infraestrutura</span
                    >
                    <span class="header__dropdown-sub"
                      >Arquitetura de sistemas e nuvem</span
                    >
                  </NuxtLink>
                  <NuxtLink
                    to="/cyber-security"
                    class="header__dropdown-item"
                    @click="closeDropdownNow"
                  >
                    <span class="header__dropdown-title">Cyber Security</span>
                    <span class="header__dropdown-sub"
                      >Segurança contínua e governança</span
                    >
                  </NuxtLink>
                  <NuxtLink
                    to="/lgpd"
                    class="header__dropdown-item"
                    @click="closeDropdownNow"
                  >
                    <span class="header__dropdown-title"
                      >LGPD & Privacidade</span
                    >
                    <span class="header__dropdown-sub"
                      >Conformidade e governança de dados</span
                    >
                  </NuxtLink>
                </div>
              </div>
            </li>

            <!-- Softwares Jurídicos -->
            <li
              class="header__nav-item"
              @mouseenter="openDropdown('softwares')"
              @mouseleave="closeDropdown"
            >
              <button
                class="header__nav-trigger"
                :aria-expanded="activeDropdown === 'softwares'"
                @click="toggleDropdown('softwares')"
              >
                Softwares Jurídicos
                <svg
                  class="header__chevron"
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div
                class="header__dropdown header__dropdown--wide"
                :class="{
                  'header__dropdown--open': activeDropdown === 'softwares',
                }"
              >
                <div class="header__dropdown-menu">
                  <NuxtLink
                    to="/solucoes/faz"
                    class="header__dropdown-item header__dropdown-item--featured"
                    @click="closeDropdownNow"
                  >
                    <div class="header__product-badge">Sedep Faz</div>
                    <span class="header__dropdown-title"
                      >Gestão Jurídica Inteligente</span
                    >
                    <span class="header__dropdown-sub"
                      >Processos, andamentos, prazos, financeiro e automação
                      completa.</span
                    >
                  </NuxtLink>
                  <NuxtLink
                    to="/solucoes/legallake"
                    class="header__dropdown-item"
                    @click="closeDropdownNow"
                  >
                    <div
                      class="header__product-badge header__product-badge--navy"
                    >
                      LegalLake
                    </div>
                    <span class="header__dropdown-title"
                      >Pesquisa e Inteligência</span
                    >
                    <span class="header__dropdown-sub"
                      >+800M processos indexados em escala nacional.</span
                    >
                  </NuxtLink>
                  <NuxtLink
                    to="/solucoes/acompanhamento-publicacoes"
                    class="header__dropdown-item"
                    @click="closeDropdownNow"
                  >
                    <div
                      class="header__product-badge header__product-badge--gold"
                    >
                      Publicações
                    </div>
                    <span class="header__dropdown-title"
                      >Monitoramento de Diários Oficiais</span
                    >
                    <span class="header__dropdown-sub"
                      >Captura automática de intimações e nomes.</span
                    >
                  </NuxtLink>
                </div>
              </div>
            </li>

            <!-- Planos -->
            <li class="header__nav-item">
              <NuxtLink to="/#planos" class="header__nav-link">Planos</NuxtLink>
            </li>

            <!-- Conteúdos / Notícias -->
            <li class="header__nav-item">
              <NuxtLink to="/noticias" class="header__nav-link"
                >Notícias & Insights</NuxtLink
              >
            </li>

            <!-- Atendimento -->
            <li class="header__nav-item">
              <NuxtLink to="/atendimento" class="header__nav-link"
                >Atendimento</NuxtLink
              >
            </li>
          </ul>
        </nav>

        <!-- Ações do Header SaaS (Login Outline + Primary Coral) -->
        <div class="header__actions">
          <BaseButton
            href="https://app.faz.adv.br/"
            target="_blank"
            rel="noopener"
            variant="ghost"
            size="sm"
          >
            Entrar
          </BaseButton>
          <BaseButton
            to="/experimente"
            variant="secondary"
            size="sm"
            class="header__btn-coral"
          >
            EXPERIMENTE AGORA
          </BaseButton>
        </div>

        <!-- Mobile toggle -->
        <button
          class="header__mobile-toggle"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Abrir menu"
          @click="toggleMobileMenu"
        >
          <span class="header__mobile-bar" />
          <span class="header__mobile-bar" />
          <span class="header__mobile-bar" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div
      class="header__mobile-menu"
      :class="{ 'header__mobile-menu--open': isMobileMenuOpen }"
    >
      <div class="header__mobile-body">
        <div class="header__mobile-group">
          <p class="header__mobile-label">Softwares Jurídicos</p>
          <NuxtLink
            to="/solucoes/faz"
            class="header__mobile-link"
            @click="closeMobileMenu"
            >Sedep Faz (Software Jurídico)</NuxtLink
          >
          <NuxtLink
            to="/solucoes/legallake"
            class="header__mobile-link"
            @click="closeMobileMenu"
            >LegalLake (800M Processos)</NuxtLink
          >
          <NuxtLink
            to="/solucoes/acompanhamento-publicacoes"
            class="header__mobile-link"
            @click="closeMobileMenu"
            >Acompanhamento e Publicações</NuxtLink
          >
          <NuxtLink
            to="/#planos"
            class="header__mobile-link"
            @click="closeMobileMenu"
            >Planos & Preços</NuxtLink
          >
        </div>
        <div class="header__mobile-group">
          <p class="header__mobile-label">Empresa e Tecnologia</p>
          <NuxtLink
            to="/sobre"
            class="header__mobile-link"
            @click="closeMobileMenu"
            >Sobre a SEDEP</NuxtLink
          >
          <NuxtLink
            to="/tecnologia"
            class="header__mobile-link"
            @click="closeMobileMenu"
            >Tecnologia & Infraestrutura</NuxtLink
          >
          <NuxtLink
            to="/cyber-security"
            class="header__mobile-link"
            @click="closeMobileMenu"
            >Cyber Security</NuxtLink
          >
          <NuxtLink
            to="/lgpd"
            class="header__mobile-link"
            @click="closeMobileMenu"
            >LGPD & Privacidade</NuxtLink
          >
          <NuxtLink
            to="/noticias"
            class="header__mobile-link"
            @click="closeMobileMenu"
            >Notícias & Insights</NuxtLink
          >
          <NuxtLink
            to="/atendimento"
            class="header__mobile-link"
            @click="closeMobileMenu"
            >Atendimento e Suporte</NuxtLink
          >
        </div>
        <div class="header__mobile-actions">
          <BaseButton
            to="/experimente"
            variant="primary"
            size="md"
            @click="closeMobileMenu"
          >
            Experimentar o Faz grátis
          </BaseButton>
          <BaseButton
            href="https://app.faz.adv.br/"
            target="_blank"
            rel="noopener"
            variant="ghost"
            size="md"
            @click="closeMobileMenu"
          >
            Fazer login no Faz
          </BaseButton>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isScrolled = ref(false);
const activeDropdown = ref<string | null>(null);
const isMobileMenuOpen = ref(false);

let timer: any = null;

function openDropdown(name: string) {
  if (timer) clearTimeout(timer);
  activeDropdown.value = name;
}

function closeDropdown() {
  timer = setTimeout(() => {
    activeDropdown.value = null;
  }, 200);
}

function closeDropdownNow() {
  activeDropdown.value = null;
}

function toggleDropdown(name: string) {
  activeDropdown.value = activeDropdown.value === name ? null : name;
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

function handleScroll() {
  isScrolled.value = window.scrollY > 10;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* Topbar SaaS */
.header__topbar {
  background-color: #0052cc;
  color: #ffffff;
  font-size: var(--text-xs);
  padding: 8px 0;
  display: block;
}

.header__topbar-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  text-align: center;
}

.header__topbar-text {
  color: rgba(255, 255, 255, 0.9);
}

.header__topbar-link {
  color: #ffffff;
  font-weight: var(--font-weight-bold);
  text-decoration: underline;
}

/* Main Header */
.header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  background-color: #ffffff;
  border-bottom: 1px solid var(--color-border);
  transition: all var(--transition-fast);
}

.header--scrolled {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height-desktop);
  gap: var(--space-6);
}

/* Logo */
.header__logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.header__logo-img {
  height: 32px;
  width: auto;
  object-fit: contain;
  /* Logo branca convertida para a cor ink (#0F172A) sobre fundo claro */
  filter: brightness(0);
  transition:
    opacity var(--transition-fast),
    transform var(--transition-fast);
}

.header__logo:hover .header__logo-img {
  opacity: 0.85;
}

/* Nav */
.header__nav-list {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.header__nav-item {
  position: relative;
}

.header__nav-trigger,
.header__nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-ink);
  border-radius: var(--radius-md);
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast);
  cursor: pointer;
}

.header__nav-trigger:hover,
.header__nav-link:hover {
  color: var(--color-primary);
  background-color: var(--color-surface-alt);
}

.header__chevron {
  transition: transform var(--transition-fast);
}

.header__nav-item:hover .header__chevron {
  transform: rotate(180deg);
}

/* Dropdowns */
.header__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background-color: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  min-width: 260px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(6px);
  transition: all var(--transition-fast);
  z-index: var(--z-dropdown);
}

.header__dropdown--wide {
  min-width: 340px;
}

.header__dropdown--open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.header__dropdown-menu {
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.header__dropdown-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
}

.header__dropdown-item:hover {
  background-color: var(--color-surface-alt);
}

.header__dropdown-title {
  font-size: var(--text-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-ink);
}

.header__dropdown-sub {
  font-size: var(--text-xs);
  color: var(--color-ink-light);
  line-height: 1.4;
}

.header__product-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-faz);
  margin-bottom: 2px;
}

.header__product-badge--navy {
  color: var(--color-legallake);
}
.header__product-badge--gold {
  color: #b45309;
}

/* Ações */
.header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.header__btn-coral {
  background-color: #ff4d4d !important;
  border-color: #ff4d4d !important;
  color: #ffffff !important;
  font-weight: 800 !important;
  letter-spacing: 0.03em;
  box-shadow: 0 4px 12px rgba(255, 77, 77, 0.35);
  transition: all var(--transition-fast) !important;
}

.header__btn-coral:hover {
  background-color: #e63939 !important;
  box-shadow: 0 6px 18px rgba(255, 77, 77, 0.5);
  transform: translateY(-1px);
}

/* Mobile */
.header__mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
}

.header__mobile-bar {
  width: 22px;
  height: 2px;
  background-color: var(--color-ink);
  border-radius: 2px;
}

.header__mobile-menu {
  display: none;
  position: fixed;
  top: var(--header-height-desktop);
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: var(--z-overlay);
  overflow-y: auto;
  padding: var(--space-6);
  border-top: 1px solid var(--color-border);
}

.header__mobile-menu--open {
  display: block;
}

.header__mobile-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.header__mobile-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.header__mobile-label {
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-ink-light);
}

.header__mobile-link {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-ink);
  padding: 8px 0;
  border-bottom: 1px solid var(--color-border-subtle);
}

.header__mobile-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

@media (max-width: 1024px) {
  .header__nav,
  .header__actions {
    display: none;
  }
  .header__mobile-toggle {
    display: flex;
  }
}
</style>
