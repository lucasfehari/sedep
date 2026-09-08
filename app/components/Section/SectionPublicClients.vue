<template>
  <section class="public-clients section" aria-labelledby="public-clients-heading">
    <div class="container">
      <!-- Cabeçalho Institucional de Alto Impacto -->
      <div class="public-clients__header">
        <div class="public-clients__badge">
          <svg class="badge-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <span>AUTORIDADE INSTITUCIONAL & SETOR PÚBLICO</span>
        </div>

        <h2 id="public-clients-heading" class="public-clients__title">
          Tecnologia jurídica validada e homologada pelos maiores órgãos e entidades públicas
        </h2>

        <p class="public-clients__subtitle">
          De instituições financeiras federais a procuradorias municipais e autarquias estaduais, a SEDEP é a parceira de confiança em inteligência de dados, gestão de intimações e monitoramento de processos de alta relevância pública.
        </p>

        <!-- Indicadores de Credibilidade Pública -->
        <div class="public-clients__pills">
          <div class="cred-pill">
            <span class="cred-pill__dot"></span>
            <strong>Esferas Federal, Estadual e Municipal</strong>
          </div>
          <div class="cred-pill">
            <span class="cred-pill__dot"></span>
            <strong>Procuradorias & Autarquias</strong>
          </div>
          <div class="cred-pill">
            <span class="cred-pill__dot"></span>
            <strong>100% de Conformidade com a LGPD</strong>
          </div>
          <div class="cred-pill">
            <span class="cred-pill__dot"></span>
            <strong>+40 Anos de Segurança Contínua</strong>
          </div>
        </div>
      </div>
    </div>

    <!-- Carrossel Marquee Infinito de Logos Oficiais -->
    <div
      class="marquee-container"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div class="marquee-track" :class="{ 'marquee-track--paused': isHovered || isPaused }">
        
        <!-- Track 1: Conjunto Principal -->
        <div class="marquee-set">
          <article
            v-for="(client, index) in publicClients"
            :key="'pub-client-' + index"
            class="client-card"
          >
            <div class="client-card__badge-row">
              <span class="sphere-tag" :class="'sphere-tag--' + client.sphereKey">
                {{ client.sphere }}
              </span>
              <span class="uf-tag" v-if="client.uf">{{ client.uf }}</span>
            </div>

            <div class="client-card__logo-wrap">
              <img
                :src="client.logo"
                :alt="'Logotipo ' + client.name"
                class="client-card__logo"
                loading="lazy"
              />
            </div>

            <div class="client-card__info">
              <h3 class="client-card__name">{{ client.name }}</h3>
              <span class="client-card__role">{{ client.category }}</span>
            </div>
          </article>
        </div>

        <!-- Track 2: Conjunto Duplicado para Loop Contínuo Sem Cortes -->
        <div class="marquee-set" aria-hidden="true">
          <article
            v-for="(client, index) in publicClients"
            :key="'pub-client-dup-' + index"
            class="client-card"
          >
            <div class="client-card__badge-row">
              <span class="sphere-tag" :class="'sphere-tag--' + client.sphereKey">
                {{ client.sphere }}
              </span>
              <span class="uf-tag" v-if="client.uf">{{ client.uf }}</span>
            </div>

            <div class="client-card__logo-wrap">
              <img
                :src="client.logo"
                :alt="'Logotipo ' + client.name"
                class="client-card__logo"
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

    <!-- Barra de Controle Interativa Discreta -->
    <div class="container marquee-footer">
      <div class="marquee-controls">
        <span class="marquee-status">
          <span class="status-pulse"></span>
          {{ publicClients.length }} entidades governamentais e instituições em destaque
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

interface PublicClient {
  name: string
  category: string
  sphere: string
  sphereKey: 'federal' | 'estadual' | 'municipal' | 'conselho'
  uf: string
  logo: string
}

const isHovered = ref(false)
const isPaused = ref(false)

