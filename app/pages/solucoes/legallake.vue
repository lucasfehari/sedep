<template>
  <div>
    <section class="product-hero section bg-dark on-dark" aria-labelledby="ll-heading">
      <div class="container">
        <p class="section-label section-label--light">Pesquisa Jurídica</p>
        <div class="product-hero__brand-header" style="margin-bottom: 1rem;">
          <img src="/logo_legallake.png" alt="LegalLake" class="product-hero__logo" width="220" height="54" style="height: 48px; width: auto; object-fit: contain; filter: brightness(0);" />
        </div>
        <h1 id="ll-heading" class="sr-only">LegalLake</h1>
        <p class="lead">
          Pesquise qualquer pessoa, empresa, advogado ou processo em mais de 800 milhões de registros. Inteligência jurídica em escala.
        </p>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-top:1.5rem;">
          <BaseButton href="https://legallake.com.br" variant="primary" size="lg" target="_blank" rel="noopener">
            Acessar LegalLake
          </BaseButton>
          <BaseButton to="/experimente" variant="ghost" size="lg">
            Solicitar demonstração
          </BaseButton>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="ll-what-heading">
      <div class="container">
        <div class="ll-layout">
          <div>
            <p class="section-label">O que é</p>
            <h2 id="ll-what-heading">Pesquisa jurídica com profundidade real.</h2>
            <p class="lead">
              O LegalLake é um motor de busca especializado em informações jurídicas. Mais de 800 milhões de processos indexados para consultas rápidas, precisas e estratégicas.
            </p>
          </div>
          <div class="ll-capabilities">
            <div v-for="item in capabilities" :key="item" class="ll-capability">
              <span class="ll-capability-dot" aria-hidden="true" />
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-surface-alt" aria-labelledby="ll-audience-heading">
      <div class="container">
        <p class="section-label">Para quem é</p>
        <h2 id="ll-audience-heading">Quem usa o LegalLake.</h2>
        <div class="ll-audiences">
          <div class="ll-audience-item">
            <h3>Advogados e Escritórios</h3>
            <p>Pesquise advogados, juízes, promotores e partes em disputas. Fundamente estratégias processuais com dados reais.</p>
          </div>
          <div class="ll-audience-item">
            <h3>Departamentos Jurídicos</h3>
            <p>Monitore contrapartes, fornecedores e parceiros. Reduza riscos com inteligência de dados.</p>
          </div>
          <div class="ll-audience-item">
            <h3>Empresas de Compliance e Cobrança</h3>
            <p>Verifique histórico processual de pessoas físicas e jurídicas antes de decisões comerciais críticas.</p>
          </div>
        </div>
      </div>
    </section>

    <SectionCTA />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'LegalLake — Pesquisa e Inteligência Jurídica | SEDEP',
  description: 'O LegalLake permite pesquisar mais de 800 milhões de processos por pessoa, empresa, OAB, número de processo ou tribunal. Solução SEDEP para inteligência jurídica.',
})

const capabilities = [
  'Busca por pessoa física ou jurídica',
  'Pesquisa por número de OAB',
  'Busca por número de processo',
  'Pesquisa por advogados, promotores e juízes',
  'Filtro por tribunal',
  'Filtro por data de publicação',
  'Cobertura nacional',
]
</script>

<style scoped>
.product-hero {
  background-color: var(--color-sedep-blue);
  padding-top: var(--section-spacing-lg);
  padding-bottom: var(--section-spacing-lg);
}

.product-hero h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  color: #FFFFFF;
  margin: var(--space-4) 0;
}

.ll-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: start;
}

.ll-capabilities {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-top: var(--space-6);
}

.ll-capability {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-base);
  color: var(--color-ink-medium);
  padding: var(--space-3) 0;
  border-bottom: var(--border-thin);
}

.ll-capability-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-sedep-blue-mid);
  flex-shrink: 0;
}

.ll-audiences {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
  margin-top: var(--space-10);
}

.ll-audience-item {
  padding: var(--space-6);
  border: var(--border-thin);
  border-radius: var(--radius-lg);
}

.ll-audience-item h3 {
  font-size: var(--text-lg);
  margin-bottom: var(--space-3);
}

.ll-audience-item p {
  font-size: var(--text-sm);
  color: var(--color-ink-medium);
  max-width: none;
}

@media (max-width: 1024px) {
  .ll-layout { grid-template-columns: 1fr; gap: var(--space-8); }
  .ll-audiences { grid-template-columns: 1fr; }
}
</style>
