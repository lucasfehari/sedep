<template>
  <div>
    <section class="section" style="padding-top:clamp(4rem,10vw,8rem);" aria-labelledby="lgpd-heading">
      <div class="container">
        <div style="max-width:720px;">
          <p class="section-label">LGPD e Privacidade</p>
          <h1 id="lgpd-heading">Adequação à LGPD como processo, não como evento único.</h1>
          <p class="lead" style="margin-top:1.5rem;">
            A Lei Geral de Proteção de Dados não é um projeto com data de encerramento. É uma mudança permanente na forma como organizações coletam, tratam e protegem dados pessoais. A SEDEP apoia empresas nessa jornada contínua.
          </p>
        </div>
      </div>
    </section>

    <section class="section bg-surface-alt" aria-labelledby="lgpd-o-que-heading">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;" class="lgpd-grid">
          <div>
            <h2 id="lgpd-o-que-heading">O que a adequação envolve.</h2>
            <p style="margin-top:1rem;">
              Adequação à LGPD não é instalar um software ou publicar um documento de política de privacidade. É um conjunto de decisões, processos e controles técnicos e organizacionais que precisam ser projetados, implementados e mantidos.
            </p>
            <p style="margin-top:1rem;">
              A SEDEP integra perspectiva técnica (sistemas, infraestrutura, segurança) e perspectiva de processos (mapeamento de dados, governança, resposta a titulares) para uma adequação real — não apenas formal.
            </p>
          </div>
          <div>
            <h3 style="margin-bottom:1.5rem;">O que cobrimos.</h3>
            <div style="display:flex;flex-direction:column;gap:0;border-top:var(--border-thin);">
              <div v-for="item in coverage" :key="item" style="padding:0.875rem 0;border-bottom:var(--border-thin);font-size:var(--text-sm);color:var(--color-ink-medium);">
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="lgpd-para-heading">
      <div class="container">
        <h2 id="lgpd-para-heading">Para quem é.</h2>
        <p style="max-width:60ch;margin-top:1rem;">
          Escritórios de advocacia, consultórios, empresas de saúde, e-commerces, departamentos de RH e qualquer organização que colete ou trate dados pessoais de clientes, colaboradores ou parceiros — especialmente em setores onde a LGPD tem maior risco de penalização.
        </p>
        <BaseButton to="/experimente" variant="primary" style="margin-top:2rem;">Solicitar avaliação</BaseButton>
      </div>
    </section>

    <SectionCTA />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
useSeoMeta({
  title: 'LGPD e Privacidade de Dados | SEDEP',
  description: 'A SEDEP apoia empresas na adequação à LGPD com perspectiva técnica e organizacional: mapeamento de dados, governança, segurança e resposta a titulares.',
})

const coverage = [
  'Diagnóstico inicial e inventário de dados pessoais',
  'Mapeamento de fluxos de dados (Data Flow)',
  'Elaboração de Política de Privacidade e Cookies',
  'Definição de bases legais de tratamento',
  'Configuração de mecanismo de consentimento',
  'Plano de resposta a solicitações de titulares',
  'Treinamento de equipes',
  'Integração com controles de segurança da informação',
  'Suporte contínuo pós-adequação',
]
</script>

<style scoped>
@media (max-width: 768px) {
  .lgpd-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
}
</style>
