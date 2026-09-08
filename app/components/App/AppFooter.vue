<template>
  <footer class="footer" role="contentinfo">
    <div class="container">
      
      <!-- Top Grid -->
      <div class="footer__grid">

        <!-- Coluna 1: Marca & Social Proof -->
        <div class="footer__brand">
          <NuxtLink to="/" class="footer__logo" aria-label="SEDEP — Início">
            <img src="/sedep-branco.png" alt="SEDEP" class="footer__logo-img" width="130" height="37" />
          </NuxtLink>
          <p class="footer__tagline">
            Tecnologia, inovação e inteligência de dados para potencializar a advocacia brasileira desde 1981.
          </p>
          <div class="footer__contact-info">
            <span><AppleEmoji emoji="📞" :size="16" /> (67) 3213-0810</span>
            <span><AppleEmoji emoji="📱" :size="16" /> (67) 99839-3633 (WhatsApp)</span>
          </div>
        </div>

        <!-- Coluna 2: Softwares -->
        <div class="footer__col">
          <p class="footer__col-title">Softwares</p>
          <ul class="footer__links" role="list">
            <li><NuxtLink to="/solucoes/faz" class="footer__link">Sedep Faz (Software Jurídico)</NuxtLink></li>
            <li><NuxtLink to="/solucoes/legallake" class="footer__link">LegalLake (800M Processos)</NuxtLink></li>
            <li><NuxtLink to="/solucoes/acompanhamento-publicacoes" class="footer__link">Acompanhamento e Publicações</NuxtLink></li>
            <li><NuxtLink to="/solucoes" class="footer__link">Ver todos os softwares</NuxtLink></li>
          </ul>
        </div>

        <!-- Coluna 3: Empresa & Tecnologia -->
        <div class="footer__col">
          <p class="footer__col-title">Empresa</p>
          <ul class="footer__links" role="list">
            <li><NuxtLink to="/sobre" class="footer__link">Sobre a SEDEP</NuxtLink></li>
            <li><NuxtLink to="/tecnologia" class="footer__link">Tecnologia & Infraestrutura</NuxtLink></li>
            <li><NuxtLink to="/cyber-security" class="footer__link">Cyber Security</NuxtLink></li>
            <li><NuxtLink to="/lgpd" class="footer__link">LGPD & Privacidade</NuxtLink></li>
            <li><NuxtLink to="/noticias" class="footer__link">Notícias & Artigos</NuxtLink></li>
          </ul>
        </div>

        <!-- Coluna 4: Acesso Rápido -->
        <div class="footer__col">
          <p class="footer__col-title">Acesso</p>
          <ul class="footer__links" role="list">
            <li><a href="https://app.faz.adv.br/" target="_blank" rel="noopener" class="footer__link">Login no Faz</a></li>
            <li><a href="https://legallake.com.br" target="_blank" rel="noopener" class="footer__link">Login no LegalLake</a></li>
            <li><NuxtLink to="/atendimento" class="footer__link">Central de Atendimento</NuxtLink></li>
            <li><NuxtLink to="/experimente" class="footer__link">Solicitar Demonstração</NuxtLink></li>
          </ul>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="footer__bottom">
        <p class="footer__copy">
          © {{ currentYear }} SEDEP Brasil. Todos os direitos reservados.
        </p>
        <div class="footer__legal">
          <NuxtLink to="/privacidade" class="footer__legal-link">Política de Privacidade</NuxtLink>
          <NuxtLink to="/privacidade" class="footer__legal-link">Termos de Uso</NuxtLink>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background-color: #0F172A;
  color: #94A3B8;
  padding-top: var(--section-spacing-md);
  border-top: 1px solid var(--color-border);
}

.footer__grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: var(--space-12);
  margin-bottom: var(--space-12);
}

.footer__brand {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.footer__logo {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.footer__logo-img {
  height: 36px;
  width: auto;
  object-fit: contain;
  transition: opacity var(--transition-fast);
}

.footer__logo:hover .footer__logo-img {
  opacity: 0.85;
}

.footer__tagline {
  font-size: var(--text-sm);
  line-height: var(--line-height-relaxed);
  color: #94A3B8;
  max-width: 32ch;
}

.footer__contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: var(--text-sm);
  color: #CBD5E1;
  font-weight: 500;
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.footer__col-title {
  font-size: var(--text-xs);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #FFFFFF;
  margin: 0;
}

.footer__links {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer__link {
  font-size: var(--text-sm);
  color: #94A3B8;
  transition: color var(--transition-fast);
}

.footer__link:hover {
  color: #FFFFFF;
}

.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: var(--space-6) 0 var(--space-8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.footer__copy {
  font-size: var(--text-xs);
  color: #64748B;
  margin: 0;
}

.footer__legal {
  display: flex;
  gap: var(--space-6);
}

.footer__legal-link {
  font-size: var(--text-xs);
  color: #64748B;
  transition: color var(--transition-fast);
}

.footer__legal-link:hover {
  color: #CBD5E1;
}

@media (max-width: 1024px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
  }
  .footer__brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 640px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }
}
</style>
