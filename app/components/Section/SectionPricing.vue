<template>
  <section
    class="pricing section"
    id="planos"
    aria-labelledby="pricing-heading"
  >
    <div class="container">
      <!-- Header da Seção de Planos com Switch Mensal/Anual -->
      <div class="pricing__top">
        <div class="pricing__title-wrap">
          <h2 id="pricing-heading" class="pricing__title">Planos</h2>
          <div class="pricing__title-bar" />
        </div>

        <!-- Toggle Switch Mensal / Anual -->
        <div
          class="pricing__billing-toggle"
          role="group"
          aria-label="Frequência de pagamento"
        >
          <button
            type="button"
            class="billing-toggle__btn"
            :class="{
              'billing-toggle__btn--active': billingCycle === 'monthly',
            }"
            @click="billingCycle = 'monthly'"
          >
            Mensal
          </button>
          <button
            type="button"
            class="billing-toggle__btn"
            :class="{
              'billing-toggle__btn--active': billingCycle === 'annual',
            }"
            @click="billingCycle = 'annual'"
          >
            Anual
          </button>
        </div>
      </div>

      <!-- Grid dos 4 Planos -->
      <div class="pricing__grid">
        <!-- 1. Plano Inicial -->
        <div class="pricing-card">
          <div class="pricing-card__header">
            <h3 class="pricing-card__name">Inicial</h3>
            <p class="pricing-card__target">
              Ideal para advogados que precisam de um monitoramento eficiente,
              sem um sistema completo.
            </p>
          </div>

          <div class="pricing-card__price-box">
            <span class="pricing-card__prefix">Por apenas</span>
            <div
              class="pricing-card__price-row"
              v-if="billingCycle === 'annual'"
            >
              <span class="pricing-card__currency">R$</span>
              <span class="pricing-card__amount">62,90</span>
              <span class="pricing-card__period">(média mensal)</span>
            </div>
            <div class="pricing-card__price-row" v-else>
              <span class="pricing-card__currency">R$</span>
              <span class="pricing-card__amount">69,90</span>
              <span class="pricing-card__period">/mês</span>
            </div>
            <span
              class="pricing-card__annual-note"
              v-if="billingCycle === 'annual'"
            >
              R$ 754,80 ao ano!
              <span class="pricing-card__info-icon" title="Cobrado anualmente"
                >ℹ</span
              >
            </span>
          </div>

          <div class="pricing-card__action">
            <BaseButton
              href="https://api.whatsapp.com/send?phone=5567998393633&text=Ol%C3%A1,%20preciso%20de%20ajuda"
              target="_blank"
              variant="outline"
              size="md"
              class="pricing-card__btn pricing-card__btn--blue-light"
            >
              Contrate agora
            </BaseButton>
          </div>

          <ul class="pricing-card__features" role="list">
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span
                >1 nomes para captura de publicações
                <span
                  class="pricing-card__info-icon"
                  title="Nome do advogado ou sociedade monitorada"
                  >ℹ</span
                ></span
              >
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>Cobertura para 1 estado + união</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>100 intimações mensais</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>5 assinaturas eletrônicas</span>
            </li>
          </ul>
        </div>

        <!-- 2. Plano Essencial (Mais Vendido) -->
        <div class="pricing-card pricing-card--featured">
          <div class="pricing-card__badge-tag">Mais vendido</div>

          <div class="pricing-card__header">
            <h3 class="pricing-card__name">Essencial</h3>
            <p class="pricing-card__target">
              Perfeito para pequenos escritórios que precisam de mais controle e
              automação.
            </p>
          </div>

          <div class="pricing-card__price-box">
            <span class="pricing-card__prefix">Por apenas</span>
            <div
              class="pricing-card__price-row"
              v-if="billingCycle === 'annual'"
            >
              <span class="pricing-card__currency">R$</span>
              <span class="pricing-card__amount">152,90</span>
              <span class="pricing-card__period">(média mensal)</span>
            </div>
            <div class="pricing-card__price-row" v-else>
              <span class="pricing-card__currency">R$</span>
              <span class="pricing-card__amount">169,90</span>
              <span class="pricing-card__period">/mês</span>
            </div>
            <span
              class="pricing-card__annual-note"
              v-if="billingCycle === 'annual'"
            >
              R$ 1.834,80 ao ano!
              <span class="pricing-card__info-icon" title="Cobrado anualmente"
                >ℹ</span
              >
            </span>
          </div>

          <div class="pricing-card__action">
            <BaseButton
              href="https://www.sedep.com.br/faz/teste-gratis/?plano=essencial"
              target="_blank"
              variant="primary"
              size="md"
              class="pricing-card__btn"
            >
              Teste agora
            </BaseButton>
          </div>

          <ul class="pricing-card__features" role="list">
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span
                >1 nomes para captura de publicações
                <span
                  class="pricing-card__info-icon"
                  title="Monitoramento de publicações oficiais"
                  >ℹ</span
                ></span
              >
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>2 usuários</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>Cobertura Nacional</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>Processos cadastrados ilimitados</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>Consulta de até 130 processos ativos</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>100 intimações mensais</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>5 assinaturas eletrônicas</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>25 GB de armazenamento na nuvem</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>Aplicativo mobile</span>
            </li>
          </ul>
        </div>

        <!-- 3. Plano Recomendado -->
        <div class="pricing-card">
          <div class="pricing-card__header">
            <h3 class="pricing-card__name">Recomendado</h3>
            <p class="pricing-card__target">
              Ideal para escritórios estruturados que lidam com alto volume de
              processos.
            </p>
          </div>

          <div class="pricing-card__price-box">
            <span class="pricing-card__prefix">Por apenas</span>
            <div
              class="pricing-card__price-row"
              v-if="billingCycle === 'annual'"
            >
              <span class="pricing-card__currency">R$</span>
              <span class="pricing-card__amount">431,90</span>
              <span class="pricing-card__period">(média mensal)</span>
            </div>
            <div class="pricing-card__price-row" v-else>
              <span class="pricing-card__currency">R$</span>
              <span class="pricing-card__amount">479,90</span>
              <span class="pricing-card__period">/mês</span>
            </div>
            <span
              class="pricing-card__annual-note"
              v-if="billingCycle === 'annual'"
            >
              R$ 5.182,80 ao ano!
              <span class="pricing-card__info-icon" title="Cobrado anualmente"
                >ℹ</span
              >
            </span>
          </div>

          <div class="pricing-card__action">
            <BaseButton
              href="https://www.sedep.com.br/faz/teste-gratis/?plano=recomendado"
              target="_blank"
              variant="primary"
              size="md"
              class="pricing-card__btn"
            >
              Teste agora
            </BaseButton>
          </div>

          <ul class="pricing-card__features" role="list">
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span
                >2 nomes para captura de publicações
                <span
                  class="pricing-card__info-icon"
                  title="Monitoramento duplo"
                  >ℹ</span
                ></span
              >
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>4 usuários</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>Cobertura Nacional</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>Processos cadastrados ilimitados</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>Consulta de até 1.000 processos ativos</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>250 intimações mensais</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>5 assinaturas eletrônicas</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>25 GB de armazenamento na nuvem</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>Aplicativo mobile</span>
            </li>
          </ul>
        </div>

        <!-- 4. Plano Personalizável -->
        <div class="pricing-card">
          <div class="pricing-card__header">
            <h3 class="pricing-card__name">Personalizável</h3>
            <p class="pricing-card__target">
              Para escritórios que precisam de uma solução adaptada às suas
              necessidades específicas. Valor sob consulta
            </p>
          </div>

          <div class="pricing-card__price-box pricing-card__price-box--custom">
            <span class="pricing-card__prefix">Orçamento sob medida</span>
            <div class="pricing-card__price-row">
              <span class="pricing-card__custom-title">Consulte</span>
            </div>
            <span class="pricing-card__annual-note">
              Equipe dedicada de implantação
            </span>
          </div>

          <div class="pricing-card__action">
            <BaseButton
              href="https://www.sedep.com.br/faz/teste-gratis/?plano=personalizado"
              target="_blank"
              variant="primary"
              size="md"
              class="pricing-card__btn"
            >
              Teste agora
            </BaseButton>
          </div>

          <div class="pricing-card__custom-intro">
            Personalize conforme sua demanda:
          </div>

          <ul class="pricing-card__features" role="list">
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span
                >Quantidades de nomes para captura de publicações
                <span class="pricing-card__info-icon">ℹ</span></span
              >
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>Quantidade de usuários</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>Quantidade de intimações mensais</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>Capacidade de armazenamento</span>
            </li>
            <li class="pricing-card__feature">
              <span class="pricing-card__check">✓</span>
              <span>Funcionalidades extras</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Nota de Rodapé dos Módulos Extras -->
      <div class="pricing__footer-note">
        <p>
          Todos os planos permitem a inclusão de módulos extras, sendo eles
          <strong>Assinatura Eletrônica</strong> – Agilidade e segurança na
          validação de documentos, <strong>CRM Jurídico</strong> – Gerenciamento
          completo de clientes e leads, <strong>Chatbot e IA Carmela</strong> –
          Inteligência artificial para otimizar o atendimento.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const billingCycle = ref<"annual" | "monthly">("annual");
