<template>
  <div>
    <a href="#main-content" class="skip-link">Pular para o conteúdo</a>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'SEDEP — Tecnologia, Segurança e Software',
  meta: [
    {
      name: 'description',
      content: 'A SEDEP é uma empresa de tecnologia com competências em desenvolvimento de software, infraestrutura de TI, segurança da informação, LGPD e soluções jurídicas. Fundada em 1981.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'SEDEP' },
    { property: 'og:locale', content: 'pt_BR' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'SEDEP',
        url: 'https://www.sedep.com.br',
        foundingDate: '1981',
        description: 'Empresa de tecnologia com competências em desenvolvimento de software, infraestrutura de TI, segurança da informação, LGPD e soluções jurídicas.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Campo Grande',
          addressRegion: 'MS',
          addressCountry: 'BR',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+55-67-3213-0810',
            contactType: 'customer service',
            areaServed: 'BR',
            availableLanguage: 'Portuguese',
          },
        ],
      }),
    },
  ],
})
</script>

<style>
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 9999;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-sedep-blue-mid);
  color: #FFFFFF;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
}

.skip-link:focus {
  top: 1rem;
}
</style>
