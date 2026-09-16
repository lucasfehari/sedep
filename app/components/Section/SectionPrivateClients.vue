<template>
  <section class="private-clients section" aria-labelledby="private-clients-heading">
    <div class="container">
      <!-- Cabeçalho -->
      <div class="private-clients__header">
        <div class="private-clients__badge">
          <svg class="badge-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          </svg>
          <span>SETOR PRIVADO &amp; EMPRESARIAL</span>
        </div>

        <h2 id="private-clients-heading" class="private-clients__title">
          Parceiros do mercado privado que confiam na SEDEP
        </h2>

        <p class="private-clients__subtitle">
          De cooperativas de saúde a supermercados, universidades e escritórios de advocacia, empresas líderes em seus segmentos escolheram a SEDEP para modernizar sua gestão jurídica e operacional.
        </p>

        <!-- Indicadores -->
        <div class="private-clients__pills">
          <div class="cred-pill">
            <span class="cred-pill__dot"></span>
            <strong>Saúde, Educação &amp; Varejo</strong>
          </div>
          <div class="cred-pill">
            <span class="cred-pill__dot"></span>
            <strong>Cooperativas &amp; Sindicatos</strong>
          </div>
          <div class="cred-pill">
            <span class="cred-pill__dot"></span>
            <strong>Advocacia Empresarial</strong>
          </div>
          <div class="cred-pill">
            <span class="cred-pill__dot"></span>
            <strong>Logística &amp; Infraestrutura</strong>
          </div>
        </div>
      </div>
    </div>

    <!-- Carrossel Marquee Infinito -->
    <div
      class="marquee-container"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div class="marquee-track" :class="{ 'marquee-track--paused': isHovered || isPaused }">

        <!-- Track 1: Conjunto Principal -->
        <div class="marquee-set">
          <article
            v-for="(client, index) in privateClients"
            :key="'priv-client-' + index"
            class="client-card"
          >
            <div class="client-card__sector-row">
              <span class="sector-tag" :class="'sector-tag--' + client.sectorKey">
                {{ client.sector }}
              </span>
              <span class="uf-tag" v-if="client.uf">{{ client.uf }}</span>
            </div>

            <div class="client-card__logo-wrap">
              <img
                :src="client.logo"
                :alt="'Logotipo ' + client.name"
                class="client-card__logo"
                :class="{ 'client-card__logo--dark': client.darkLogo }"
                loading="lazy"
              />
            </div>

            <div class="client-card__info">
              <h3 class="client-card__name">{{ client.name }}</h3>
              <span class="client-card__role">{{ client.category }}</span>
            </div>
          </article>
        </div>

        <!-- Track 2: Duplicado para Loop Contínuo -->
        <div class="marquee-set" aria-hidden="true">
          <article
            v-for="(client, index) in privateClients"
            :key="'priv-client-dup-' + index"
            class="client-card"
          >
            <div class="client-card__sector-row">
              <span class="sector-tag" :class="'sector-tag--' + client.sectorKey">
                {{ client.sector }}
              </span>
              <span class="uf-tag" v-if="client.uf">{{ client.uf }}</span>
            </div>

            <div class="client-card__logo-wrap">
              <img
                :src="client.logo"
                :alt="'Logotipo ' + client.name"
                class="client-card__logo"
                :class="{ 'client-card__logo--dark': client.darkLogo }"
                loading="lazy"
              />
            </div>

            <div class="client-card__info">
              <h3 class="client-card__name">{{ client.name }}</h3>
              <span class="client-card__role">{{ client.category }}</span>
            </div>
          </article>
        </div>

      </div>
    </div>

    <!-- Barra de Controle -->
    <div class="container marquee-footer">
      <div class="marquee-controls">
        <span class="marquee-status">
          <span class="status-pulse"></span>
          {{ privateClients.length }} empresas do setor privado em destaque
        </span>
        <button
          type="button"
          class="pause-toggle-btn"
          @click="isPaused = !isPaused"
          :aria-label="isPaused ? 'Retomar animação' : 'Pausar animação'"
        >
          <svg v-if="!isPaused" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
          <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span>{{ isPaused ? 'Retomar' : 'Pausar' }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface PrivateClient {
  name: string
  category: string
  sector: string
  sectorKey: 'saude' | 'educacao' | 'varejo' | 'cooperativa' | 'advocacia' | 'logistica' | 'infraestrutura'
  uf: string
  logo: string
  darkLogo?: boolean
}

const isHovered = ref(false)
const isPaused = ref(false)

const privateClients: PrivateClient[] = [
  {
    name: 'Sonda Supermercados',
    category: 'Rede de Supermercados',
    sector: 'Varejo',
    sectorKey: 'varejo',
    uf: 'MS',
    logo: '/logos_privadas/01_Sonda_Supermercados.webp',
  },
  {
    name: 'Águas Guariroba',
    category: 'Saneamento Básico',
    sector: 'Infraestrutura',
    sectorKey: 'infraestrutura',
    uf: 'MS',
    logo: '/logos_privadas/02_Aguas_Guariroba.webp',
  },
  {
    name: 'Unimed Campo Grande',
    category: 'Cooperativa Médica',
    sector: 'Saúde',
    sectorKey: 'saude',
    uf: 'MS',
    logo: '/logos_privadas/03_Unimed_Campo_Grande.webp',
  },
  {
    name: 'Sistema Famasul',
    category: 'Federação de Agricultura',
    sector: 'Cooperativa',
    sectorKey: 'cooperativa',
    uf: 'MS',
    logo: '/logos_privadas/04_Sistema_Famasul.webp',
  },
  {
    name: 'Sinergia MS',
    category: 'Organização Sindical',
    sector: 'Cooperativa',
    sectorKey: 'cooperativa',
    uf: 'MS',
    logo: '/logos_privadas/05_Sinergia_MS.webp',
  },
  {
    name: 'CASSEMS',
    category: 'Caixa de Assistência à Saúde',
    sector: 'Saúde',
    sectorKey: 'saude',
    uf: 'MS',
    logo: '/logos_privadas/06_CASSEMS.webp',
  },
  {
    name: 'ALEMS',
    category: 'Assembleia Legislativa',
    sector: 'Cooperativa',
    sectorKey: 'cooperativa',
    uf: 'MS',
    logo: '/logos_privadas/07_ALEMS.webp',
  },
  {
    name: 'Pimentel e Mochi Advogados',
    category: 'Escritório de Advocacia',
    sector: 'Advocacia',
    sectorKey: 'advocacia',
    uf: 'MS',
    logo: '/logos_privadas/08_Pimentel_e_Mochi_Advogados.webp',
    darkLogo: true,
  },
  {
    name: 'UCDB',
    category: 'Universidade Católica Dom Bosco',
    sector: 'Educação',
    sectorKey: 'educacao',
    uf: 'MS',
    logo: '/logos_privadas/09_Universidade_Catolica_Dom_Bosco_UCDB.webp',
  },
  {
    name: 'RPALOG Transportes',
    category: 'Logística & Transporte Rodoviário',
    sector: 'Logística',
    sectorKey: 'logistica',
    uf: 'MS',
    logo: '/logos_privadas/10_RPALOG_RPA_Transportes.webp',
  },
]
</script>

<style scoped>
.private-clients {
  padding: var(--section-spacing-md) 0;
  background: radial-gradient(120% 80% at 50% 0%, #FAFDF7 0%, #F0FDF4 100%);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  position: relative;
  overflow: hidden;
}

.private-clients::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 280px;
  background: radial-gradient(circle, rgba(5, 150, 105, 0.05) 0%, rgba(5, 150, 105, 0) 70%);
  pointer-events: none;
}

/* Header */
.private-clients__header {
  text-align: center;
  max-width: 860px;
  margin: 0 auto var(--space-10);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.private-clients__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: #ECFDF5;
  border: 1px solid rgba(5, 150, 105, 0.25);
  border-radius: var(--radius-pill);
  color: #065F46;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.badge-icon {
  color: #059669;
}

.private-clients__title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.2vw, 2.5rem);
  font-weight: 800;
  color: #0F172A;
  line-height: 1.2;
  letter-spacing: -0.03em;
  margin: 0;
}

