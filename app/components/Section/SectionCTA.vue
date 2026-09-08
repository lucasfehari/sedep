<template>
  <section class="cta-banner section" aria-labelledby="cta-banner-heading">
    <div class="container">
      <div class="cta-banner__card">
        
        <div class="cta-banner__content">
          <h2 id="cta-banner-heading" class="cta-banner__title">
            Pronto para transformar a gestão do seu escritório?
          </h2>
          <p class="cta-banner__desc">
            Junte-se a milhares de advogados que utilizam as soluções da SEDEP para automatizar tarefas, controlar prazos e focar no que realmente importa.
          </p>

          <div class="cta-banner__actions">
            <BaseButton to="/experimente" variant="primary" size="lg">
              Experimentar o Faz grátis
            </BaseButton>
            <BaseButton to="/atendimento" variant="outline" size="lg">
              Falar com um consultor
            </BaseButton>
          </div>
          
          <div class="cta-banner__badges">
            <span class="cta-banner__badge-item"><AppleEmoji emoji="⚡" :size="14" /> Demonstração personalizada</span>
            <span class="cta-banner__badge-item"><AppleEmoji emoji="🔒" :size="14" /> Sem compromisso</span>
            <span class="cta-banner__badge-item"><AppleEmoji emoji="🤝" :size="14" /> Suporte humano especializado</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-banner {
  padding: var(--section-spacing-md) 0;
  background-color: #FFFFFF;
}

.cta-banner__card {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  border-radius: var(--radius-2xl);
  padding: clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 4rem);
  text-align: center;
  color: #FFFFFF;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.cta-banner__card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 102, 255, 0.25) 0%, transparent 70%);
  pointer-events: none;
}

.cta-banner__content {
  position: relative;
  z-index: 1;
  max-width: 740px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cta-banner__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.2;
  letter-spacing: -0.03em;
  margin-bottom: var(--space-4);
}

.cta-banner__desc {
  font-size: var(--text-lg);
  color: #94A3B8;
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-8);
}

.cta-banner__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-bottom: var(--space-8);
}

.cta-banner__badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
  flex-wrap: wrap;
}

.cta-banner__badge-item {
  font-size: var(--text-xs);
  font-weight: 600;
  color: #CBD5E1;
}

@media (max-width: 640px) {
  .cta-banner__actions {
    flex-direction: column;
    width: 100%;
  }
  .cta-banner__actions .btn {
    width: 100%;
  }
}
</style>
