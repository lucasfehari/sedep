<template>
  <div>
    <section class="exp-hero section bg-dark on-dark" aria-labelledby="exp-heading">
      <div class="container">
        <div class="exp-hero__layout">
          <div class="exp-hero__text">
            <p class="section-label section-label--light">Demonstração</p>
            <h1 id="exp-heading">Conheça a SEDEP na prática.</h1>
            <p class="lead">
              Preencha o formulário. Nossa equipe entra em contato para agendar uma demonstração objetiva e sem compromisso.
            </p>
            <div class="exp-hero__commitments">
              <p class="exp-commitment">Sem scripts de vendas.</p>
              <p class="exp-commitment">Sem insistência pós-contato.</p>
              <p class="exp-commitment">Conversa direta com quem conhece o produto.</p>
            </div>
          </div>

          <!-- Formulário principal -->
          <div class="exp-form-wrapper">
            <form
              class="exp-form"
              novalidate
              @submit.prevent="handleSubmit"
            >
              <h2 class="exp-form__title">Solicitar demonstração</h2>

              <div class="exp-form__row">
                <BaseInput
                  id="exp-name"
                  v-model="form.name"
                  label="Nome completo"
                  type="text"
                  placeholder="Seu nome"
                  :required="true"
                  autocomplete="name"
                  :error="errors.name"
                />
                <BaseInput
                  id="exp-company"
                  v-model="form.company"
                  label="Empresa / Escritório"
                  type="text"
                  placeholder="Nome do escritório ou empresa"
                  :required="true"
                  :error="errors.company"
                />
              </div>

              <BaseInput
                id="exp-email"
                v-model="form.email"
                label="E-mail profissional"
                type="email"
                placeholder="seu@email.com.br"
                :required="true"
                autocomplete="email"
                :error="errors.email"
              />

              <BaseInput
                id="exp-phone"
                v-model="form.phone"
                label="Telefone / WhatsApp"
                type="tel"
                placeholder="(00) 00000-0000"
                :required="true"
                autocomplete="tel"
                :error="errors.phone"
              />

              <BaseInput
                id="exp-solution"
                v-model="form.solution"
                label="Solução de interesse"
                type="select"
                :required="true"
                placeholder="Selecione uma opção"
                :error="errors.solution"
              >
                <option value="faz">Sedep Faz — Software Jurídico</option>
                <option value="legallake">LegalLake — Pesquisa Jurídica</option>
                <option value="publicacoes">Acompanhamento e Publicações</option>
                <option value="tecnologia">Tecnologia e Infraestrutura de TI</option>
                <option value="cyber">Cyber Security</option>
                <option value="lgpd">LGPD e Privacidade de Dados</option>
                <option value="geral">Interesse geral — quero entender as opções</option>
              </BaseInput>

              <BaseInput
                id="exp-message"
                v-model="form.message"
                label="Mensagem (opcional)"
                type="textarea"
                placeholder="Descreva brevemente o que você procura ou tem dúvidas sobre."
                :rows="3"
              />

              <!-- Consentimento LGPD — obrigatório, claro e sem juridiquês excessivo -->
              <div class="exp-form__consent" :class="{ 'exp-form__consent--error': !!errors.consent }">
                <label class="exp-form__consent-label">
                  <input
                    id="exp-consent"
                    v-model="form.consent"
                    type="checkbox"
                    class="exp-form__checkbox"
                    :aria-describedby="errors.consent ? 'exp-consent-error' : undefined"
                  />
                  <span>
                    Li e aceito a
                    <NuxtLink to="/privacidade" class="exp-form__consent-link" target="_blank">Política de Privacidade</NuxtLink>
                    da SEDEP. Meus dados serão usados exclusivamente para retorno desta solicitação.
                  </span>
                </label>
                <p v-if="errors.consent" id="exp-consent-error" class="exp-form__error" role="alert">{{ errors.consent }}</p>
              </div>

              <!-- Erro geral do servidor -->
              <div v-if="serverError" class="exp-form__server-error" role="alert">
                <p>{{ serverError }}</p>
              </div>

              <!-- Sucesso -->
              <div v-if="success" class="exp-form__success" role="status">
                <p><strong>Mensagem enviada com sucesso.</strong></p>
                <p>Nossa equipe entrará em contato em breve pelo e-mail ou telefone informado.</p>
              </div>

              <BaseButton
                v-if="!success"
                type="submit"
                variant="primary"
                size="lg"
                :loading="loading"
                :disabled="loading"
                class="exp-form__submit"
              >
                Enviar solicitação
              </BaseButton>

            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Solicitar Demonstração | SEDEP',
  description: 'Solicite uma demonstração gratuita das soluções SEDEP. Faz, LegalLake, Publicações, Cyber Security e LGPD. Atendimento humano e sem compromisso.',
})

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  solution: string
  message: string
  consent: boolean
}

