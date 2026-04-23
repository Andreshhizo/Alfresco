<template>
  <div class="not-found">
    <div class="not-found__content">
      <span class="not-found__number">404</span>
      <h1 class="not-found__title">Página no encontrada</h1>
      <p class="not-found__desc">Parece que el mar se llevó esta página. Volvamos al restaurante.</p>
      <div class="not-found__actions">
        <RouterLink to="/" class="btn btn-primary">Ir al Inicio</RouterLink>
        <RouterLink to="/menu" class="btn btn-ghost">Ver el Menú</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  background: var(--color-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-8);
}
.not-found__content { max-width: 500px; }
.not-found__number {
  font-family: var(--font-display);
  font-size: clamp(6rem, 15vw, 10rem);
  font-weight: 300;
  color: rgba(201,169,110,0.2);
  line-height: 1;
  display: block;
}
.not-found__title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 300;
  color: var(--color-cream);
  margin-bottom: var(--space-4);
}
.not-found__desc { font-size: var(--text-lg); color: rgba(184,205,196,0.6); margin-bottom: var(--space-10); }
.not-found__actions { display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap; }
</style>
