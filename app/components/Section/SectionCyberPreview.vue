<template>
  <section class="cyber section" aria-labelledby="cyber-heading">
    <div class="container">
      <div class="cyber__layout">

        <!-- Visual — geométrico, preciso, sem clichês de "hacker" -->
        <div class="cyber__visual" aria-hidden="true">
          <div class="cyber__visual-frame">
            <div class="cyber__visual-grid">
              <span v-for="n in 16" :key="n" class="cyber__visual-cell" :class="`cyber__visual-cell--${n}`" />
            </div>
            <div class="cyber__visual-center">
              <div class="cyber__visual-ring" />
              <div class="cyber__visual-ring cyber__visual-ring--md" />
              <div class="cyber__visual-ring cyber__visual-ring--lg" />
              <span class="cyber__visual-label">Monitoramento contínuo</span>
            </div>
          </div>
        </div>

        <div class="cyber__content">
          <p class="section-label">Cyber Security</p>
          <h2 id="cyber-heading" class="cyber__title">
            Segurança não é produto. É disciplina.
          </h2>
          <p class="cyber__desc">
            A SEDEP atua com segurança da informação como uma prática permanente — não como um checklist. Governança, prevenção, monitoramento e resposta para operações que não podem se dar ao luxo de imprevistos.
          </p>

          <div class="cyber__pillars">
            <div class="cyber__pillar">
              <span class="cyber__pillar-title">Prevenção</span>
              <p class="cyber__pillar-desc">Identificação proativa de vulnerabilidades antes que se tornem problemas.</p>
            </div>
            <div class="cyber__pillar">
              <span class="cyber__pillar-title">Governança</span>
              <p class="cyber__pillar-desc">Políticas, processos e controles que sustentam a segurança no dia a dia.</p>
            </div>
            <div class="cyber__pillar">
              <span class="cyber__pillar-title">Continuidade</span>
              <p class="cyber__pillar-desc">Estrutura para garantir que incidentes não paralisem operações.</p>
            </div>
          </div>

          <BaseButton to="/cyber-security" variant="primary">
            Conhecer Cyber Security
          </BaseButton>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.cyber {
  background-color: var(--color-sedep-blue-subtle);
  border-top: var(--border-thin);
  border-bottom: var(--border-thin);
}

.cyber__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

/* Visual — anéis concêntricos com grid de fundo */
.cyber__visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cyber__visual-frame {
  width: 320px;
  height: 320px;
  position: relative;
}

.cyber__visual-grid {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 2px;
}

.cyber__visual-cell {
  background-color: var(--color-sedep-blue-light);
  border-radius: 2px;
  opacity: 0.4;
}

/* Alguns cells em destaque — simulando dados ativos */
.cyber__visual-cell--2,
.cyber__visual-cell--5,
.cyber__visual-cell--8,
.cyber__visual-cell--11,
.cyber__visual-cell--14 {
  background-color: var(--color-sedep-blue-mid);
  opacity: 0.3;
}

.cyber__visual-cell--3,
.cyber__visual-cell--7,
.cyber__visual-cell--12 {
  background-color: var(--color-accent);
  opacity: 0.2;
}

.cyber__visual-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: var(--space-3);
}

.cyber__visual-ring {
  position: absolute;
  border: 1px solid var(--color-sedep-blue-mid);
  border-radius: 50%;
  opacity: 0.25;
  width: 100px;
  height: 100px;
}

.cyber__visual-ring--md {
  width: 180px;
  height: 180px;
  opacity: 0.15;
}

.cyber__visual-ring--lg {
  width: 260px;
  height: 260px;
  opacity: 0.08;
}

.cyber__visual-label {
  position: relative;
  z-index: 1;
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-caps);
  text-transform: uppercase;
  color: var(--color-sedep-blue-mid);
  background-color: var(--color-sedep-blue-subtle);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  border: var(--border-thin);
  text-align: center;
}

/* Conteúdo */
.cyber__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.cyber__title {
  font-size: var(--text-4xl);
  color: var(--color-ink);
  max-width: 18ch;
}

.cyber__desc {
  font-size: var(--text-md);
  color: var(--color-ink-medium);
  line-height: var(--line-height-relaxed);
}

/* Pilares */
.cyber__pillars {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: var(--border-thin);
}

.cyber__pillar {
  padding: var(--space-5) 0;
  border-bottom: var(--border-thin);
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: var(--space-4);
  align-items: start;
}

.cyber__pillar-title {
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-sedep-blue-mid);
}

.cyber__pillar-desc {
  font-size: var(--text-sm);
  color: var(--color-ink-medium);
  max-width: none;
}

/* Responsive */
@media (max-width: 1024px) {
  .cyber__layout {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }

  .cyber__visual {
    order: -1;
  }

  .cyber__visual-frame {
    width: 240px;
    height: 240px;
  }
}
</style>
