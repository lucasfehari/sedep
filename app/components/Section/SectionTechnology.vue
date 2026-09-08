<template>
  <section class="feature-deep section" aria-labelledby="faz-deep-heading">
    <div class="container">

      <!-- Header de Destaque do Produto (Estilo Astrea Deep-dive) -->
      <div class="feature-deep__header">
        <div class="feature-deep__brand">
          <img src="/logo_faz.png" alt="SEDEP Faz" class="feature-deep__brand-img" width="110" height="38" />
        </div>
        <h2 id="faz-deep-heading" class="feature-deep__title">
          Faz: decisões antecipadas e mais eficiência para escritórios de advocacia
        </h2>
        <p class="feature-deep__subtitle">
          Software para gestão jurídica que transforma informações e publicações em ações inteligentes.
        </p>
      </div>

      <!-- Feature Big Card (Fundo Azul Suave com UI Mockup) -->
      <div class="feature-card">
        <div class="feature-card__layout">

          <!-- Conteúdo Esquerdo -->
          <div class="feature-card__content">
            <h3 class="feature-card__title">
              Inteligência Artificial que simplifica a sua rotina
            </h3>
            <p class="feature-card__desc">
              As automações do Sedep Faz são parceiras na organização de tarefas, tratamento e triagem de publicações e geração de prazos, deixando sua rotina sem sobrecarga.
            </p>
            <div class="feature-card__actions">
              <BaseButton to="/experimente" variant="ghost" size="md">
                Experimente o Sedep Faz
              </BaseButton>
            </div>
          </div>

          <!-- Mockup UI Direito (Janela de Software Realista) -->
          <div class="feature-card__mockup" aria-hidden="true">
            <div class="software-window">
              <!-- Window Header -->
              <div class="software-window__bar">
                <div class="software-window__dots">
                  <span class="software-window__dot software-window__dot--red" />
                  <span class="software-window__dot software-window__dot--yellow" />
                  <span class="software-window__dot software-window__dot--green" />
                </div>
                <div class="software-window__url">
                  🔒 faz.sedep.com.br/publicacoes
                </div>
              </div>

              <!-- Software Inner View -->
              <div class="software-window__body">
                <!-- Page Title -->
                <div class="software-window__heading">
                  <span class="software-window__page-title">
                    <AppleEmoji emoji="📑" :size="16" /> Publicações
                  </span>
                  <div class="software-window__status-pill">
                    <span class="software-window__status-count">1</span> NÃO TRATADA
                    <span class="software-window__status-divider">|</span>
                    <span class="software-window__status-count">0</span> TRATADAS HOJE
                  </div>
                </div>

                <!-- AI Alert Banner -->
                <div class="software-window__ai-banner">
                  <AppleEmoji emoji="✨" :size="16" />
                  <span class="software-window__ai-text">
                    <strong>IA Sedep:</strong> 1 publicação relevante identificada com prazo fatal de 15 dias. Deseja agendar na Google Agenda?
                  </span>
                </div>

                <!-- Table -->
                <div class="software-table">
                  <div class="software-table__header">
                    <span class="col-chk"><input type="checkbox" checked /></span>
                    <span class="col-date">DIVULGAÇÃO</span>
                    <span class="col-trib">TRIBUNAL</span>
                    <span class="col-desc">PROCESSO & TEOR</span>
                    <span class="col-status">STATUS</span>
                  </div>

                  <div class="software-table__row software-table__row--active">
                    <span class="col-chk"><input type="checkbox" checked /></span>
                    <span class="col-date"><strong>Hoje</strong> 08:30</span>
                    <span class="col-trib"><span class="badge-tag badge-tag--blue">TJSP</span></span>
                    <span class="col-desc">
                      <strong>0012489-44.2026.8.26.0100</strong><br />
                      Intimação para apresentação de contrarrazões...
                    </span>
                    <span class="col-status"><span class="badge-status badge-status--pending">Urgente</span></span>
                  </div>

                  <div class="software-table__row">
                    <span class="col-chk"><input type="checkbox" /></span>
                    <span class="col-date">Ontem 14:15</span>
                    <span class="col-trib"><span class="badge-tag badge-tag--blue">TJMS</span></span>
                    <span class="col-desc">
                      <strong>0801245-89.2026.8.12.0001</strong><br />
                      Despacho proferido em audiência de instrução...
                    </span>
                    <span class="col-status"><span class="badge-status badge-status--done">Tratado</span></span>
                  </div>

                  <div class="software-table__row">
                    <span class="col-chk"><input type="checkbox" /></span>
                    <span class="col-date">11/08 17:40</span>
                    <span class="col-trib"><span class="badge-tag badge-tag--navy">TRF3</span></span>
                    <span class="col-desc">
                      <strong>5002489-12.2026.4.03.6100</strong><br />
                      Sentença homologatória de acordo judicial...
                    </span>
                    <span class="col-status"><span class="badge-status badge-status--done">Tratado</span></span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.feature-deep {
  padding: var(--section-spacing-md) 0;
  background-color: #FFFFFF;
}

