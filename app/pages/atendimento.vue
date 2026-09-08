<template>
  <div>
    <section class="section bg-dark on-dark" style="padding-top:clamp(4rem,10vw,8rem);" aria-labelledby="atend-heading">
      <div class="container">
        <p class="section-label section-label--light">Atendimento Brasil</p>
        <h1 id="atend-heading">Fale com a SEDEP.</h1>
        <p class="lead" style="margin-top:1rem;">
          Atendimento por equipe especializada — vendas e suporte em um único canal centralizado, com cobertura nacional.
        </p>
      </div>
    </section>

    <section class="section" aria-labelledby="contatos-heading">
      <div class="container">
        <h2 id="contatos-heading" class="sr-only">Canais de contato</h2>
        <div class="atend-grid">

          <div class="atend-card">
            <p class="atend-card__label">Vendas</p>
            <h3 class="atend-card__title">Conheça nossas soluções.</h3>
            <p class="atend-card__desc">
              Quer entender qual produto da SEDEP resolve o problema da sua operação? Fale diretamente com nossa equipe comercial.
            </p>
            <div class="atend-card__contacts">
              <a href="tel:6732130810" class="atend-contact">
                <span class="atend-contact__type">Telefone</span>
                <span class="atend-contact__value">(67) 3213-0810</span>
              </a>
              <a href="https://wa.me/5567998393633?text=Olá, gostaria de conhecer as soluções da SEDEP." class="atend-contact atend-contact--wa" target="_blank" rel="noopener">
                <span class="atend-contact__type">WhatsApp</span>
                <span class="atend-contact__value">(67) 99839-3633</span>
              </a>
            </div>
            <BaseButton to="/experimente" variant="primary" style="margin-top:1rem;">
              Solicitar demonstração
            </BaseButton>
          </div>

          <div class="atend-card">
            <p class="atend-card__label">Suporte</p>
            <h3 class="atend-card__title">Precisa de ajuda técnica?</h3>
            <p class="atend-card__desc">
              Nossa equipe de suporte é formada por pessoas treinadas no uso dos sistemas. Não é um call center genérico.
            </p>
            <div class="atend-card__contacts">
              <a href="tel:6732130810" class="atend-contact">
                <span class="atend-contact__type">Telefone</span>
                <span class="atend-contact__value">(67) 3213-0810</span>
              </a>
              <a href="https://wa.me/5567999362861?text=Olá, preciso de suporte técnico." class="atend-contact atend-contact--wa" target="_blank" rel="noopener">
                <span class="atend-contact__type">WhatsApp</span>
                <span class="atend-contact__value">(67) 99936-2861</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="section bg-surface-alt" aria-labelledby="locais-atend-heading">
      <div class="container">
        <h2 id="locais-atend-heading">Atendimento em todo o Brasil.</h2>
        <p style="margin-top:0.75rem;color:var(--color-ink-medium);max-width:55ch;">
          Nossa equipe de consultoria e suporte técnico especializado atende advogados e departamentos jurídicos em todos os estados do país com máxima agilidade e segurança.
        </p>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Atendimento SEDEP — Vendas e Suporte Especializado',
  description: 'Entre em contato com a SEDEP. Vendas e Suporte técnico especializado para advogados e departamentos jurídicos em todo o Brasil.',
})
</script>

<style scoped>
.product-hero {
  background-color: var(--color-sedep-blue);
}

.atend-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
}

.atend-card {
  padding: var(--space-8);
  border: var(--border-thin);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.atend-card__label {
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-caps);
  text-transform: uppercase;
  color: var(--color-sedep-blue-mid);
  max-width: none;
}

.atend-card__title {
  font-size: var(--text-2xl);
  color: var(--color-ink);
}

.atend-card__desc {
  font-size: var(--text-base);
  color: var(--color-ink-medium);
  max-width: none;
}

.atend-card__contacts {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4) 0;
  border-top: var(--border-thin);
}

.atend-contact {
  display: flex;
  flex-direction: column;
  gap: 2px;
  transition: opacity var(--transition-fast);
}

.atend-contact:hover {
  opacity: 0.75;
}

.atend-contact__type {
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-ink-light);
  text-transform: uppercase;
}

.atend-contact__value {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-ink);
}

.atend-contact--wa .atend-contact__value {
  color: var(--color-sedep-blue-mid);
}

@media (max-width: 768px) {
  .atend-grid { grid-template-columns: 1fr; }
}
</style>