const publicClients: PublicClient[] = [
  {
    name: 'Caixa Econômica Federal',
    category: 'Instituição Financeira Pública',
    sphere: 'Federal',
    sphereKey: 'federal',
    uf: 'BR',
    logo: '/logos_clientes_publicos/caixa-economica-federal.png',
  },
  {
    name: 'Prefeitura de Campo Grande',
    category: 'Executivo Municipal',
    sphere: 'Capital',
    sphereKey: 'municipal',
    uf: 'MS',
    logo: '/logos_clientes_publicos/prefeitura-campo-grande.png',
  },
  {
    name: 'AGESUL',
    category: 'Agência Estadual de Empreendimentos',
    sphere: 'Governo Estadual',
    sphereKey: 'estadual',
    uf: 'MS',
    logo: '/logos_clientes_publicos/agesul.png',
  },
  {
    name: 'CREA-MT',
    category: 'Conselho Regional de Engenharia',
    sphere: 'Autarquia Federal',
    sphereKey: 'conselho',
    uf: 'MT',
    logo: '/logos_clientes_publicos/crea-mt.png',
  },
  {
    name: 'Prefeitura de Cubatão',
    category: 'Polo Industrial & Portuário',
    sphere: 'Municipal',
    sphereKey: 'municipal',
    uf: 'SP',
    logo: '/logos_clientes_publicos/prefeitura-cubatao.png',
  },
  {
    name: 'Prefeitura de Botucatu',
    category: 'Polo Universitário & Tecnológico',
    sphere: 'Municipal',
    sphereKey: 'municipal',
    uf: 'SP',
    logo: '/logos_clientes_publicos/prefeitura-botucatu.png',
  },
  {
    name: 'Prefeitura de Bonito',
    category: 'Referência Mundial em Ecoturismo',
    sphere: 'Municipal',
    sphereKey: 'municipal',
    uf: 'MS',
    logo: '/logos_clientes_publicos/prefeitura-bonito.png',
  },
  {
    name: 'Prefeitura de Aquidauana',
    category: 'Portal do Pantanal Sul-Mato-Grossense',
    sphere: 'Municipal',
    sphereKey: 'municipal',
    uf: 'MS',
    logo: '/logos_clientes_publicos/prefeitura-aquidauana.png',
  },
  {
    name: 'Prefeitura de Naviraí',
    category: 'Polo Agroindustrial do Cone Sul',
    sphere: 'Municipal',
    sphereKey: 'municipal',
    uf: 'MS',
    logo: '/logos_clientes_publicos/prefeitura-navirai.png',
  },
  {
    name: 'Prefeitura de Paragominas',
    category: 'Município Verde & Agronegócio',
    sphere: 'Municipal',
    sphereKey: 'municipal',
    uf: 'PA',
    logo: '/logos_clientes_publicos/prefeitura-paragominas.png',
  },
  {
    name: 'Prefeitura de Ponta Porã',
    category: 'Fronteira Internacional Estratégica',
    sphere: 'Municipal',
    sphereKey: 'municipal',
    uf: 'MS',
    logo: '/logos_clientes_publicos/prefeitura-ponta-pora.png',
  },
]
</script>

<style scoped>
.public-clients {
  padding: var(--section-spacing-md) 0;
  background: radial-gradient(120% 80% at 50% 0%, #F8FAFC 0%, #F1F5F9 100%);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  position: relative;
  overflow: hidden;
}

.public-clients::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 280px;
  background: radial-gradient(circle, rgba(24, 72, 184, 0.04) 0%, rgba(24, 72, 184, 0) 70%);
  pointer-events: none;
}

/* Header */
.public-clients__header {
  text-align: center;
  max-width: 860px;
  margin: 0 auto var(--space-10);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.public-clients__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: #EBF2FF;
  border: 1px solid rgba(24, 72, 184, 0.2);
  border-radius: var(--radius-pill);
  color: #1848B8;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.badge-icon {
  color: #1848B8;
}

.public-clients__title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.2vw, 2.5rem);
  font-weight: 800;
  color: #0F172A;
  line-height: 1.2;
  letter-spacing: -0.03em;
  margin: 0;
}

.public-clients__subtitle {
  font-size: var(--text-base);
  color: #475569;
  line-height: var(--line-height-relaxed);
  max-width: 720px;
  margin: 0;
}

/* Indicadores / Pills */
.public-clients__pills {
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
  background-color: #00C853;
  box-shadow: 0 0 6px rgba(0, 200, 83, 0.6);
}

.cred-pill strong {
  font-weight: 600;
}

/* Marquee Principal */
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
  animation: publicMarqueeScroll 45s linear infinite;
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

/* Card Individual */
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
  border-color: #1848B8;
  box-shadow: 0 16px 32px -8px rgba(24, 72, 184, 0.15), 0 4px 8px rgba(15, 23, 42, 0.04);
}

.client-card__badge-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: var(--space-3);
}

.sphere-tag {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  background: #F1F5F9;
  color: #475569;
}

.sphere-tag--federal {
  background: #EBF2FF;
  color: #1848B8;
  border: 1px solid rgba(24, 72, 184, 0.15);
}

.sphere-tag--estadual {
  background: #E8F5E9;
  color: #1B5E20;
  border: 1px solid rgba(27, 94, 32, 0.15);
}

.sphere-tag--conselho {
  background: #F3E8FF;
  color: #6B21A8;
  border: 1px solid rgba(107, 33, 168, 0.15);
}

.sphere-tag--municipal {
  background: #F8FAFC;
  color: #334155;
  border: 1px solid #E2E8F0;
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
  border-color: rgba(24, 72, 184, 0.2);
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
  background-color: #1848B8;
  position: relative;
}

.status-pulse::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background-color: rgba(24, 72, 184, 0.3);
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
  background: #1848B8;
  color: #FFFFFF;
  border-color: #1848B8;
}

@keyframes publicMarqueeScroll {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
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
