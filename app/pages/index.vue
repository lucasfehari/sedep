<template>
  <div>
    <!-- 1. Hero SaaS com Ilustração Oficial do Sistema e Emojis de iPhone -->
    <SectionHero />

    <!-- 2. Carrossel Infinito de Empresas e Escritórios que Usam SEDEP -->
    <SectionClientsLogos />

    <!-- 3. Barra de Métricas & Prova Social (+40 anos, 800M processos) -->
    <SectionTrust />

    <!-- 4. Comparativo de Softwares (Sedep Faz vs LegalLake) -->
    <SectionProducts />

    <!-- 5. Deep-Dive de Funcionalidades & UI Mockup (Faz: IA e Automações) -->
    <SectionTechnology />

    <!-- 6. Tabela de Planos e Preços (Mensal / Anual) -->
    <SectionPricing />



    <!-- 8. Carrossel de Clientes do Setor Público & Órgãos de Governo -->
    <SectionPublicClients />

    <!-- 9. Ecossistema de Tecnologia & Segurança -->
    <SectionEcosystem />

    <!-- 10. Certificações & Conquistas (GPTW, ReclameAQUI) -->
    <SectionCertifications />

    <!-- 11. Notícias & Insights -->
    <SectionNews />

    <!-- 12. Banner de Conversão Final -->
    <SectionCTA />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

useSeoMeta({
  title: "SEDEP — Softwares de Gestão Jurídica com Inteligência Integrada",
  ogTitle: "SEDEP — Softwares de Gestão Jurídica com Inteligência Integrada",
  description:
    "Conheça os softwares jurídicos e soluções de inteligência da SEDEP: Sedep Faz e LegalLake. Gestão completa, automações de prazos, andamentos e +800M de processos.",
  ogDescription:
    "Conheça os softwares jurídicos e soluções de inteligência da SEDEP: Sedep Faz e LegalLake. Gestão completa, automações de prazos, andamentos e +800M de processos.",
});
</script>