/* Header */
.feature-deep__header {
  text-align: center;
  max-width: 820px;
  margin: 0 auto var(--space-12);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-deep__brand {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-4);
}

.feature-deep__brand-img {
  height: 38px;
  width: auto;
  object-fit: contain;
  /* Logo branca convertida para a cor ink sobre fundo claro */
  filter: brightness(0);
}

.feature-deep__title {
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: #0F172A;
  margin-bottom: var(--space-3);
}

.feature-deep__subtitle {
  font-size: var(--text-base);
  color: var(--color-ink-light);
}

/* Feature Big Card */
.feature-card {
  background-color: #F0F7FF;
  border-radius: var(--radius-2xl);
  padding: clamp(2rem, 5vw, 4rem);
  border: 1px solid #D6E8FF;
}

.feature-card__layout {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: var(--space-12);
  align-items: center;
}

.feature-card__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.feature-card__title {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 800;
  line-height: 1.25;
  color: #0F172A;
  letter-spacing: -0.025em;
}

.feature-card__desc {
  font-size: var(--text-base);
  line-height: var(--line-height-relaxed);
  color: #475569;
}

.feature-card__actions {
  padding-top: var(--space-2);
}

/* Mockup Software Window */
.feature-card__mockup {
  width: 100%;
}

.software-window {
  background: #FFFFFF;
  border-radius: var(--radius-xl);
  box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.15);
  border: 1px solid #E2E8F0;
  overflow: hidden;
}

.software-window__bar {
  background: #F8FAFC;
  border-bottom: 1px solid #E2E8F0;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.software-window__dots {
  display: flex;
  gap: 6px;
}

.software-window__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.software-window__dot--red { background: #EF4444; }
.software-window__dot--yellow { background: #F59E0B; }
.software-window__dot--green { background: #10B981; }

.software-window__url {
  font-size: 11px;
  color: #64748B;
  background: #FFFFFF;
  padding: 3px 14px;
  border-radius: 6px;
  border: 1px solid #E2E8F0;
  flex: 1;
  text-align: center;
  font-weight: 500;
}

.software-window__body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  background: #FFFFFF;
}

.software-window__heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.software-window__page-title {
  font-size: var(--text-base);
  font-weight: 800;
  color: #0F172A;
}

.software-window__status-pill {
  font-size: 11px;
  background: #F1F5F9;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  font-weight: 700;
  color: #475569;
  display: flex;
  gap: 6px;
}

.software-window__status-count {
  color: var(--color-faz);
  font-weight: 800;
}

.software-window__status-divider {
  color: #CBD5E1;
}

/* AI Banner */
.software-window__ai-banner {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: var(--radius-md);
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: #1E40AF;
}

.software-window__ai-icon {
  font-size: 14px;
  color: #2563EB;
  flex-shrink: 0;
}

/* Table */
.software-table {
  border: 1px solid #E2E8F0;
  border-radius: var(--radius-md);
  overflow: hidden;
  font-size: 12px;
}

.software-table__header {
  background: #F8FAFC;
  border-bottom: 1px solid #E2E8F0;
  padding: 8px 12px;
  display: grid;
  grid-template-columns: 24px 80px 70px 1fr 70px;
  font-weight: 700;
  color: #64748B;
  font-size: 11px;
}

.software-table__row {
  padding: 10px 12px;
  border-bottom: 1px solid #F1F5F9;
  display: grid;
  grid-template-columns: 24px 80px 70px 1fr 70px;
  align-items: center;
  color: #334155;
  line-height: 1.3;
}

.software-table__row--active {
  background-color: #F8FAFF;
}

.col-desc {
  font-size: 11px;
  padding-right: 8px;
}

.badge-status {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  display: inline-block;
  text-align: center;
}

.badge-status--pending {
  background: #FEE2E2;
  color: #DC2626;
}

.badge-status--done {
  background: #DCFCE7;
  color: #166534;
}

@media (max-width: 1024px) {
  .feature-card__layout {
    grid-template-columns: 1fr;
  }
}
</style>
