<template>
  <section
    class="clients-marquee"
    aria-label="Órgãos públicos, empresas e escritórios que confiam na SEDEP"
  >
    <div class="container">
      <div class="clients-marquee__top">
        <span class="clients-marquee__pill">AUTORIDADE COMPROVADA</span>
        <p class="clients-marquee__label">
          A infraestrutura jurídica e de dados escolhida por
          <strong>órgãos públicos</strong>,
          <strong>instituições financeiras</strong> e mais de
          <strong>2.600 bancas</strong>
        </p>
      </div>
    </div>

    <!-- Fila 1: scroll para a ESQUERDA -->
    <div class="marquee-wrapper">
      <div class="marquee-track">
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

    <!-- Fila 2: scroll para a DIREITA -->
    <div class="marquee-wrapper marquee-wrapper--reverse">
      <div class="marquee-track marquee-track--reverse">
        <div class="marquee-group">
          <div v-for="client in extraLogos" :key="'r1-' + client.name" class="client-item">
            <div class="client-logo-box">
              <img :src="client.logo" :alt="client.name" class="client-img" loading="lazy" />
            </div>
            <div class="client-meta">
              <span class="client-name">{{ client.name }}</span>
              <span class="client-tag">{{ client.type }}</span>
            </div>
          </div>
        </div>
        <div class="marquee-group" aria-hidden="true">
          <div v-for="client in extraLogos" :key="'r2-' + client.name" class="client-item">
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
  { name: 'Caixa Econômica Federal',    type: 'Instituição Federal',         logo: '/logos_clientes_publicos/caixa-economica-federal.png' },
  { name: 'Prefeitura de Campo Grande', type: 'Executivo Municipal / MS',    logo: '/logos_clientes_publicos/prefeitura-campo-grande.png' },
  { name: 'AGESUL',                     type: 'Governo do Estado de MS',     logo: '/logos_clientes_publicos/agesul.png' },
  { name: 'CREA-MT',                    type: 'Conselho Regional / MT',      logo: '/logos_clientes_publicos/crea-mt.png' },
  { name: 'Prefeitura de Cubatão',      type: 'Executivo Municipal / SP',    logo: '/logos_clientes_publicos/prefeitura-cubatao.png' },
  { name: 'Prefeitura de Botucatu',     type: 'Executivo Municipal / SP',    logo: '/logos_clientes_publicos/prefeitura-botucatu.png' },
  { name: 'Prefeitura de Bonito',       type: 'Executivo Municipal / MS',    logo: '/logos_clientes_publicos/prefeitura-bonito.png' },
  { name: 'Prefeitura de Aquidauana',   type: 'Executivo Municipal / MS',    logo: '/logos_clientes_publicos/prefeitura-aquidauana.png' },
  { name: 'Prefeitura de Naviraí',      type: 'Executivo Municipal / MS',    logo: '/logos_clientes_publicos/prefeitura-navirai.png' },
  { name: 'Prefeitura de Paragominas',  type: 'Executivo Municipal / PA',    logo: '/logos_clientes_publicos/prefeitura-paragominas.png' },
  { name: 'Prefeitura de Ponta Porã',   type: 'Executivo Municipal / MS',    logo: '/logos_clientes_publicos/prefeitura-ponta-pora.png' },
]

