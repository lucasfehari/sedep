<template>
  <section class="clients-marquee" aria-label="Órgãos públicos, empresas e escritórios que confiam na SEDEP">
    <div class="container">
      <div class="clients-marquee__top">
        <span class="clients-marquee__pill">AUTORIDADE COMPROVADA</span>
        <p class="clients-marquee__label">
          A infraestrutura jurídica e de dados escolhida por <strong>órgãos públicos</strong>, <strong>instituições financeiras</strong> e mais de <strong>2.600 bancas</strong>
        </p>
      </div>
    </div>

    <!-- Marquee Track Infinito de Logos Reais -->
    <div class="marquee-wrapper">
      <div class="marquee-track">

        <!-- Lista 1 de Logos Oficiais -->
        <div class="marquee-group">
          <div v-for="client in publicLogos" :key="client.name" class="client-item">
            <div class="client-logo-box">
              <img :src="client.logo" :alt="client.name" class="client-img" loading="lazy" />
            </div>
            <div class="client-meta">
              <span class="client-name">{{ client.name }}</span>
              <span class="client-tag">{{ client.type }}</span>
            </div>
          </div>
        </div>

        <!-- Lista 2 Duplicada para Loop Contínuo Perfeito -->
        <div class="marquee-group" aria-hidden="true">
          <div v-for="client in publicLogos" :key="'dup-' + client.name" class="client-item">
            <div class="client-logo-box">
              <img :src="client.logo" :alt="client.name" class="client-img" loading="lazy" />
            </div>
            <div class="client-meta">
              <span class="client-name">{{ client.name }}</span>
              <span class="client-tag">{{ client.type }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const publicLogos = [
  {
    name: 'Caixa Econômica Federal',
    type: 'Instituição Federal',
    logo: '/logos_clientes_publicos/caixa-economica-federal.png',
  },
  {
    name: 'Prefeitura de Campo Grande',
    type: 'Executivo Municipal / MS',
    logo: '/logos_clientes_publicos/prefeitura-campo-grande.png',
  },
  {
    name: 'AGESUL',
    type: 'Governo do Estado de MS',
    logo: '/logos_clientes_publicos/agesul.png',
  },
  {
    name: 'CREA-MT',
    type: 'Conselho Regional / MT',
    logo: '/logos_clientes_publicos/crea-mt.png',
  },
  {
    name: 'Prefeitura de Cubatão',
    type: 'Executivo Municipal / SP',
    logo: '/logos_clientes_publicos/prefeitura-cubatao.png',
  },
  {
    name: 'Prefeitura de Botucatu',
    type: 'Executivo Municipal / SP',
    logo: '/logos_clientes_publicos/prefeitura-botucatu.png',
  },
  {
    name: 'Prefeitura de Bonito',
    type: 'Executivo Municipal / MS',
    logo: '/logos_clientes_publicos/prefeitura-bonito.png',
  },
  {
    name: 'Prefeitura de Aquidauana',
    type: 'Executivo Municipal / MS',
    logo: '/logos_clientes_publicos/prefeitura-aquidauana.png',
  },
  {
    name: 'Prefeitura de Naviraí',
    type: 'Executivo Municipal / MS',
    logo: '/logos_clientes_publicos/prefeitura-navirai.png',
  },
  {
    name: 'Prefeitura de Paragominas',
    type: 'Executivo Municipal / PA',
    logo: '/logos_clientes_publicos/prefeitura-paragominas.png',
  },
  {
    name: 'Prefeitura de Ponta Porã',
    type: 'Executivo Municipal / MS',
    logo: '/logos_clientes_publicos/prefeitura-ponta-pora.png',
  },
]
</script>

<style scoped>
.clients-marquee {
  padding: clamp(2rem, 3.5vw, 3rem) 0;
  background-color: #FFFFFF;
  border-top: 1px solid var(--color-border-subtle);
  border-bottom: 1px solid var(--color-border-subtle);
  overflow: hidden;
}

.clients-marquee__top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: var(--space-6);
  text-align: center;
}

.clients-marquee__pill {
  display: inline-block;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1848B8;
  background: #EBF2FF;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(24, 72, 184, 0.15);
}

.clients-marquee__label {
  font-size: var(--text-sm);
  color: #64748B;
  margin: 0;
  letter-spacing: -0.01em;
}

.clients-marquee__label strong {
  color: #0F172A;
  font-weight: 700;
}

.marquee-wrapper {
  display: flex;
  overflow: hidden;
  user-select: none;
  mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: scrollClients 40s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

.marquee-group {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding-right: var(--space-6);
}

.client-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 18px;
  border-radius: var(--radius-lg);
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.client-item:hover {
  background: #FFFFFF;
  border-color: #1848B8;
  box-shadow: 0 8px 20px rgba(24, 72, 184, 0.1);
  transform: translateY(-2px);
}

.client-logo-box {
  width: 50px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  border-radius: var(--radius-sm);
  border: 1px solid #EDF2F7;
  padding: 4px;
  flex-shrink: 0;
}

.client-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.client-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.client-name {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  color: #1E293B;
  letter-spacing: -0.01em;
}

.client-tag {
  font-size: 10px;
  font-weight: 600;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

@keyframes scrollClients {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