.private-clients__subtitle {
  font-size: var(--text-base);
  color: #475569;
  line-height: var(--line-height-relaxed);
  max-width: 720px;
  margin: 0;
}

/* Pills */
.private-clients__pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.cred-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: var(--radius-pill);
  font-size: 12px;
  color: #334155;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.cred-pill__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #059669;
  box-shadow: 0 0 6px rgba(5, 150, 105, 0.6);
}

.cred-pill strong {
  font-weight: 600;
}

/* Marquee */
.marquee-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  user-select: none;
  padding: var(--space-4) 0;
  mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: privateMarqueeScroll 50s linear infinite;
}

.marquee-track--paused {
  animation-play-state: paused !important;
}

.marquee-set {
  display: flex;
  align-items: stretch;
  gap: var(--space-5);
  padding: 0 var(--space-3);
}

/* Card */
.client-card {
  width: 250px;
  min-height: 200px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02);
  transition: all var(--transition-fast);
  cursor: default;
  flex-shrink: 0;
}

.client-card:hover {
  transform: translateY(-4px);
  border-color: #059669;
  box-shadow: 0 16px 32px -8px rgba(5, 150, 105, 0.15), 0 4px 8px rgba(15, 23, 42, 0.04);
}

.client-card__sector-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: var(--space-3);
}

