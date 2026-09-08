<template>
  <section class="hero" aria-labelledby="hero-heading">
    <div class="container">
      <!-- Hero Header Centralizado -->
      <div class="hero__header">
        <!-- Social Proof Pill Badge com Apple Emoji -->
        <div class="badge-pill hero__pill">
          <span>+40 anos de pioneirismo e tecnologia jurídica</span>
        </div>

        <!-- Headline de Alto Impacto -->
        <h1 id="hero-heading" class="hero__title">
          Softwares de gestão jurídica com inteligência integrada para
          potencializar a sua advocacia
          <span class="hero__spark"><AppleEmoji emoji="✨" :size="36" /></span>
        </h1>

        <!-- Subtítulo Estratégico -->
        <p class="hero__subtitle">
          Centralize processos, publicações, prazos e inteligência de dados em
          um ecossistema seguro e de alta performance.
        </p>

        <!-- Ações Principais -->
        <div class="hero__actions">
          <BaseButton to="/solucoes" variant="dark" size="lg">
            Conheça nossos softwares
          </BaseButton>
          <BaseButton to="/sobre" variant="secondary" size="lg">
            Conheça a SEDEP
          </BaseButton>
        </div>
      </div>

      <!-- Hero Visual Showcase: Ilustração Oficial do Sistema SEDEP Faz -->
      <div class="hero__showcase">
        <!-- Fundo Glow Suave de Profundidade -->
        <div class="hero__glow hero__glow--primary" aria-hidden="true" />
        <div class="hero__glow hero__glow--accent" aria-hidden="true" />

        <!-- Floating Badge Esquerdo: Andamentos & Publicações -->
        <div
          class="hero__floating-badge hero__floating-badge--left"
          aria-hidden="true"
        >
          <div class="floating-badge__icon floating-badge__icon--blue">
            <AppleEmoji emoji="⚡" :size="20" />
          </div>
          <div class="floating-badge__content">
            <span class="floating-badge__title">Intimações em Tempo Real</span>
            <span class="floating-badge__sub"
              >Captura automática nos Diários Oficiais</span
            >
          </div>
        </div>

        <!-- Moldura Central do Sistema -->
        <div class="hero__system-frame">
          <div class="hero__system-wrapper">
            <img
              src="/ilustra-faz.png"
              alt="Interface do software jurídico SEDEP Faz em execução com painéis de andamentos, tarefas e agenda"
              class="hero__system-img"
              loading="eager"
              width="1200"
              height="500"
            />
          </div>
        </div>

        <!-- Floating Badge Direito: Inteligência & Prazos -->
        <div
          class="hero__floating-badge hero__floating-badge--right"
          aria-hidden="true"
        >
          <div class="floating-badge__icon floating-badge__icon--green">
            <AppleEmoji emoji="🤖" :size="20" />
          </div>
          <div class="floating-badge__content">
            <span class="floating-badge__title">Gestão e IA Integrada</span>
            <span class="floating-badge__sub"
              >+800 milhões de processos indexados</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: clamp(3.5rem, 6vw, 5.5rem);
  padding-bottom: 0;
  background: linear-gradient(
    175deg,
    #ffffff 0%,
    #ebf2ff 30%,
    #e6f0ff 40%,
    var(--color-faz-light, #8faef5) 60%
  );
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid var(--color-border-subtle);
}

/* Header Centralizado */
.hero__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 920px;
  margin: 0 auto clamp(2rem, 3.5vw, 3rem);
}

.hero__pill {
  cursor: default;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.hero__title {
  font-size: var(--text-hero);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.035em;
  color: #0f172a;
  margin-bottom: var(--space-4);
}

.hero__spark {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  margin-left: 4px;
}

.hero__subtitle {
  font-size: var(--text-lg);
  color: var(--color-ink-medium);
  line-height: var(--line-height-relaxed);
  max-width: 640px;
  margin: 0 auto var(--space-8);
}

.hero__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

/* Showcase do Sistema — Grudado na base da Hero */
.hero__showcase {
  position: relative;
  max-width: 1140px;
  margin: var(--space-6) auto 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

/* Glow de Fundo */
.hero__glow {
  position: absolute;
  width: 550px;
  height: 350px;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 1;
  opacity: 0.6;
}

.hero__glow--primary {
  background: radial-gradient(
    circle,
    rgba(0, 102, 255, 0.15) 0%,
    transparent 70%
  );
  top: 10%;
  left: 15%;
}

.hero__glow--accent {
  background: radial-gradient(
    circle,
    rgba(0, 168, 104, 0.12) 0%,
    transparent 70%
  );
  bottom: 5%;
  right: 15%;
}

/* Moldura do Sistema — Grudada no Início/Base */
.hero__system-frame {
  position: relative;
  z-index: 2;
  width: 100%;
  border-radius: 24px 24px 0 0;
  padding: 10px 10px 0 10px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(241, 245, 249, 0.8) 100%
  );
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-bottom: none;
  box-shadow:
    0 -12px 40px -10px rgba(15, 23, 42, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.8) inset;
  backdrop-filter: blur(12px);
  transition:
    transform var(--transition-normal),
    box-shadow var(--transition-normal);
}

.hero__system-frame:hover {
  box-shadow:
    0 -16px 50px -10px rgba(0, 102, 255, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.9) inset;
}

.hero__system-wrapper {
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__system-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 16px 16px 0 0;
}

/* Floating Badges com Emojis de iPhone */
.hero__floating-badge {
  position: absolute;
  z-index: 4;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.9);
  padding: 10px 16px;
  border-radius: var(--radius-xl);
  box-shadow: 0 12px 30px -6px rgba(15, 23, 42, 0.12);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  pointer-events: none;
  animation: float 6s ease-in-out infinite;
}

.hero__floating-badge--left {
  left: -20px;
  top: 20%;
  animation-delay: 0s;
}

.hero__floating-badge--right {
  right: -20px;
  bottom: 18%;
  animation-delay: 3s;
}

.floating-badge__icon {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.floating-badge__icon--blue {
  background: #ebf3ff;
}

.floating-badge__icon--green {
  background: #e6f8f0;
}

.floating-badge__content {
  display: flex;
  flex-direction: column;
}

.floating-badge__title {
  font-size: var(--text-xs);
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.01em;
}

.floating-badge__sub {
  font-size: 11px;
  color: var(--color-ink-light);
  font-weight: 500;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .hero__floating-badge {
    display: none;
  }
}

@media (max-width: 640px) {
  .hero__actions {
    flex-direction: column;
    width: 100%;
  }
  .hero__actions .btn {
    width: 100%;
  }
  .hero__system-frame {
    padding: 6px;
    border-radius: var(--radius-lg);
  }
}
</style>
