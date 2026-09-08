// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // --- Módulos & Componentes ---
  modules: [],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/components',
    },
  ],

  // --- CSS Global ---
  // Nuxt 4: assets ficam dentro de app/assets
  css: [
    '~/assets/css/tokens.css',
    '~/assets/css/reset.css',
    '~/assets/css/typography.css',
    '~/assets/css/utilities.css',
  ],

  // --- Fontes via Google Fonts (link preconnect manual no app.vue) ---
  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
        },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0A3D7C' },
        // GTM configurado via script tag abaixo
      ],
      script: [
        {
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P9QC6V4C');`,
          type: 'text/javascript',
        },
      ],
      noscript: [
        {
          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P9QC6V4C" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        },
      ],
    },
  },

  // --- SEO ---
  // Sitemap e robots gerenciados via arquivos estáticos em public/
  // Schema.org via useSchemaOrg em app.vue

  // --- Roteamento e Redirects 301 ---
  // Preservação de SEO: URLs antigas com tráfego indexado são redirecionadas
  routeRules: {
    // Produtos
    '/faz': { redirect: { to: '/solucoes/faz', statusCode: 301 } },
    '/faz/**': { redirect: { to: '/experimente', statusCode: 301 } },
    '/servicos/acompanhamento-de-publicacoes': { redirect: { to: '/solucoes/acompanhamento-publicacoes', statusCode: 301 } },
    '/servicos/licitacoes': { redirect: { to: '/solucoes', statusCode: 301 } },
    '/servicos/pericias': { redirect: { to: '/atendimento', statusCode: 301 } },

    // Institucional
    '/artigos': { redirect: { to: '/noticias', statusCode: 301 } },
    '/artigos/**': { redirect: { to: '/noticias', statusCode: 301 } },
    '/contato': { redirect: { to: '/atendimento', statusCode: 301 } },

    // Conteúdo legado — removido da navegação institucional
    // Redireciona para notícias para preservar link equity
    '/calculo-de-igpm': { redirect: { to: '/noticias', statusCode: 301 } },
    '/salario-minimo': { redirect: { to: '/noticias', statusCode: 301 } },
    '/modelos-de-cartas': { redirect: { to: '/noticias', statusCode: 301 } },
    '/modelos-de-contratos': { redirect: { to: '/noticias', statusCode: 301 } },
    '/modelos-de-peticoes': { redirect: { to: '/noticias', statusCode: 301 } },
    '/indices-de-legislacao': { redirect: { to: '/noticias', statusCode: 301 } },
    '/expressoes-juridicas': { redirect: { to: '/noticias', statusCode: 301 } },
    '/area-do-cliente': { redirect: { to: '/atendimento', statusCode: 301 } },

    // Renderização — SSG para páginas estáticas, SSR para dinâmicas
    '/': { prerender: true },
    '/solucoes': { prerender: true },
    '/solucoes/**': { prerender: true },
    '/tecnologia': { prerender: true },
    '/cyber-security': { prerender: true },
    '/lgpd': { prerender: true },
    '/sobre': { prerender: true },
    '/atendimento': { prerender: true },
    '/experimente': { prerender: true },
    '/privacidade': { prerender: true },

    // Server routes — API segura
    '/api/**': { cors: false },
  },

  // --- Runtime config (variáveis de ambiente) ---
  runtimeConfig: {
    // Privado — apenas server-side
    emailSmtpHost: '',
    emailSmtpPort: '',
    emailSmtpUser: '',
    emailSmtpPass: '',
    emailTo: '',
    // Público — exposto ao cliente
    public: {
      siteUrl: 'https://www.sedep.com.br',
      wpApiUrl: 'https://www.sedep.com.br/wp-json/wp/v2',
    },
  },

  // --- Nitro (Server) ---
  nitro: {
    compressPublicAssets: true,
  },

  // --- Build ---
  experimental: {
    inlineRouteRules: true,
  },
})
