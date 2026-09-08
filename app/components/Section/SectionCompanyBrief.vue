<template>
  <section class="company section" aria-labelledby="company-heading">
    <div class="container">
      <div class="company__layout">

        <!-- Coluna de texto — alinhada à esquerda, editorial -->
        <div class="company__content">
          <p class="section-label">A Empresa</p>
          <h2 id="company-heading" class="company__title">
            Uma empresa que cresceu junto com a tecnologia brasileira.
          </h2>
          <div class="company__text">
            <p>
              Fundada em 1981, a SEDEP começou quando a tecnologia empresarial no Brasil ainda era rara. Ao longo das décadas, acompanhou e integrou cada transformação: da operação manual à digitalização, dos sistemas locais às soluções em nuvem, do processo físico ao software jurídico.
            </p>
            <p>
              Essa trajetória não é só história. É a razão pela qual a SEDEP compreende, de forma prática, as necessidades de empresas e profissionais que dependem de sistemas críticos — porque construiu soluções reais para eles ao longo de mais de quarenta anos.
            </p>
            <p>
              Hoje, a SEDEP opera como uma empresa de tecnologia com competências em desenvolvimento de software, infraestrutura, segurança da informação e produtos jurídicos. Produtos construídos por uma equipe que conhece os problemas de dentro.
            </p>
          </div>
          <BaseButton to="/sobre" variant="secondary">
            Conhecer a história da SEDEP
          </BaseButton>
        </div>

        <!-- Linha do tempo editorial — horizontal, sem bolinhas e setas genéricas -->
        <div class="company__timeline" aria-label="Marcos da empresa">
          <div class="company__timeline-line" aria-hidden="true" />
          <div class="company__milestone">
            <span class="company__milestone-year">1981</span>
            <span class="company__milestone-desc">Fundação da SEDEP</span>
          </div>
          <div class="company__milestone">
            <span class="company__milestone-year">1990s</span>
            <span class="company__milestone-desc">Digitalização de processos</span>
          </div>
          <div class="company__milestone">
            <span class="company__milestone-year">2000s</span>
            <span class="company__milestone-desc">Desenvolvimento de sistemas próprios</span>
          </div>
          <div class="company__milestone">
            <span class="company__milestone-year">2010s</span>
            <span class="company__milestone-desc">Software jurídico em nuvem</span>
          </div>
          <div class="company__milestone company__milestone--current">
            <span class="company__milestone-year">Hoje</span>
            <span class="company__milestone-desc">Tecnologia, segurança e produtos digitais</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.company {
  background-color: var(--color-surface);
  border-top: var(--border-thin);
}

.company__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: start;
}

/* Conteúdo */
.company__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.company__title {
  font-size: var(--text-4xl);
  color: var(--color-ink);
  max-width: 22ch;
}

.company__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.company__text p {
  font-size: var(--text-base);
  line-height: var(--line-height-body);
  color: var(--color-ink-medium);
}

/* Timeline editorial — vertical, sem decoração excessiva */
.company__timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-top: var(--space-2);
}

.company__timeline-line {
  position: absolute;
  left: 6px;
  top: var(--space-4);
  bottom: var(--space-4);
  width: 1px;
  background: linear-gradient(
    to bottom,
    var(--color-border) 0%,
    var(--color-sedep-blue-mid) 50%,
    var(--color-border) 100%
  );
}

.company__milestone {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: var(--space-4);
  padding: var(--space-5) 0 var(--space-5) var(--space-8);
  position: relative;
}

/* Marcador */
.company__milestone::before {
  content: '';
  position: absolute;
  left: 3px;
  top: calc(var(--space-5) + 8px);
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--color-border-strong);
  border: 2px solid var(--color-surface);
}

.company__milestone--current::before {
  background-color: var(--color-sedep-blue-mid);
  width: 9px;
  height: 9px;
  left: 2px;
}

.company__milestone-year {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-sedep-blue-mid);
  line-height: var(--line-height-normal);
}

.company__milestone--current .company__milestone-year {
  color: var(--color-sedep-blue);
}

.company__milestone-desc {
  font-size: var(--text-sm);
  color: var(--color-ink-medium);
  line-height: var(--line-height-normal);
  padding-top: 2px;
}

.company__milestone--current .company__milestone-desc {
  font-weight: var(--font-weight-semibold);
  color: var(--color-ink);
}

/* Responsive */
@media (max-width: 1024px) {
  .company__layout {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }
}
</style>
