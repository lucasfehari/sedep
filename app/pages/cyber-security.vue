<template>
  <div>
    <section class="section bg-dark on-dark" style="padding-top:clamp(4rem,10vw,8rem);background-color:var(--color-ink);" aria-labelledby="cyber-page-heading">
      <div class="container">
        <div style="max-width:720px;">
          <p class="section-label section-label--light">Cyber Security</p>
          <h1 id="cyber-page-heading" style="font-size:var(--text-hero);color:#FFF;margin:1rem 0;">
            Segurança não é produto. É disciplina contínua.
          </h1>
          <p class="lead">
            A SEDEP atua com segurança da informação como prática permanente — não como checklist anual. Governança, prevenção, monitoramento e capacidade de resposta para operações que não podem se dar ao luxo de imprevistos.
          </p>
          <div style="margin-top:2rem;">
            <BaseButton to="/experimente" variant="primary" size="lg">Falar com especialista</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="cyber-pilares-heading">
      <div class="container">
        <h2 id="cyber-pilares-heading">Como trabalhamos segurança.</h2>
        <div style="display:flex;flex-direction:column;gap:0;border-top:var(--border-thin);margin-top:3rem;">
          <div v-for="pillar in pillars" :key="pillar.title" class="cyber-pillar">
            <div class="cyber-pillar__num" aria-hidden="true">{{ pillar.num }}</div>
            <div>
              <h3>{{ pillar.title }}</h3>
              <p>{{ pillar.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-surface-alt" aria-labelledby="cyber-para-heading">
      <div class="container">
        <h2 id="cyber-para-heading">Para quem é.</h2>
        <p style="margin-top:1rem;max-width:60ch;">
          Cyber Security da SEDEP é adequado para empresas e escritórios que operam com dados sensíveis — especialmente em contextos jurídicos, financeiros, de saúde ou que processam dados pessoais sob a LGPD.
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
  title: 'Cyber Security — Segurança da Informação | SEDEP',
  description: 'A SEDEP oferece Cyber Security como disciplina contínua: governança, prevenção, monitoramento e resposta a incidentes para operações críticas.',
})

const pillars = [
  { num: '01', title: 'Governança de Segurança', desc: 'Políticas, processos e estrutura de controles que sustentam a segurança no dia a dia da operação. Segurança que funciona mesmo quando não há crise.' },
  { num: '02', title: 'Avaliação e Prevenção', desc: 'Identificação proativa de vulnerabilidades antes que se tornem problemas. Avaliação técnica da superfície de ataque e plano de mitigação.' },
  { num: '03', title: 'Monitoramento Contínuo', desc: 'Visibilidade sobre o que acontece nos ambientes críticos. Detecção de anomalias e atividades suspeitas antes que causem dano.' },
  { num: '04', title: 'Resposta a Incidentes', desc: 'Estrutura para responder a incidentes de forma controlada, minimizando impacto e garantindo que operações críticas retomem em tempo mínimo.' },
  { num: '05', title: 'Conformidade e LGPD', desc: 'Integração entre segurança técnica e conformidade legal. Cyber Security e LGPD tratados como disciplinas complementares, não separadas.' },
]
</script>

<style scoped>
.cyber-pillar {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: var(--space-6);
  padding: var(--space-8) 0;
  border-bottom: var(--border-thin);
  align-items: start;
}
.cyber-pillar__num {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-sedep-blue-mid);
  opacity: 0.5;
  padding-top: 4px;
}
.cyber-pillar h3 { font-size: var(--text-xl); color: var(--color-ink); margin-bottom: var(--space-3); }
.cyber-pillar p { font-size: var(--text-base); color: var(--color-ink-medium); max-width: 65ch; }
</style>