/* Sector Tags */
.sector-tag {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  background: #F1F5F9;
  color: #475569;
}

.sector-tag--saude {
  background: #FFF0F3;
  color: #9B1239;
  border: 1px solid rgba(155, 18, 57, 0.15);
}

.sector-tag--educacao {
  background: #EFF6FF;
  color: #1D4ED8;
  border: 1px solid rgba(29, 78, 216, 0.15);
}

.sector-tag--varejo {
  background: #FFFBEB;
  color: #92400E;
  border: 1px solid rgba(146, 64, 14, 0.15);
}

.sector-tag--cooperativa {
  background: #F0FDF4;
  color: #166534;
  border: 1px solid rgba(22, 101, 52, 0.15);
}

.sector-tag--advocacia {
  background: #F5F3FF;
  color: #5B21B6;
  border: 1px solid rgba(91, 33, 182, 0.15);
}

.sector-tag--logistica {
  background: #FFF7ED;
  color: #9A3412;
  border: 1px solid rgba(154, 52, 18, 0.15);
}

.sector-tag--infraestrutura {
  background: #F0F9FF;
  color: #075985;
  border: 1px solid rgba(7, 89, 133, 0.15);
}

.uf-tag {
  font-size: 10px;
  font-weight: 800;
  color: #64748B;
  background: #F8FAFC;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  border: 1px solid #E2E8F0;
}

.client-card__logo-wrap {
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2);
  margin-bottom: var(--space-3);
  background: #FAFAFA;
  border-radius: var(--radius-md);
  border: 1px dashed #E2E8F0;
  transition: all var(--transition-fast);
}

.client-card:hover .client-card__logo-wrap {
  background: #FFFFFF;
  border-style: solid;
  border-color: rgba(5, 150, 105, 0.2);
}

.client-card__logo {
  max-width: 100%;
  max-height: 64px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: contrast(102%);
  transition: transform var(--transition-fast);
}

.client-card__logo--dark {
  filter: brightness(0);
}

.client-card:hover .client-card__logo {
  transform: scale(1.05);
}

.client-card__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-top: 1px solid #F1F5F9;
  padding-top: var(--space-3);
}

.client-card__name {
  font-size: 13px;
  font-weight: 700;
  color: #0F172A;
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.client-card__role {
  font-size: 11px;
  color: #64748B;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Footer / Controls */
.marquee-footer {
  margin-top: var(--space-6);
}

.marquee-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-5);
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: var(--radius-pill);
  max-width: 640px;
  margin: 0 auto;
}

.marquee-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #475569;
}

.status-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #059669;
  position: relative;
}

.status-pulse::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background-color: rgba(5, 150, 105, 0.3);
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.pause-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  border-radius: var(--radius-pill);
  font-size: 11px;
  font-weight: 700;
  color: #334155;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.pause-toggle-btn:hover {
  background: #059669;
  color: #FFFFFF;
  border-color: #059669;
}

@keyframes privateMarqueeScroll {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .client-card {
    width: 220px;
    min-height: 185px;
    padding: var(--space-4);
  }

  .client-card__logo-wrap {
    height: 70px;
  }

  .client-card__logo {
    max-height: 52px;
  }

  .marquee-controls {
    flex-direction: column;
    gap: var(--space-2);
    text-align: center;
    border-radius: var(--radius-lg);
  }
}
</style>
