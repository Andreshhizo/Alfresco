<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="container footer__grid">

        <!-- Brand -->
        <div class="footer__brand">
          <div class="footer__logo">
            <span class="footer__logo-name">Alfresco</span>
            <span class="footer__logo-sub">Restaurante Marino Premium</span>
          </div>
          <p class="footer__tagline">
            Íconos de la comida costera peruana.<br>
            Elegancia, sabor y tradición marina desde 1991.
          </p>
          <div class="footer__social">
            <a href="https://www.instagram.com/restaurantealfresco/" target="_blank" rel="noopener" aria-label="Instagram" class="footer__social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/p/Restaurante-Alfresco-oficial-100087885792494/" target="_blank" rel="noopener" aria-label="Facebook" class="footer__social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://www.tripadvisor.com.pe/Restaurant_Review-g294316-d775152-Reviews-Restaurante_Alfresco-Lima_Lima_Region.html" target="_blank" rel="noopener" aria-label="TripAdvisor" class="footer__social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.006 4.295c-2.67 0-4.847.811-6.534 2.433L3 5H1v2l1.5 1.5C1.56 9.77 1 11.3 1 13c0 3.866 3.134 7 7 7a6.99 6.99 0 005.294-2.435A6.99 6.99 0 0018.586 20C21.57 20 24 17.57 24 14.586c0-1.7-.56-3.231-1.5-4.5L24 8.5V6.5h-2l-2.472 1.728C17.841 6.706 15.424 4.295 12.006 4.295zM8 10a3 3 0 110 6 3 3 0 010-6zm8.586 0a3 3 0 110 6 3 3 0 010-6z"/></svg>
            </a>
            <a href="https://wa.me/51979701279" target="_blank" rel="noopener" aria-label="WhatsApp" class="footer__social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div class="footer__col">
          <h4 class="footer__col-title">Páginas</h4>
          <ul class="footer__links">
            <li><RouterLink to="/">Inicio</RouterLink></li>
            <li><RouterLink to="/nosotros">Sobre Nosotros</RouterLink></li>
            <li><RouterLink to="/menu">Nuestra Carta</RouterLink></li>
            <li><RouterLink to="/tienda">Tienda</RouterLink></li>
            <li><RouterLink to="/galeria">Galería</RouterLink></li>
            <li><RouterLink to="/blog">Blog</RouterLink></li>
          </ul>
        </div>

        <!-- Contact & Hours -->
        <div class="footer__col">
          <h4 class="footer__col-title">{{ $t('footer.schedule') }}</h4>
          <div class="footer__schedule">
            <div class="footer__schedule-row">
              <span>{{ $t('footer.mon_fri') }}</span>
              <span>12:00 – 22:00</span>
            </div>
            <div class="footer__schedule-row">
              <span>{{ $t('footer.sat') }}</span>
              <span>12:00 – 23:00</span>
            </div>
            <div class="footer__schedule-row">
              <span>{{ $t('footer.sun') }}</span>
              <span>12:00 – 21:00</span>
            </div>
          </div>

          <h4 class="footer__col-title" style="margin-top: 1.5rem;">Contacto</h4>
          <ul class="footer__links">
            <li>
              <a href="https://maps.app.goo.gl/rdAnUJh5o8TiGsc59" target="_blank" rel="noopener">
                Av. 28 de Julio 331, Lima 15074
              </a>
            </li>
            <li>
              <a href="https://wa.me/51979701279">+51 979 701 279</a>
            </li>
            <li>
              <a href="https://www.covermanager.com/reserve/module_restaurant/restaurante-alfresco/spanish" target="_blank" rel="noopener">
                Reservas Online
              </a>
            </li>
          </ul>
        </div>

        <!-- Reserve CTA -->
        <div class="footer__col footer__reserve">
          <div class="footer__reserve-card">
            <p class="footer__reserve-label">¿Tienes ocasión especial?</p>
            <h3 class="footer__reserve-title">Reserva tu mesa hoy</h3>
            <RouterLink to="/reservas" class="btn btn-primary" style="margin-top: 1rem;">
              Hacer Reservación
            </RouterLink>
            <a href="https://wa.me/51979701279?text=Hola,%20quiero%20hacer%20una%20reserva%20en%20Alfresco" target="_blank" rel="noopener" class="btn btn-outline" style="margin-top: 0.75rem;">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p class="footer__copy">© {{ new Date().getFullYear() }} Alfresco Restaurante. {{ $t('footer.rights') }}</p>
        <p class="footer__credit">Av. 28 de Julio 331, Miraflores, Lima, Perú</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-deep);
  color: var(--color-foam);
}

.footer__top {
  padding: var(--space-20) 0 var(--space-16);
  border-top: 1px solid rgba(201,169,110,0.2);
}

.footer__grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.2fr 1.2fr;
  gap: var(--space-12);
  align-items: start;
}

.footer__logo { margin-bottom: var(--space-5); }
.footer__logo-name {
  display: block;
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: var(--weight-light);
  color: var(--color-cream);
  letter-spacing: 0.05em;
}
.footer__logo-sub {
  display: block;
  font-size: var(--text-xs);
  font-weight: var(--weight-light);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold);
  margin-top: 2px;
}

.footer__tagline {
  font-size: var(--text-sm);
  font-weight: var(--weight-light);
  line-height: var(--leading-relaxed);
  color: rgba(184,205,196,0.7);
  margin-bottom: var(--space-6);
}

.footer__social {
  display: flex;
  gap: var(--space-3);
}
.footer__social-link {
  width: 38px; height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(201,169,110,0.2);
  border-radius: var(--radius-sm);
  color: rgba(184,205,196,0.6);
  transition: all var(--dur-fast) var(--ease-out);
}
.footer__social-link:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
  background: rgba(201,169,110,0.08);
}

.footer__col-title {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: var(--space-5);
}

.footer__links { display: flex; flex-direction: column; gap: var(--space-3); }
.footer__links a {
  font-size: var(--text-sm);
  font-weight: var(--weight-light);
  color: rgba(184,205,196,0.7);
  transition: color var(--dur-fast);
}
.footer__links a:hover { color: var(--color-cream); }

.footer__schedule { display: flex; flex-direction: column; gap: var(--space-3); }
.footer__schedule-row {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-sm);
  font-weight: var(--weight-light);
  color: rgba(184,205,196,0.7);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid rgba(201,169,110,0.08);
}

.footer__reserve-card {
  background: rgba(45,74,62,0.4);
  border: 1px solid rgba(201,169,110,0.2);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
}
.footer__reserve-label {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: var(--space-2);
}
.footer__reserve-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--weight-light);
  color: var(--color-cream);
  line-height: var(--leading-tight);
}

.footer__bottom {
  border-top: 1px solid rgba(201,169,110,0.1);
  padding: var(--space-6) 0;
}
.footer__bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer__copy, .footer__credit {
  font-size: var(--text-xs);
  color: rgba(184,205,196,0.4);
  font-weight: var(--weight-light);
  letter-spacing: var(--tracking-wide);
}

@media (max-width: 1024px) {
  .footer__grid { grid-template-columns: 1fr 1fr; gap: var(--space-10); }
}
@media (max-width: 640px) {
  .footer__grid { grid-template-columns: 1fr; gap: var(--space-8); }
  .footer__bottom-inner { flex-direction: column; gap: var(--space-2); text-align: center; }
}
</style>
