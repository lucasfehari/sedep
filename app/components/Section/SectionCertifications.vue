<template>
  <section class="certifications" aria-labelledby="certifications-heading">
    <div class="container">
      <div class="certifications__card">
        
        <!-- Coluna Esquerda: Título e Ação -->
        <div class="certifications__intro">
          <h2 id="certifications-heading" class="certifications__title">
            Conquistas que construímos até aqui
          </h2>
          <BaseButton
            to="/sobre"
            variant="outline"
            size="md"
            class="certifications__btn"
          >
            Trabalhe na SEDEP
          </BaseButton>
        </div>

        <!-- Coluna Direita: Selos e Badges de Certificações Oficiais -->
        <div class="certifications__badges" role="list">

          <!-- 1. GPTW Certificada Brasil -->
          <div class="cert-badge cert-badge--gptw" role="listitem" title="Great Place to Work - Certificada Brasil">
            <div class="gptw-badge">
              <div class="gptw-badge__top">
                <span class="gptw-badge__brand">Great<br />Place<br />To<br />Work.</span>
                <div class="gptw-badge__qr" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm8-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14-2h4v4h-4v-4zm-4 4h4v4h-4v-4zm4 0h4v4h-4v-4zm-6-4h2v2h-2v-2zm0 4h2v2h-2v-2z" />
                  </svg>
                </div>
              </div>
              <div class="gptw-badge__bottom">
                <span class="gptw-badge__tag">Certificada</span>
                <span class="gptw-badge__period">BRASIL</span>
              </div>
            </div>
          </div>

          <!-- 2. GPTW Melhores Empresas América Latina 2025 -->
          <div class="cert-badge cert-badge--latam" role="listitem" title="Melhores Empresas Para Trabalhar América Latina 2025">
            <div class="latam-badge">
              <span class="latam-badge__gptw">Great Place To Work.</span>
              <span class="latam-badge__title">Melhores Empresas Para Trabalhar™</span>
              <span class="latam-badge__sub">América Latina</span>
              <span class="latam-badge__year">2025</span>
            </div>
          </div>

          <!-- 3. GPTW Melhores Empresas TI Brasil 2024 -->
          <div class="cert-badge cert-badge--it" role="listitem" title="Melhores Empresas Para Trabalhar Tecnologia da Informação Brasil 2024">
            <div class="it-badge">
              <div class="it-badge__top">
                <span class="it-badge__title">Melhores Empresas Para Trabalhar™</span>
                <span class="it-badge__category">Tecnologia da Informação</span>
              </div>
              <div class="it-badge__bottom">
                <div class="it-badge__logo">
                  <span>Great Place To Work.</span>
                </div>
                <div class="it-badge__country">
                  <span>BRASIL</span>
                  <strong>2024</strong>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. Verificada por ReclameAQUI -->
          <div class="cert-badge cert-badge--reclameaqui" role="listitem" title="Empresa Verificada por ReclameAQUI">
            <div class="reclame-badge">
              <div class="reclame-badge__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#0052CC">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#00A868"/>
                </svg>
              </div>
              <div class="reclame-badge__text">
                <span class="reclame-badge__label">Verificada por</span>
                <span class="reclame-badge__brand">Reclame<strong>AQUI</strong></span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.certifications {
  padding: clamp(3rem, 5vw, 4.5rem) 0;
  background-color: #000000;
}

.certifications__card {
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-12);
  flex-wrap: wrap;
}

/* Coluna Esquerda */
.certifications__intro {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-6);
  max-width: 440px;
}

.certifications__title {
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin: 0;
}

.certifications__btn {
  border-color: #FFFFFF !important;
  color: #FFFFFF !important;
  background: transparent !important;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 700;
}

.certifications__btn:hover {
  background-color: #FFFFFF !important;
  color: #000000 !important;
}

/* Badges Container */
.certifications__badges {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.cert-badge {
  background: #FFFFFF;
  border-radius: 12px;
  width: 125px;
  height: 140px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.08);
  transition: transform var(--transition-fast);
  user-select: none;
}

.cert-badge:hover {
  transform: translateY(-4px);
}

/* 1. GPTW Certificada */
.gptw-badge {
  width: 100%;
  height: 100%;
  background-color: #E11D48;
  color: #FFFFFF;
  border-radius: 6px;
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.gptw-badge__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.gptw-badge__brand {
  font-size: 9px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.gptw-badge__qr {
  opacity: 0.9;
}

.gptw-badge__bottom {
  background: #1E3A8A;
  margin: 0 -8px -6px;
  padding: 4px;
  text-align: center;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  display: flex;
  flex-direction: column;
}

.gptw-badge__tag {
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
}

.gptw-badge__period {
  font-size: 7px;
  opacity: 0.8;
}

/* 2. GPTW América Latina */
.latam-badge {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #1E3A8A 0%, #0F172A 100%);
  color: #FFFFFF;
  border-radius: 6px;
  padding: 8px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
}

.latam-badge__gptw {
  font-size: 8px;
  font-weight: 700;
  color: #F87171;
}

.latam-badge__title {
  font-size: 8px;
  font-weight: 700;
  line-height: 1.2;
}

.latam-badge__sub {
  font-size: 8px;
  color: #93C5FD;
  font-weight: 600;
}

.latam-badge__year {
  font-size: 11px;
  font-weight: 900;
  color: #FFFFFF;
}

/* 3. GPTW TI */
.it-badge {
  width: 100%;
  height: 100%;
  border: 2px solid #581C87;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.it-badge__top {
  padding: 6px 4px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.it-badge__title {
  font-size: 7px;
  font-weight: 800;
  color: #0F172A;
  line-height: 1.1;
}

.it-badge__category {
  font-size: 6px;
  color: #64748B;
  font-weight: 600;
}

.it-badge__bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 7px;
  color: #FFFFFF;
}

.it-badge__logo {
  background: #DC2626;
  padding: 4px 2px;
  font-size: 6px;
  font-weight: 800;
  line-height: 1.1;
  text-align: center;
}

.it-badge__country {
  background: #581C87;
  padding: 4px 2px;
  text-align: center;
  display: flex;
  flex-direction: column;
}

/* 4. Reclame AQUI */
.cert-badge--reclameaqui {
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
}

.reclame-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
}

.reclame-badge__text {
  display: flex;
  flex-direction: column;
}

.reclame-badge__label {
  font-size: 8px;
  color: #166534;
  font-weight: 600;
}

.reclame-badge__brand {
  font-size: 11px;
  color: #15803D;
}

@media (max-width: 1024px) {
  .certifications__card {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-8);
  }
}

@media (max-width: 640px) {
  .certifications__badges {
    justify-content: flex-start;
  }
  .cert-badge {
    width: 110px;
    height: 125px;
  }
}
</style>
