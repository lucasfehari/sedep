// Endpoint seguro para recebimento do formulário de contato.
// NUNCA expõe credenciais ao cliente.
// Adaptador agnóstico — pronto para integrar SMTP, CRM ou webhook.

import { defineEventHandler, readBody, createError } from 'h3'

interface ContactPayload {
  name: string
  company: string
  email: string
  phone: string
  solution: string
  message?: string
  consent: boolean
}

// Validação server-side simples e robusta
function validate(data: Partial<ContactPayload>): string | null {
  if (!data.name || data.name.trim().length < 2) return 'Nome inválido.'
  if (!data.company || data.company.trim().length < 1) return 'Empresa obrigatória.'
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'E-mail inválido.'
  if (!data.phone || data.phone.replace(/\D/g, '').length < 10) return 'Telefone inválido.'
  if (!data.solution) return 'Selecione uma solução de interesse.'
  if (!data.consent) return 'É necessário aceitar a Política de Privacidade.'
  return null
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<ContactPayload>>(event)

  // Validação
  const validationError = validate(body)
  if (validationError) {
    throw createError({
      statusCode: 400,
      statusMessage: validationError,
    })
  }

  const payload = body as ContactPayload

  // Rate limiting básico — em produção usar redis ou upstash
  // TODO: implementar rate limiting por IP

  try {
    // --- ADAPTADOR DE INTEGRAÇÃO ---
    // Escolha UMA das opções abaixo e configure as env vars correspondentes.
    // As outras ficam comentadas como referência.

    // OPÇÃO A: Log estruturado (desenvolvimento / fallback)
    console.log('[SEDEP Contact Form]', {
      timestamp: new Date().toISOString(),
      name: payload.name,
      company: payload.company,
      email: payload.email,
      phone: payload.phone,
      solution: payload.solution,
      message: payload.message || '(sem mensagem)',
    })

    // OPÇÃO B: E-mail via SMTP (descomentar quando configurado)
    // const config = useRuntimeConfig()
    // if (config.emailSmtpHost) {
    //   await sendEmail({
    //     to: config.emailTo,
    //     subject: `[SEDEP] Novo contato: ${payload.name} — ${payload.solution}`,
    //     body: formatEmailBody(payload),
    //   })
    // }

    // OPÇÃO C: Webhook externo (CRM, Pipedrive, Hubspot, etc.)
    // const config = useRuntimeConfig()
    // if (config.webhookUrl) {
    //   await $fetch(config.webhookUrl, {
    //     method: 'POST',
    //     body: payload,
    //   })
    // }

    return {
      success: true,
      message: 'Mensagem enviada com sucesso. Nossa equipe entrará em contato em breve.',
    }
  } catch (error) {
    console.error('[SEDEP Contact Form Error]', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno. Por favor, tente novamente ou entre em contato pelo telefone.',
    })
  }
})
