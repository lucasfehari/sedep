<template>
  <div>
    <section class="section" style="padding-top:clamp(4rem,10vw,8rem);" aria-labelledby="priv-heading">
      <div class="container--narrow">
        <p class="section-label">Privacidade</p>
        <h1 id="priv-heading">Política de Privacidade</h1>
        <p class="caption" style="margin-top:0.5rem;">Última atualização: {{ lastUpdated }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container--narrow prose">
        <h2>1. Quem somos</h2>
        <p>
          SEDEP Brasil, empresa brasileira com sede em Campo Grande, Mato Grosso do Sul, responsável pelo desenvolvimento e operação dos produtos Sedep Faz, LegalLake e Acompanhamento de Publicações.
        </p>

        <h2>2. Quais dados coletamos</h2>
        <p>Coletamos dados nas seguintes situações:</p>
        <ul>
          <li><strong>Formulários de contato:</strong> Nome, empresa, e-mail, telefone e mensagem — para retorno da sua solicitação.</li>
          <li><strong>Acesso aos sistemas:</strong> Dados de autenticação (e-mail, senha), dados de uso e logs técnicos — para operar os serviços contratados.</li>
          <li><strong>Cookies:</strong> Dados de navegação e preferências — para análise de uso do site (Google Analytics / GTM) e funcionamento técnico.</li>
        </ul>

        <h2>3. Como usamos seus dados</h2>
        <ul>
          <li>Responder solicitações enviadas pelos formulários de contato</li>
          <li>Operar e melhorar os produtos contratados</li>
          <li>Enviar comunicações relacionadas à conta (apenas quando relevante)</li>
          <li>Cumprir obrigações legais</li>
        </ul>

        <h2>4. Base legal (LGPD)</h2>
        <p>O tratamento de dados pela SEDEP se baseia em:</p>
        <ul>
          <li><strong>Consentimento</strong> (Art. 7º, I) — quando você preenche um formulário e aceita expressamente</li>
          <li><strong>Execução de contrato</strong> (Art. 7º, V) — para operar os serviços contratados</li>
          <li><strong>Legítimo interesse</strong> (Art. 7º, IX) — para análise agregada de uso e melhoria dos sistemas</li>
          <li><strong>Obrigação legal</strong> (Art. 7º, II) — quando exigido por lei</li>
        </ul>

        <h2>5. Seus direitos</h2>
        <p>Como titular dos dados, você tem direito a:</p>
        <ul>
          <li>Confirmar a existência de tratamento</li>
          <li>Acessar seus dados</li>
          <li>Corrigir dados incompletos ou desatualizados</li>
          <li>Solicitar anonimização, bloqueio ou eliminação</li>
          <li>Revogar o consentimento</li>
          <li>Solicitar portabilidade</li>
        </ul>
        <p>Para exercer esses direitos: <a href="mailto:privacidade@sedep.com.br">privacidade@sedep.com.br</a></p>

        <h2>6. Compartilhamento</h2>
        <p>
          A SEDEP não vende dados pessoais. Compartilhamos dados apenas com provedores de infraestrutura essencial para operação dos sistemas (hospedagem, e-mail) e quando exigido por lei.
        </p>

        <h2>7. Segurança</h2>
        <p>
          Adotamos controles técnicos e organizacionais para proteger seus dados contra acesso não autorizado, perda e uso indevido — incluindo criptografia, controle de acesso e monitoramento.
        </p>

        <h2>8. Contato</h2>
        <p>
          Dúvidas sobre esta política ou sobre o tratamento de seus dados:<br />
          <a href="mailto:privacidade@sedep.com.br">privacidade@sedep.com.br</a><br />
          <a href="tel:6732130810">(67) 3213-0810</a>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
useSeoMeta({
  title: 'Política de Privacidade | SEDEP',
  description: 'Política de Privacidade da SEDEP. Como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD.',
})

const lastUpdated = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
</script>

<style scoped>
.prose h2 {
  font-size: var(--text-xl);
  font-family: var(--font-body);
  font-weight: var(--font-weight-semibold);
  color: var(--color-ink);
  margin-top: var(--space-10);
  margin-bottom: var(--space-4);
  letter-spacing: normal;
}

.prose p, .prose li {
  font-size: var(--text-base);
  color: var(--color-ink-medium);
  line-height: var(--line-height-body);
}

.prose ul {
  list-style: disc;
  padding-left: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: var(--space-4) 0;
}

.prose a {
  color: var(--color-sedep-blue-mid);
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
