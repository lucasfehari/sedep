<template>
  <div>
    <!-- Hero da página Faz -->
    <section class="product-hero section bg-dark on-dark" aria-labelledby="faz-heading">
      <div class="container">
        <div class="product-hero__layout">
          <div class="product-hero__content">
            <p class="section-label section-label--light">Software Jurídico</p>
            <div class="product-hero__brand-header">
              <img src="/logo_faz.png" alt="Sedep Faz" class="product-hero__logo" width="140" height="48" />
            </div>
            <h1 id="faz-heading" class="sr-only">
              Sedep Faz — Software de Gestão Jurídica
            </h1>
            <p class="product-hero__sub lead">
              Gestão completa da rotina jurídica. Processos, prazos, publicações e toda a operação do seu escritório em um único lugar — desenvolvido por quem entende o dia a dia jurídico há mais de quatro décadas.
            </p>
            <div class="product-hero__actions">
              <BaseButton to="/experimente" variant="primary" size="lg">
                Solicitar demonstração
              </BaseButton>
              <BaseButton href="https://app.faz.adv.br/" variant="ghost" size="lg" target="_blank" rel="noopener">
                Acessar o Faz
              </BaseButton>
            </div>
          </div>
          <div class="product-hero__badge" aria-hidden="true">
            <img src="/logo_faz.png" alt="Faz" class="product-hero__badge-img" width="180" height="60" />
          </div>
        </div>
      </div>
    </section>

    <!-- Para quem é -->
    <section class="section" aria-labelledby="faz-audience-heading">
      <div class="container">
        <div class="product-section__layout">
          <div>
            <p class="section-label">Para quem é</p>
            <h2 id="faz-audience-heading">Feito para advogados e escritórios de todos os portes.</h2>
            <p class="lead">Do advogado autônomo ao escritório de grande porte — o Faz adapta planos e recursos conforme a realidade da sua prática.</p>
          </div>
          <div class="faz-audiences">
            <div class="faz-audience">
              <h3>Advogados Autônomos</h3>
              <p>Controle completo da carteira com custo acessível. Foco em prazos, publicações e produtividade.</p>
            </div>
            <div class="faz-audience">
              <h3>Pequenos Escritórios</h3>
              <p>Multi-usuário, gestão de clientes, financeiro integrado e fluxo de trabalho colaborativo.</p>
            </div>
            <div class="faz-audience">
              <h3>Grandes Escritórios</h3>
              <p>Analytics, workflow, CRM, ChatBot e recursos avançados para operações de alto volume.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recursos principais -->
    <section class="section bg-surface-alt" aria-labelledby="faz-features-heading">
      <div class="container">
        <p class="section-label">Recursos Principais</p>
        <h2 id="faz-features-heading">O que o Faz oferece.</h2>
        <div class="faz-features">
          <div v-for="feature in features" :key="feature.title" class="faz-feature">
            <h3 class="faz-feature__title">{{ feature.title }}</h3>
            <p class="faz-feature__desc">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <SectionCTA />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Sedep Faz — Software de Gestão Jurídica | SEDEP',
  description: 'O Sedep Faz é um software jurídico completo para gestão de processos, prazos, publicações e rotina de escritórios de advocacia. Desenvolvido pela SEDEP desde 1981.',
})

const features = [
  { title: 'Acompanhamento de Publicações', desc: 'Captura automática de publicações nos Diários Oficiais por OAB, CPF/CNPJ ou termo.' },
  { title: 'Andamentos Processuais', desc: 'Busca automática de andamentos nos principais tribunais do Brasil.' },
  { title: 'Captura de Intimações', desc: 'Captura eletrônica de intimações diretamente dos sistemas dos tribunais.' },
  { title: 'Contagem de Prazos', desc: 'Contagem automática de prazos processuais com alertas e agenda integrada.' },
  { title: 'Agenda e Google Calendar', desc: 'Agenda jurídica sincronizada com Google Calendar. Compromissos e audiências organizados.' },
  { title: 'Emissão de Boletos', desc: 'Emita boletos para clientes diretamente do sistema, sem processos externos.' },
  { title: 'Assinatura Eletrônica', desc: 'Assine documentos eletronicamente com validade jurídica.' },
  { title: 'Workflow', desc: 'Fluxos de trabalho personalizáveis para automatizar tarefas repetitivas no escritório.' },
  { title: 'Analytics', desc: 'Relatórios e métricas de desempenho do escritório — produtividade, receita, prazos.' },
  { title: 'CRM', desc: 'Gestão de relacionamento com clientes integrada ao fluxo jurídico.' },
  { title: 'ChatBot', desc: 'Atendimento inicial automatizado para triagem de consultas de clientes.' },
  { title: 'Armazenamento na Nuvem', desc: 'Documentos, petições e anexos armazenados com segurança em nuvem.' },
]
</script>

<style scoped>
.product-hero {
  background-color: var(--color-sedep-blue);
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.product-hero__layout {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-16);
  align-items: center;
}

.product-hero__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.product-hero__brand-header {
  display: flex;
  align-items: center;
}

.product-hero__logo {
  height: 48px;
  width: auto;
  object-fit: contain;
  filter: brightness(0);
}

.product-hero__badge-img {
  height: 60px;
  width: auto;
  object-fit: contain;
  filter: brightness(0);
}

.product-hero__title {
  font-size: clamp(3rem, 8vw, 6rem);
  color: #FFFFFF;
  letter-spacing: var(--letter-spacing-tight);
  line-height: 1;
}

.product-hero__sub {
  max-width: 52ch;
}

.product-hero__actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.product-hero__badge {
  width: 200px;
  height: 200px;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.product-hero__badge-text {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);
  color: rgba(255,255,255,0.3);
  letter-spacing: -2px;
}

.product-section__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: start;
}

.faz-audiences {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.faz-audience {
  padding: var(--space-6) 0;
  border-bottom: var(--border-thin);
}

.faz-audience h3 {
  font-size: var(--text-lg);
  color: var(--color-ink);
  margin-bottom: var(--space-2);
}

.faz-audience p {
  font-size: var(--text-base);
  color: var(--color-ink-medium);
  max-width: 45ch;
}

.faz-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
  margin-top: var(--space-10);
}

.faz-feature {
  border-left: 2px solid var(--color-sedep-blue-light);
  padding-left: var(--space-4);
}

.faz-feature__title {
  font-size: var(--text-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-ink);
  margin-bottom: var(--space-2);
}

.faz-feature__desc {
  font-size: var(--text-sm);
  color: var(--color-ink-medium);
  max-width: none;
}

@media (max-width: 1024px) {
  .product-hero__layout,
  .product-section__layout {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
  .product-hero__badge { display: none; }
  .faz-features { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 640px) {
  .faz-features { grid-template-columns: 1fr; }
  .product-hero__actions { flex-direction: column; }
}
</style>