interface FormErrors {
  name?: string
  company?: string
  email?: string
  phone?: string
  solution?: string
  consent?: string
}

const form = reactive<FormData>({
  name: '',
  company: '',
  email: '',
  phone: '',
  solution: '',
  message: '',
  consent: false,
})

const errors = reactive<FormErrors>({})
const loading = ref(false)
const success = ref(false)
const serverError = ref('')

function validate(): boolean {
  const newErrors: FormErrors = {}

  if (!form.name || form.name.trim().length < 2) {
    newErrors.name = 'Informe seu nome completo.'
  }
  if (!form.company || form.company.trim().length < 1) {
    newErrors.company = 'Informe o nome da empresa ou escritório.'
  }
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = 'Informe um e-mail válido.'
  }
  if (!form.phone || form.phone.replace(/\D/g, '').length < 10) {
    newErrors.phone = 'Informe um telefone com DDD.'
  }
  if (!form.solution) {
    newErrors.solution = 'Selecione a solução de interesse.'
  }
  if (!form.consent) {
    newErrors.consent = 'É necessário aceitar a Política de Privacidade.'
  }

  Object.assign(errors, { name: undefined, company: undefined, email: undefined, phone: undefined, solution: undefined, consent: undefined, ...newErrors })

  return Object.keys(newErrors).length === 0
}

async function handleSubmit() {
  serverError.value = ''

  if (!validate()) return

  loading.value = true

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        solution: form.solution,
        message: form.message,
        consent: form.consent,
      },
    })
    success.value = true
  } catch (err: any) {
    serverError.value = err?.data?.statusMessage || 'Ocorreu um erro. Tente novamente ou entre em contato pelo telefone (67) 3213-0810.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.exp-hero {
  background-color: var(--color-sedep-blue);
  min-height: 100vh;
  padding-top: clamp(4rem, 8vw, 7rem);
  padding-bottom: clamp(4rem, 8vw, 7rem);
}

.exp-hero__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: start;
}

.exp-hero__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  position: sticky;
  top: calc(var(--header-height-desktop) + var(--space-8));
}

.exp-hero__commitments {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  border-left: 2px solid var(--color-accent);
  padding-left: var(--space-4);
  margin-top: var(--space-2);
}

.exp-commitment {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.65);
  max-width: none;
}

/* Formulário */
.exp-form-wrapper {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
}

.exp-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.exp-form__title {
  font-size: var(--text-2xl);
  color: var(--color-ink);
  margin-bottom: var(--space-2);
}

.exp-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.exp-form__consent {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.exp-form__consent-label {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
  cursor: pointer;
  font-size: var(--text-sm);
  color: var(--color-ink-medium);
  line-height: var(--line-height-relaxed);
}

.exp-form__checkbox {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 3px;
  accent-color: var(--color-sedep-blue-mid);
  cursor: pointer;
}

.exp-form__consent--error .exp-form__consent-label {
  color: var(--color-error);
}

.exp-form__consent-link {
  color: var(--color-sedep-blue-mid);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.exp-form__error {
  font-size: var(--text-sm);
  color: var(--color-error);
  max-width: none;
  margin: 0;
}

.exp-form__server-error {
  padding: var(--space-4);
  background-color: var(--color-error-light);
  border: 1px solid var(--color-error);
  border-radius: var(--radius-md);
}

.exp-form__server-error p {
  font-size: var(--text-sm);
  color: var(--color-error);
  max-width: none;
}

.exp-form__success {
  padding: var(--space-5);
  background-color: var(--color-success-light);
  border: 1px solid var(--color-success);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.exp-form__success p {
  font-size: var(--text-sm);
  color: var(--color-success);
  max-width: none;
}

.exp-form__submit {
  width: 100%;
  justify-content: center;
}

/* Responsive */
@media (max-width: 1024px) {
  .exp-hero__layout {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }

  .exp-hero__text {
    position: static;
  }
}

@media (max-width: 640px) {
  .exp-form__row {
    grid-template-columns: 1fr;
  }

  .exp-form-wrapper {
    padding: var(--space-6);
  }
}
</style>
