<template>
  <section class="metrics-bar" aria-label="Métricas e confiança da SEDEP">
    <div class="container">
      <div class="metrics-bar__grid">

        <!-- Métrica 1: Avaliação e Estrelas -->
        <div class="metric-item">
          <div class="metric-item__stars" aria-label="Avaliação 4.8 de 5 estrelas">
            <span v-for="n in 5" :key="n" class="metric-star">★</span>
            <span class="metric-val">4,8</span>
          </div>
          <p class="metric-label">avaliada por mais de 2.600 bancas e advogados</p>
        </div>

        <!-- Métrica 2: 800 Milhões de Processos -->
        <div class="metric-item">
          <div class="metric-val-large">800 milhões</div>
          <p class="metric-label">de processos indexados no LegalLake</p>
        </div>

        <!-- Métrica 3: Horas Economizadas / Produtividade -->
        <div class="metric-item">
          <div class="metric-val-large">+40 anos</div>
          <p class="metric-label">de solidez, tecnologia e suporte especializado</p>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.metrics-bar {
  padding: var(--space-12) 0;
  background-color: #FFFFFF;
  border-top: 1px solid var(--color-border-subtle);
  border-bottom: 1px solid var(--color-border-subtle);
}

.metrics-bar__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
  align-items: center;
  text-align: center;
}

.metric-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.metric-item__stars {
  display: flex;
  align-items: center;
  gap: 3px;
}

.metric-star {
  color: #0F172A;
  font-size: 1.25rem;
  line-height: 1;
}

.metric-val {
  font-family: var(--font-display);
  font-size: 1.875rem;
  font-weight: 800;
  color: #0F172A;
  margin-left: 6px;
  line-height: 1;
}

.metric-val-large {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0F172A;
  line-height: 1;
}

.metric-label {
  font-size: var(--text-sm);
  color: var(--color-ink-light);
  max-width: 24ch;
  line-height: 1.4;
  margin: 0;
}

@media (max-width: 768px) {
  .metrics-bar__grid {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}
</style>
