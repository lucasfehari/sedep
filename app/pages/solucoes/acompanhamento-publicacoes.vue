<template>
  <div>
    <section class="product-hero section bg-dark on-dark">
      <div class="container">
        <p class="section-label section-label--light">Monitoramento</p>
        <h1 style="font-size:clamp(2.5rem,6vw,5rem);color:#FFF;margin:1rem 0 1.5rem;letter-spacing:-0.025em;">
          Acompanhamento e Publicações
        </h1>
        <p class="lead">
          Monitoramento automatizado de nomes, OABs e termos nos Jornais Oficiais. Nunca perca uma publicação relevante para seus clientes.
        </p>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-top:1.5rem;">
          <BaseButton to="/experimente" variant="primary" size="lg">Solicitar demonstração</BaseButton>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;">
          <div>
            <p class="section-label">O que é</p>
            <h2>Monitoramento contínuo dos Jornais Oficiais.</h2>
            <p class="lead">
              A solução de Acompanhamento e Publicações da SEDEP monitora automaticamente a presença de nomes, OABs, CPFs, CNPJs e termos específicos nas publicações dos Diários Oficiais — nacional e estaduais.
            </p>
            <p style="margin-top:1rem;">
              Cada nova publicação relevante é capturada e notificada, eliminando a necessidade de varredura manual diária — um processo propenso a erros e consumidor de tempo.
            </p>
          </div>
          <div>
            <p class="section-label">Recursos</p>
            <div style="display:flex;flex-direction:column;gap:0;border-top:var(--border-thin);">
              <div v-for="item in features" :key="item" style="padding:1rem 0;border-bottom:var(--border-thin);font-size:var(--text-base);color:var(--color-ink-medium);">
                {{ item }}
              </div>
            </div>
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
  title: 'Acompanhamento e Publicações — Monitoramento de Jornais Oficiais | SEDEP',
  description: 'Monitoramento automatizado de nomes, OABs e termos nos Diários Oficiais. Solução SEDEP para escritórios de advocacia e departamentos jurídicos.',
})

const features = [
  'Monitoramento em Diários Oficiais federais e estaduais',
  'Captura por nome, OAB, CPF ou CNPJ',
  'Alertas automáticos de novas publicações',
  'Cobertura nacional',
  'Integração com Sedep Faz',
  'Histórico de publicações capturadas',
]
</script>

<style scoped>
.product-hero {
  background-color: var(--color-sedep-blue);
  padding-top: var(--section-spacing-lg);
  padding-bottom: var(--section-spacing-lg);
}

@media (max-width: 768px) {
  div[style*="grid-template-columns:1fr 1fr"] {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
  }
}
</style>
