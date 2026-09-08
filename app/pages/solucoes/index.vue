<template>
  <div>
    <section class="section bg-surface-alt" style="padding-top:clamp(4rem,10vw,8rem);" aria-labelledby="solucoes-heading">
      <div class="container">
        <p class="section-label">Todas as Soluções</p>
        <h1 id="solucoes-heading">Software e serviços construídos para operações reais.</h1>
        <p class="lead" style="margin-top:1rem;">
          Três produtos desenvolvidos e operados pela SEDEP, cada um resolvendo um problema específico do universo jurídico e empresarial.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="solucoes-list">
          <article v-for="product in products" :key="product.href" class="solucao-item">
            <div class="solucao-item__info">
              <span class="solucao-item__badge">{{ product.badge }}</span>
              <h2 class="solucao-item__title">{{ product.title }}</h2>
              <p class="solucao-item__desc">{{ product.desc }}</p>
              <p class="solucao-item__audience"><strong>Para:</strong> {{ product.audience }}</p>
            </div>
            <div class="solucao-item__action">
              <BaseButton :to="product.href" variant="primary">{{ product.cta }}</BaseButton>
            </div>
          </article>
        </div>
      </div>
    </section>

    <SectionCTA />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Soluções SEDEP — Software Jurídico e Pesquisa de Processos',
  description: 'Conheça as soluções da SEDEP: Sedep Faz (software jurídico), LegalLake (pesquisa de processos) e Acompanhamento de Publicações.',
})

const products = [
  {
    badge: 'Software Jurídico',
    title: 'Sedep Faz',
    desc: 'Sistema completo de gestão da rotina jurídica. Processos, prazos, publicações, financeiro e CRM em um único ambiente.',
    audience: 'Advogados autônomos, escritórios de advocacia de todos os portes.',
    href: '/solucoes/faz',
    cta: 'Conhecer o Faz',
  },
  {
    badge: 'Pesquisa Jurídica',
    title: 'LegalLake',
    desc: 'Motor de busca com mais de 800 milhões de processos indexados. Pesquise pessoas, empresas, advogados e processos em escala nacional.',
    audience: 'Advogados, departamentos jurídicos, compliance, cobrança.',
    href: '/solucoes/legallake',
    cta: 'Explorar LegalLake',
  },
  {
    badge: 'Monitoramento',
    title: 'Acompanhamento e Publicações',
    desc: 'Monitoramento automatizado de nomes, OABs e termos nos Diários Oficiais. Alertas em tempo real para nenhuma publicação passar despercebida.',
    audience: 'Escritórios de advocacia, departamentos jurídicos.',
    href: '/solucoes/acompanhamento-publicacoes',
    cta: 'Conhecer Publicações',
  },
]
</script>

<style scoped>
.solucoes-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.solucao-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-12);
  align-items: center;
  padding: var(--space-10) 0;
  border-bottom: var(--border-thin);
}

.solucao-item:last-child {
  border-bottom: none;
}

.solucao-item__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.solucao-item__badge {
  display: inline-block;
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-caps);
  text-transform: uppercase;
  color: var(--color-sedep-blue-mid);
  background-color: var(--color-sedep-blue-light);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-sm);
  align-self: flex-start;
}

.solucao-item__title {
  font-size: var(--text-3xl);
  color: var(--color-ink);
}

.solucao-item__desc {
  font-size: var(--text-md);
  color: var(--color-ink-medium);
  max-width: 65ch;
}

.solucao-item__audience {
  font-size: var(--text-sm);
  color: var(--color-ink-light);
  max-width: none;
}

@media (max-width: 768px) {
  .solucao-item {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}
</style>
