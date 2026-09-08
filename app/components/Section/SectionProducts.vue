<template>
  <section
    class="products-compare section"
    id="softwares"
    aria-labelledby="products-compare-heading"
  >
    <div class="container product">
      <div class="products-compare__layout">
        <!-- Coluna Esquerda: Texto Institucional de Impacto -->
        <div class="products-compare__intro">
          <h2 id="products-compare-heading" class="products-compare__title">
            Soluções completas, um só objetivo: elevar o protagonismo da sua
            advocacia
          </h2>
          <p class="products-compare__desc">
            Seja para advogados autônomos, escritórios de advocacia em expansão
            ou departamentos jurídicos corporativos, a SEDEP desenvolve
            softwares de gestão e dados que levam inteligência e segurança para
            você tomar as melhores decisões.
          </p>
        </div>

        <!-- Coluna Direita: Cards de Produto (Sedep Faz vs LegalLake) -->
        <div class="products-compare__cards">
          <!-- Card 1: Sedep Faz (Blue Theme) -->
          <div class="product-card product-card--faz">
            <!-- Target Pills -->
            <div class="product-card__tags">
              <span class="product-card__tag product-card__tag--blue"
                >Para escritórios de advocacia</span
              >
              <span class="product-card__tag product-card__tag--blue"
                >Para advogados autônomos</span
              >
            </div>

            <!-- Brand Header com Logo Oficial Faz -->
            <div class="product-card__brand">
              <img
                src="/logo_faz.png"
                alt="Sedep Faz"
                class="product-card__logo-img product-card__logo-img--faz"
                width="110"
                height="38"
              />
            </div>

            <!-- Feature Bullet List com Apple Emojis -->
            <ul class="product-card__features" role="list">
              <li class="product-card__feature">
                <AppleEmoji emoji="✨" :size="18" />
                <span>Inteligência artificial e automação de prazos</span>
              </li>
              <li class="product-card__feature">
                <AppleEmoji emoji="📱" :size="18" />
                <span>Aplicativo mobile e intimações em tempo real</span>
              </li>
              <li class="product-card__feature">
                <AppleEmoji emoji="💬" :size="18" />
                <span>Integração com WhatsApp e Google Agenda</span>
              </li>
              <li class="product-card__feature">
                <AppleEmoji emoji="💳" :size="18" />
                <span>Gestão financeira, honorários e emissão de boletos</span>
              </li>
            </ul>

            <!-- Bottom CTA Button -->
            <NuxtLink
              to="/solucoes/faz"
              class="product-card__btn product-card__btn--blue"
            >
              Conhecer o Faz &rsaquo;
            </NuxtLink>
          </div>

          <!-- Card 2: LegalLake (Red/Coral Theme) -->
          <div class="product-card product-card--legallake">
            <!-- Target Pills -->
            <div class="product-card__tags">
              <span class="product-card__tag product-card__tag--red"
                >Para departamentos jurídicos</span
              >
              <span class="product-card__tag product-card__tag--red"
                >Para grandes bancas e compliance</span
              >
            </div>

            <!-- Brand Header com Logo Oficial LegalLake -->
            <div class="product-card__brand">
              <img
                src="/logo_legallake.png"
                alt="LegalLake"
                class="product-card__logo-img product-card__logo-img--legallake"
                width="145"
                height="38"
              />
            </div>

            <!-- Feature Bullet List com Apple Emojis -->
            <ul class="product-card__features" role="list">
              <li class="product-card__feature">
                <AppleEmoji emoji="⚖️" :size="18" />
                <span>Mais de 800 milhões de processos indexados</span>
              </li>
              <li class="product-card__feature">
                <AppleEmoji emoji="📊" :size="18" />
                <span>Análise preditiva e jurimetria estratégica</span>
              </li>
              <li class="product-card__feature">
                <AppleEmoji emoji="🔍" :size="18" />
                <span>Pesquisa unificada por OAB, CPF, CNPJ e partes</span>
              </li>
              <li class="product-card__feature">
                <AppleEmoji emoji="📰" :size="18" />
                <span>Monitoramento nacional de Diários Oficiais</span>
              </li>
            </ul>

            <!-- Bottom CTA Button -->
            <NuxtLink
              to="/solucoes/legallake"
              class="product-card__btn product-card__btn--red"
            >
              Explorar LegalLake &rsaquo;
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products-compare {
  padding: var(--section-spacing-md) 0;
  background-color: #f9f9fe;
}

.products-compare__layout {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: var(--space-16);
  align-items: center;
}

.products-compare__intro {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-6);
}

.products-compare__title {
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: #0f172a;
  margin: 0;
}

.products-compare__desc {
  font-size: var(--text-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-ink-medium);
  margin: 0;
}

/* Grid de Cards */
.products-compare__cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

/* Card Base */
.product-card {
  background: #ffffff;
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  transition:
    transform var(--transition-normal),
    box-shadow var(--transition-normal);
  border: 2px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

/* Card Faz (Blue Border) */
.product-card--faz {
  border-color: #1848b8;
}

/* Card LegalLake (Red Border) */
.product-card--legallake {
  border-color: #e84138;
}

/* Target Tags */
.product-card__tags {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  margin-bottom: var(--space-6);
}

.product-card__tag {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  display: inline-block;
}

.product-card__tag--blue {
  background-color: #ebf3ff;
  color: #1848b8;
}

.product-card__tag--red {
  background-color: #feeceb;
  color: #e84138;
}

/* Brand */
.product-card__brand {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-6);
  min-height: 42px;
}

.product-card__logo-img {
  height: 38px;
  width: auto;
  object-fit: contain;
  /* Converte logo branca para preto sólido sobre fundo branco */
  filter: brightness(0);
}

/* Feature List */
.product-card__features {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
  flex: 1;
}
.product-card__feature {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: var(--text-sm);
  font-weight: 600;
  color: #334155;
  line-height: 1.4;
}

/* Bottom Action */
.product-card__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 700;
  text-decoration: none;
  color: #ffffff;
  transition: opacity var(--transition-fast);
}

.product-card__btn:hover {
  opacity: 0.9;
}

.product-card__btn--blue {
  background-color: #1848b8;
}

.product-card__btn--red {
  background-color: #e84138;
}

/* Responsive */
@media (max-width: 1024px) {
  .products-compare__layout {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }
}

@media (max-width: 640px) {
  .products-compare__cards {
    grid-template-columns: 1fr;
  }
}
</style>
