<template>
  <div class="page-wrapper">
    <AppHeader />
    <main id="main-content" tabindex="-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style>
/* Skip link para acessibilidade */
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-4);
  z-index: 9999;
  padding: var(--space-3) var(--space-6);
  background-color: var(--color-sedep-blue-mid);
  color: #FFFFFF;
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-md);
  transition: top var(--transition-fast);
}

.skip-link:focus {
  top: var(--space-4);
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
