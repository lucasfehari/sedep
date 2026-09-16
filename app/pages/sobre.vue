<template>
  <div>
    <section class="section" style="padding-top:clamp(4rem,10vw,8rem);" aria-labelledby="sobre-heading">
      <div class="container">
        <div style="max-width:800px;">
          <p class="section-label">A Empresa</p>
          <h1 id="sobre-heading">SEDEP — Quatro décadas de tecnologia aplicada.</h1>
          <p class="lead" style="margin-top:1.5rem;">
            Fundada em 1981 em Campo Grande, Mato Grosso do Sul, a SEDEP acompanhou cada fase da transformação tecnológica no Brasil. Do processo manual à automação, dos sistemas locais à nuvem, do jurídico analógico ao software especializado.
          </p>
        </div>
      </div>
    </section>

    <section class="section bg-surface-alt" aria-labelledby="historia-heading">
      <div class="container">
        <h2 id="historia-heading">Uma história construída junto com a tecnologia brasileira.</h2>
        <div class="sobre-content">
          <p>
            Em 1981, quando a SEDEP foi fundada, computadores eram raridades no ambiente empresarial brasileiro. Sistemas de gestão eram processos manuais. A internet comercial ainda levaria mais de uma década para chegar.
          </p>
          <p>
            A SEDEP cresceu nesse contexto — e o acompanhou. Cada década trouxe novos desafios técnicos, novos modelos de operação, novas exigências dos clientes. A empresa respondeu construindo, adaptando e desenvolvendo soluções que faziam sentido para cada momento.
          </p>
          <p>
            Hoje, essa trajetória se traduz em algo difícil de replicar: conhecimento profundo sobre as necessidades reais de operações jurídicas e empresariais, combinado com a capacidade técnica de construir e sustentar sistemas que atendem a esses requisitos.
          </p>
          <p>
            Os produtos da SEDEP — o Faz, o LegalLake e o sistema de Publicações — não foram criados por quem olha o mercado de fora. Foram construídos por quem entende o problema de dentro há mais de quarenta anos.
          </p>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="valores-heading">
      <div class="container">
        <h2 id="valores-heading">O que orienta nosso trabalho.</h2>
        <div class="valores-grid">
          <div v-for="valor in valores" :key="valor.title" class="valor-item">
            <h3>{{ valor.title }}</h3>
            <p>{{ valor.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-surface-alt" aria-labelledby="locais-heading">
      <div class="container">
        <h2 id="locais-heading">Presença e Atuação.</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;margin-top:2rem;">
          <div>
            <p style="font-weight:600;color:var(--color-ink);margin-bottom:0.5rem;">Sede Corporativa</p>
            <p style="color:var(--color-ink-medium);font-size:var(--text-base);">Campo Grande — MS</p>
          </div>
          <div>
            <p style="font-weight:600;color:var(--color-ink);margin-bottom:0.5rem;">Unidade Regional</p>
            <p style="color:var(--color-ink-medium);font-size:var(--text-base);">Cuiabá — MT</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Carrossel de Clientes do Setor Público & Governamental -->
    <SectionPublicClients />

    <!-- Carrossel de Clientes do Setor Privado & Empresarial -->
    <SectionPrivateClients />

    <SectionCTA />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Sobre a SEDEP — Empresa de Tecnologia desde 1981',
  description: 'Fundada em 1981, a SEDEP é uma empresa de tecnologia com competências em software jurídico, infraestrutura de TI, Cyber Security e LGPD. Sediada em Campo Grande, MS.',
})

const valores = [
  { title: 'Atendimento Humano', desc: 'Suporte realizado por equipe treinada e experiente. Não terceirizamos o relacionamento com nossos clientes para chatbots genéricos.' },
  { title: 'Engenharia Responsável', desc: 'Sistemas construídos para funcionar de forma confiável em operações críticas. Robustez técnica é requisito, não diferencial.' },
  { title: 'Transparência', desc: 'Comunicação clara sobre o que cada produto faz, para quem e como. Sem promessas além do que podemos entregar.' },
  { title: 'Continuidade', desc: 'Presença de longo prazo. Não somos uma startup buscando crescimento rápido — somos uma empresa que constrói relacionamentos duráveis.' },
]
</script>

<style scoped>
.sobre-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  max-width: 720px;
  margin-top: var(--space-8);
}

.sobre-content p {
  font-size: var(--text-md);
  line-height: var(--line-height-body);
  color: var(--color-ink-medium);
  max-width: none;
}

.valores-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-8);
  margin-top: var(--space-10);
}

.valor-item {
  padding: var(--space-6);
  border: var(--border-thin);
  border-radius: var(--radius-lg);
}

.valor-item h3 {
  font-size: var(--text-lg);
  color: var(--color-ink);
  margin-bottom: var(--space-3);
}

.valor-item p {
  font-size: var(--text-sm);
  color: var(--color-ink-medium);
  max-width: none;
}

@media (max-width: 768px) {
  .valores-grid { grid-template-columns: 1fr; }
}
</style>