const extraLogos = [
  { name: 'Casa da Moeda do Brasil',          type: 'Empresa Pública Federal',      logo: '/logos_clientes_publicos/01_Casa_da_Moeda_do_Brasil.webp' },
  { name: 'Prefeitura de Selvíria',           type: 'Executivo Municipal / MS',     logo: '/logos_clientes_publicos/02_Prefeitura_de_Selviria_MS.webp' },
  { name: 'Prefeitura de Paranaíba',          type: 'Executivo Municipal / MS',     logo: '/logos_clientes_publicos/03_Prefeitura_de_Paranaiba_MS.webp' },
  { name: 'Prefeitura de Caarapó',            type: 'Executivo Municipal / MS',     logo: '/logos_clientes_publicos/04_Prefeitura_de_Caarapo_MS.webp' },
  { name: 'Prefeitura de Conceição do Rio Verde', type: 'Executivo Municipal / MG', logo: '/logos_clientes_publicos/05_Prefeitura_de_Conceicao_do_Rio_Verde_MG.webp' },
  { name: 'Prefeitura de Dom Viçoso',         type: 'Executivo Municipal / MG',     logo: '/logos_clientes_publicos/06_Prefeitura_de_Dom_Vicoso_MG.webp' },
  { name: 'Prefeitura de Votuporanga',        type: 'Executivo Municipal / SP',     logo: '/logos_clientes_publicos/07_Prefeitura_de_Votuporanga_SP.webp' },
  { name: 'Prefeitura de Confresa',           type: 'Executivo Municipal / MT',     logo: '/logos_clientes_publicos/08_Prefeitura_de_Confresa_MT.webp' },
  { name: 'Prefeitura de Eldorado',           type: 'Executivo Municipal / MS',     logo: '/logos_clientes_publicos/10_Prefeitura_de_Eldorado_MS.webp' },
  { name: 'Prefeitura de Itapirapuã Paulista',type: 'Executivo Municipal / SP',     logo: '/logos_clientes_publicos/11_Prefeitura_de_Itapirapua_Paulista_SP.webp' },
  { name: 'Prefeitura de Água Clara',         type: 'Executivo Municipal / MS',     logo: '/logos_clientes_publicos/12_Prefeitura_de_Agua_Clara_MS.webp' },
  { name: 'Prefeitura de Casa Branca',        type: 'Executivo Municipal / SP',     logo: '/logos_clientes_publicos/13_Prefeitura_de_Casa_Branca_SP.webp' },
  { name: 'Prefeitura de Cláudia',            type: 'Executivo Municipal / MT',     logo: '/logos_clientes_publicos/16_Prefeitura_de_Claudia_MT.webp' },
  { name: 'Prefeitura de Jauru',              type: 'Executivo Municipal / MT',     logo: '/logos_clientes_publicos/17_Prefeitura_de_Jauru_MT.webp' },
  { name: 'Prefeitura de Caracol',            type: 'Executivo Municipal / MS',     logo: '/logos_clientes_publicos/18_Prefeitura_de_Caracol_MS.webp' },
  { name: 'Prefeitura de Dom Aquino',         type: 'Executivo Municipal / MT',     logo: '/logos_clientes_publicos/19_Prefeitura_de_Dom_Aquino_MT.webp' },
  { name: 'Prefeitura de Amambai',            type: 'Executivo Municipal / MS',     logo: '/logos_clientes_publicos/20_Prefeitura_de_Amambai_MS.webp' },
  { name: 'Prefeitura de Dourados',           type: 'Executivo Municipal / MS',     logo: '/logos_clientes_publicos/21_Prefeitura_de_Dourados_MS.webp' },
  { name: 'Santo Antônio do Leverger',        type: 'Executivo Municipal / MT',     logo: '/logos_clientes_publicos/22_Municipio_de_Santo_Antonio_do_Leverger_MT.webp' },
  { name: 'AMM — Municípios de MT',           type: 'Associação Estadual',          logo: '/logos_clientes_publicos/23_Associacao_Matogrossense_dos_Municipios_AMM.webp' },
  { name: 'Município de Figueirão',           type: 'Executivo Municipal / MS',     logo: '/logos_clientes_publicos/24_Municipio_de_Figueirao_MS.webp' },
]
</script>

<style scoped>
.clients-marquee {
  padding: clamp(2rem, 3.5vw, 3rem) 0;
  background-color: #ffffff;
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
  color: #1848b8;
  background: #ebf2ff;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(24, 72, 184, 0.15);
}

.clients-marquee__label {
  font-size: var(--text-sm);
  color: #64748b;
  margin: 0;
  letter-spacing: -0.01em;
}

.clients-marquee__label strong {
  color: #0f172a;
  font-weight: 700;
}

.marquee-wrapper {
  display: flex;
  overflow: hidden;
  user-select: none;
  mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
}

.marquee-wrapper--reverse {
  margin-top: var(--space-4);
}

.marquee-track {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: scrollClients 160s linear infinite;
}

.marquee-track--reverse {
  animation: scrollClientsReverse 180s linear infinite;
}

.marquee-track:hover,
.marquee-track--reverse:hover {
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
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.client-item:hover {
  background: #ffffff;
  border-color: #1848b8;
  box-shadow: 0 8px 20px rgba(24, 72, 184, 0.1);
  transform: translateY(-2px);
}

.client-logo-box {
  width: 50px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: var(--radius-sm);
  border: 1px solid #edf2f7;
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
  color: #1e293b;
  letter-spacing: -0.01em;
}

.client-tag {
  font-size: 10px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

@keyframes scrollClients {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}

@keyframes scrollClientsReverse {
  from { transform: translate3d(-50%, 0, 0); }
  to   { transform: translate3d(0, 0, 0); }
}
</style>
