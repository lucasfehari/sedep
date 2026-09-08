<template>
  <div class="login-wrapper">
    <!-- Background decorativo -->
    <div class="login-bg">
      <div class="login-bg__orb login-bg__orb--1" />
      <div class="login-bg__orb login-bg__orb--2" />
      <div class="login-bg__grid" />
    </div>

    <div class="login-card">
      <!-- Cabeçalho -->
      <div class="login-header">
        <div class="login-logo-wrapper">
          <img src="/sedep-branco.png" alt="SEDEP" class="login-logo" width="130" height="37" />
        </div>
        <div class="login-title-block">
          <h1 class="login-title">Painel Administrativo</h1>
          <p class="login-desc">SEDEP Studio CMS — Acesso Restrito</p>
        </div>
      </div>

      <!-- Formulário -->
      <form @submit.prevent="handleSubmit" class="login-form" novalidate>
        <!-- Alerta de erro -->
        <transition name="alert-fade">
          <div v-if="errorMessage" class="login-alert login-alert--error" role="alert">
            <span class="login-alert__icon">⚠️</span>
            <span>{{ errorMessage }}</span>
          </div>
        </transition>

        <!-- Campo E-mail -->
        <div class="form-group" :class="{ 'form-group--error': emailError }">
          <label for="email" class="form-label">
            <span class="form-label__icon">✉</span>
            E-mail ou Usuário
          </label>
          <input
            id="email"
            v-model="email"
            type="text"
            placeholder="admin@sedep.com.br"
            class="form-input"
            autocomplete="username"
            @blur="validateEmail"
            @input="emailError = ''"
          />
          <span v-if="emailError" class="form-error-msg">{{ emailError }}</span>
        </div>

        <!-- Campo Senha -->
        <div class="form-group" :class="{ 'form-group--error': passwordError }">
          <label for="password" class="form-label">
            <span class="form-label__icon">🔒</span>
            Senha de Acesso
          </label>
          <div class="form-input-wrapper">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="form-input form-input--with-icon"
              autocomplete="current-password"
              @blur="validatePassword"
              @input="passwordError = ''"
            />
            <button
              type="button"
              class="form-eye-btn"
              :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
              @click="showPassword = !showPassword"
            >
              <span>{{ showPassword ? '🙈' : '👁️' }}</span>
            </button>
          </div>
          <span v-if="passwordError" class="form-error-msg">{{ passwordError }}</span>
        </div>

        <!-- Botão Submit -->
        <button type="submit" class="login-btn" :disabled="loading" :class="{ 'login-btn--loading': loading }">
          <span v-if="loading" class="login-btn__spinner" />
          <span>{{ loading ? 'Autenticando...' : 'Entrar no Painel' }}</span>
          <span v-if="!loading" class="login-btn__arrow">→</span>
        </button>
      </form>

      <!-- Rodapé do card -->
      <div class="login-footer">
        <div class="login-footer__lock">
          <span>🔐</span>
          <span>Acesso protegido por sessão criptografada</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: false,
})

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)
const emailError = ref('')
const passwordError = ref('')

function validateEmail() {
  if (!email.value.trim()) {
    emailError.value = 'Informe seu e-mail ou usuário.'
    return false
  }
  emailError.value = ''
  return true
}

function validatePassword() {
  if (!password.value) {
    passwordError.value = 'Informe sua senha.'
    return false
  }
  passwordError.value = ''
  return true
}

async function handleSubmit() {
  const emailOk = validateEmail()
  const passOk = validatePassword()
  if (!emailOk || !passOk) return

  loading.value = true
  errorMessage.value = ''

  try {
    const res = await $fetch<{ success: boolean }>('/api/admin/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    })

    if (res?.success) {
      await navigateTo('/admin')
    }
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || 'Credenciais inválidas. Verifique e tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* ===== WRAPPER & BG ===== */
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #060A12;
  padding: 1.5rem;
  font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  position: relative;
  overflow: hidden;
}

.login-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.login-bg__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.18;
}

.login-bg__orb--1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #1D4ED8 0%, #0A3D7C 100%);
  top: -200px;
  left: -100px;
  animation: drift1 12s ease-in-out infinite alternate;
}

.login-bg__orb--2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #7C3AED 0%, #1D4ED8 100%);
  bottom: -150px;
  right: -80px;
  animation: drift2 15s ease-in-out infinite alternate;
}

.login-bg__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 50px 50px;
}

@keyframes drift1 {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(40px, 30px) scale(1.1); }
}

@keyframes drift2 {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(-30px, -40px) scale(1.08); }
}

/* ===== CARD ===== */
.login-card {
  width: 100%;
  max-width: 460px;
  background: rgba(11, 17, 32, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04),
    0 32px 64px -20px rgba(0, 0, 0, 0.7),
    0 0 60px -10px rgba(29, 78, 216, 0.15);
  position: relative;
  z-index: 1;
  animation: card-enter 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ===== HEADER ===== */
.login-header {
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.login-logo-wrapper {
  padding: 0.75rem 1.5rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
}

.login-logo {
  height: 28px;
  width: auto;
  display: block;
}

.login-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #FFFFFF;
  letter-spacing: -0.02em;
  margin: 0 0 0.3rem 0;
  line-height: 1.2;
}

.login-desc {
  font-size: 0.8rem;
  color: #475569;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
}

/* ===== FORM ===== */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

/* Alert */
.login-alert {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 500;
}

.login-alert__icon {
  font-size: 1rem;
  flex-shrink: 0;
}

.login-alert--error {
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #FCA5A5;
}

.alert-fade-enter-active,
.alert-fade-leave-active {
  transition: all 0.25s ease;
}

.alert-fade-enter-from,
.alert-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Form Groups */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #94A3B8;
  letter-spacing: 0.01em;
}

.form-label__icon {
  font-size: 0.85rem;
  opacity: 0.7;
}

.form-input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 0.8rem 1rem;
  background-color: rgba(7, 11, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #F8FAFC;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  outline: none;
  box-sizing: border-box;
}

.form-input--with-icon {
  padding-right: 3rem;
}

.form-input:focus {
  border-color: #3B82F6;
  background-color: rgba(7, 11, 20, 1);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18), 0 0 20px -5px rgba(59, 130, 246, 0.15);
}

.form-group--error .form-input {
  border-color: rgba(239, 68, 68, 0.5);
}

.form-group--error .form-input:focus {
  border-color: #EF4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.form-eye-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  font-size: 1rem;
  line-height: 1;
  opacity: 0.6;
  transition: opacity 0.15s ease;
}

.form-eye-btn:hover {
  opacity: 1;
}

.form-error-msg {
  font-size: 0.75rem;
  color: #F87171;
  font-weight: 500;
}

/* Submit Button */
.login-btn {
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.25rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.35), 0 0 0 1px rgba(37,99,235,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  letter-spacing: 0.01em;
  position: relative;
  overflow: hidden;
}

.login-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
  pointer-events: none;
}

.login-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  box-shadow: 0 6px 24px rgba(37, 99, 235, 0.5), 0 0 0 1px rgba(59,130,246,0.5);
  transform: translateY(-1px);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(37, 99, 235, 0.3);
}

.login-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none;
}

.login-btn__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

.login-btn__arrow {
  font-size: 1.1rem;
  transition: transform 0.2s ease;
}

.login-btn:hover:not(:disabled) .login-btn__arrow {
  transform: translateX(3px);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ===== FOOTER ===== */
.login-footer {
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.login-footer__lock {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  color: #334155;
  font-weight: 500;
}
</style>
