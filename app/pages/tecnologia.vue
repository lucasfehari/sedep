<template>
  <div>
    <section class="section" style="padding-top:clamp(4rem,10vw,8rem);" aria-labelledby="tech-page-heading">
      <div class="container">
        <div style="max-width:720px;">
          <p class="section-label">Tecnologia</p>
          <h1 id="tech-page-heading">A capacidade técnica por trás dos produtos SEDEP.</h1>
          <p class="lead" style="margin-top:1.5rem;">
            Os produtos da SEDEP existem porque há, por trás deles, competência real em desenvolvimento de software, arquitetura de sistemas e infraestrutura de TI. Essa mesma competência está disponível como serviço para empresas.
          </p>
        </div>
      </div>
    </section>

    <section class="section bg-surface-alt" aria-labelledby="cap-tech-heading">
      <div class="container">
        <h2 id="cap-tech-heading">O que fazemos em tecnologia.</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;margin-top:3rem;" class="tech-cap-grid">
          <div v-for="cap in capabilities" :key="cap.title" class="tech-cap">
            <h3>{{ cap.title }}</h3>
            <p>{{ cap.desc }}</p>
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
  title: 'Tecnologia e Infraestrutura de TI | SEDEP',
  description: 'SEDEP oferece desenvolvimento de software, infraestrutura de TI, integrações e suporte técnico especializado para operações empresariais críticas.',
})

const capabilities = [
  { title: 'Desenvolvimento de Software', desc: 'Sistemas desenvolvidos internamente pela SEDEP para resolver problemas reais — não adaptações de templates genéricos. Arquitetura pensada para escala, confiabilidade e manutenção.' },
  { title: 'Integração de Sistemas', desc: 'Integrações entre plataformas, automações de fluxo e APIs. Conectamos sistemas que precisam conversar entre si sem intervenção manual.' },
  { title: 'CRM e Automação', desc: 'Implementação e customização de CRM para equipes jurídicas e empresariais. Eliminar trabalho repetitivo e melhorar o rastreamento de relacionamentos.' },
  { title: 'Infraestrutura e Suporte de TI', desc: 'Estrutura tecnológica, monitoramento e suporte contínuo para operações que dependem de disponibilidade. Não é suporte reativo — é presença técnica permanente.' },
  { title: 'Arquitetura e Consultoria', desc: 'Avaliação da estrutura técnica existente, identificação de riscos e oportunidades, e definição de caminhos para evolução sem ruptura operacional.' },
  { title: 'Sistemas em Nuvem', desc: 'Migração, hospedagem e operação de sistemas em ambientes de nuvem. Segurança, custo-eficiência e escalabilidade como critérios de decisão.' },
]
</script>

<style scoped>
.tech-cap { padding: var(--space-6); border: var(--border-thin); border-radius: var(--radius-lg); }
.tech-cap h3 { font-size: var(--text-lg); color: var(--color-ink); margin-bottom: var(--space-3); }
.tech-cap p { font-size: var(--text-sm); color: var(--color-ink-medium); max-width: none; }

@media (max-width: 768px) {
  .tech-cap-grid { grid-template-columns: 1fr !important; }
}
</style>
