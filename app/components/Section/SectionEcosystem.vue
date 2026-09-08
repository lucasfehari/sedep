<template>
  <section class="ecosystem-saas section" aria-labelledby="eco-heading">
    <div class="container">
      
      <!-- Section Header -->
      <div class="ecosystem-saas__header">
        <div class="badge-pill">
          <span>Ecossistema SEDEP</span>
        </div>
        <h2 id="eco-heading" class="ecosystem-saas__title">
          Tecnologia completa para impulsionar sua operação de ponta a ponta
        </h2>
        <p class="lead ecosystem-saas__desc">
          Além do software jurídico, a SEDEP oferece a robustez técnica e de segurança que sua infraestrutura precisa.
        </p>
      </div>

      <!-- 3-Column SaaS Cards Grid -->
      <div class="ecosystem-saas__grid">

        <!-- Card 1: Software & Automação -->
        <div class="saas-card">
          <div class="saas-card__icon-wrap saas-card__icon-wrap--blue">
            <AppleEmoji emoji="⚡" :size="26" />
          </div>
          <h3 class="saas-card__title">Software & Automação Jurídica</h3>
          <p class="saas-card__desc">
            Sistemas próprios em nuvem para gestão completa de processos, intimações em tempo real e inteligência operacional.
          </p>
          <NuxtLink to="/solucoes/faz" class="saas-card__link">
            Conhecer Sedep Faz →
          </NuxtLink>
        </div>

        <!-- Card 2: Pesquisa & Inteligência de Dados -->
        <div class="saas-card">
          <div class="saas-card__icon-wrap saas-card__icon-wrap--navy">
            <AppleEmoji emoji="🔍" :size="26" />
          </div>
          <h3 class="saas-card__title">Pesquisa & Big Data Processual</h3>
          <p class="saas-card__desc">
            Base indexada com mais de 800 milhões de processos para pesquisas aprofundadas, jurimetria e análise de contrapartes.
          </p>
          <NuxtLink to="/solucoes/legallake" class="saas-card__link">
            Explorar LegalLake →
          </NuxtLink>
        </div>

        <!-- Card 3: Cyber Security & LGPD -->
        <div class="saas-card">
          <div class="saas-card__icon-wrap saas-card__icon-wrap--green">
            <AppleEmoji emoji="🛡️" :size="26" />
          </div>
          <h3 class="saas-card__title">Cyber Security & Conformidade LGPD</h3>
          <p class="saas-card__desc">
            Governança, segurança da informação e proteção permanente de dados para operações jurídicas críticas.
          </p>
          <NuxtLink to="/cyber-security" class="saas-card__link">
            Ver Segurança & LGPD →
          </NuxtLink>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
.ecosystem-saas {
  padding: var(--section-spacing-md) 0;
  background-color: var(--color-surface-alt);
}

.ecosystem-saas__header {
  text-align: center;
  max-width: 760px;
  margin: 0 auto var(--space-12);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ecosystem-saas__title {
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: #0F172A;
  margin-bottom: var(--space-3);
  letter-spacing: -0.03em;
}

.ecosystem-saas__desc {
  color: var(--color-ink-light);
}

.ecosystem-saas__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.saas-card {
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);
}

.saas-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-border-hover);
}

.saas-card__icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: var(--space-6);
}

.saas-card__icon-wrap--blue { background: #EBF3FF; }
.saas-card__icon-wrap--navy { background: #F1F5F9; }
.saas-card__icon-wrap--green { background: #E6F8F0; }

.saas-card__title {
  font-size: var(--text-xl);
  font-weight: 800;
  color: #0F172A;
  margin-bottom: var(--space-3);
  line-height: 1.3;
}

.saas-card__desc {
  font-size: var(--text-sm);
  line-height: var(--line-height-relaxed);
  color: var(--color-ink-medium);
  margin-bottom: var(--space-6);
  flex: 1;
}

.saas-card__link {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.saas-card__link:hover {
  color: var(--color-primary-hover);
}

@media (max-width: 1024px) {
  .ecosystem-saas__grid {
    grid-template-columns: 1fr;
  }
}
</style>