</script>

<style scoped>
.pricing {
  padding: var(--section-spacing-md) 0;
  background-color: #ffffff;
}

/* Top bar com Título e Toggle */
.pricing__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: var(--space-6);
  margin-bottom: var(--space-10);
  gap: var(--space-4);
  flex-wrap: wrap;
}

.pricing__title-wrap {
  display: flex;
  flex-direction: column;
}

.pricing__title {
  font-size: clamp(2rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.03em;
}

.pricing__title-bar {
  width: 70px;
  height: 4px;
  background-color: #0052cc;
  border-radius: 2px;
  margin-top: 8px;
}

/* Toggle Switch Mensal / Anual */
.pricing__billing-toggle {
  display: inline-flex;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
}

.billing-toggle__btn {
  padding: 8px 24px;
  font-size: var(--text-sm);
  font-weight: 700;
  color: #475569;
  border-radius: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.billing-toggle__btn--active {
  background-color: #1e3a8a;
  color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Grid de Cards */
.pricing__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
  align-items: stretch;
}

/* Card Base */
.pricing-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  position: relative;
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

/* Card Em Destaque (Mais Vendido) */
.pricing-card--featured {
  border-color: #4361ee;
  box-shadow: 0 10px 30px -10px rgba(67, 97, 238, 0.2);
}

.pricing-card__badge-tag {
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  background-color: #4361ee;
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  text-align: center;
  padding: 6px 12px;
  border-top-left-radius: var(--radius-xl);
  border-top-right-radius: var(--radius-xl);
  letter-spacing: 0.02em;
}

.pricing-card--featured .pricing-card__header {
  margin-top: var(--space-6);
}

/* Header do Card */
.pricing-card__header {
  margin-bottom: var(--space-4);
  min-height: 80px;
}

.pricing-card__name {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 6px;
  letter-spacing: -0.02em;
}

.pricing-card__target {
  font-size: 12px;
  line-height: 1.4;
  color: #64748b;
  margin: 0;
}

/* Caixa de Preço */
.pricing-card__price-box {
  margin-bottom: var(--space-5);
  display: flex;
  flex-direction: column;
  min-height: 72px;
}

.pricing-card__prefix {
  font-size: 11px;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 2px;
}

.pricing-card__price-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.pricing-card__currency {
  font-size: 1rem;
  font-weight: 800;
  color: #0f172a;
}

.pricing-card__amount {
  font-size: 1.85rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.03em;
  line-height: 1;
}

.pricing-card__period {
  font-size: 12px;
  font-weight: 600;
  color: #475569;
}

.pricing-card__annual-note {
  font-size: 10px;
  font-weight: 700;
  color: #0f172a;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.pricing-card__custom-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
}

/* Botão de Ação */
.pricing-card__action {
  margin-bottom: var(--space-6);
}

.pricing-card__btn {
  width: 100%;
  justify-content: center;
  font-weight: 700;
  background-color: #4361ee !important;
  color: #ffffff !important;
  border-color: #4361ee !important;
}

.pricing-card__btn:hover {
  background-color: #3751d0 !important;
}

/* Feature List */
.pricing-card__features {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
  flex: 1;
}

.pricing-card__custom-intro {
  font-size: 12px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

.pricing-card__feature {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12px;
  color: #334155;
  line-height: 1.4;
}

.pricing-card__check {
  font-weight: 800;
  color: #0f172a;
  font-size: 12px;
  line-height: 1.3;
  flex-shrink: 0;
}

.pricing-card__info-icon {
  font-size: 10px;
  color: #94a3b8;
  display: inline-block;
  cursor: help;
  margin-left: 2px;
}

/* Nota de Rodapé */
.pricing__footer-note {
  margin-top: var(--space-8);
  padding-top: var(--space-4);
  font-size: 11px;
  color: #64748b;
  line-height: 1.6;
  text-align: center;
  max-width: 980px;
  margin-left: auto;
  margin-right: auto;
}

.pricing__footer-note strong {
  color: #334155;
}

/* Responsividade */
@media (max-width: 1200px) {
  .pricing__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
}

@media (max-width: 640px) {
  .pricing__grid {
    grid-template-columns: 1fr;
  }
  .pricing__top {
    flex-direction: column;
    align-items: flex-start;
  }
  .pricing__billing-toggle {
    width: 100%;
  }
  .billing-toggle__btn {
    flex: 1;
    text-align: center;
  }
}
</style>
