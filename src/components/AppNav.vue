<template>
  <nav class="nav" :class="{ scrolled: isScrolled, 'menu-open': mobileOpen }">
    <div class="nav__inner container">

      <!-- Logo -->
      <RouterLink to="/" class="nav__logo" @click="closeMobile">
        <span class="nav__logo-text">Alfresco</span>
        <span class="nav__logo-sub">Restaurante Marino</span>
      </RouterLink>

      <!-- Desktop links -->
      <ul class="nav__links">
        <li v-for="link in navLinks" :key="link.name">
          <RouterLink :to="link.path" class="nav__link" active-class="nav__link--active">
            {{ $t(`nav.${link.key}`) }}
          </RouterLink>
        </li>
      </ul>

      <!-- Actions -->
      <div class="nav__actions">
        <!-- Language toggle -->
        <button class="nav__lang" @click="toggleLang" :title="langLabel">
          {{ currentLang === 'es' ? 'EN' : 'ES' }}
        </button>

        <!-- Cart -->
        <button class="nav__cart" @click="cartStore.toggleCart" aria-label="Carrito">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <span v-if="cartStore.count > 0" class="nav__cart-badge">{{ cartStore.count }}</span>
        </button>

        <!-- Reserve CTA -->
        <RouterLink to="/reservas" class="btn btn-primary nav__cta">
          {{ $t('nav.reservations') }}
        </RouterLink>

        <!-- Hamburger -->
        <button class="nav__hamburger" @click="toggleMobile" :aria-label="mobileOpen ? 'Cerrar menú' : 'Abrir menú'">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="nav__mobile" :class="{ open: mobileOpen }">
      <ul>
        <li v-for="link in navLinks" :key="link.name">
          <RouterLink :to="link.path" class="nav__mobile-link" @click="closeMobile">
            {{ $t(`nav.${link.key}`) }}
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/reservas" class="btn btn-primary" style="margin-top: 1rem; width: 100%; justify-content: center;" @click="closeMobile">
            Reservar Mesa
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLangStore } from '@/stores/lang'
import { useCartStore } from '@/stores/cart'

const { locale, t } = useI18n()
const langStore = useLangStore()
const cartStore = useCartStore()

const isScrolled = ref(false)
const mobileOpen = ref(false)
const currentLang = computed(() => langStore.currentLang)
const langLabel = computed(() => currentLang.value === 'es' ? 'Switch to English' : 'Cambiar a Español')

const navLinks = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/nosotros' },
  { key: 'menu', path: '/menu' },
  { key: 'shop', path: '/tienda' },
  { key: 'gallery', path: '/galeria' },
  { key: 'blog', path: '/blog' },
  { key: 'contact', path: '/contacto' },
]

function toggleLang() {
  const newLang = currentLang.value === 'es' ? 'en' : 'es'
  langStore.setLang(newLang)
  locale.value = newLang
}
function toggleMobile() { mobileOpen.value = !mobileOpen.value }
function closeMobile() { mobileOpen.value = false }
function handleScroll() { isScrolled.value = window.scrollY > 40 }

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: var(--space-5) 0;
  transition: padding var(--dur-normal) var(--ease-out),
              background var(--dur-normal) var(--ease-out),
              box-shadow var(--dur-normal) var(--ease-out);
}

.nav.scrolled {
  padding: var(--space-3) 0;
  background: rgba(15,30,27,0.97);
  backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 rgba(201,169,110,0.2);
}

.nav:not(.scrolled) {
  background: linear-gradient(180deg, rgba(15,30,27,0.85) 0%, transparent 100%);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
}

.nav__logo {
  display: flex;
  flex-direction: column;
  gap: 1px;
  text-decoration: none;
}
.nav__logo-text {
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: var(--weight-light);
  color: var(--color-cream);
  letter-spacing: 0.05em;
  line-height: 1;
}
.nav__logo-sub {
  font-family: var(--font-body);
  font-size: 0.6rem;
  font-weight: var(--weight-light);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold);
}

.nav__links {
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

.nav__link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-light);
  letter-spacing: var(--tracking-wide);
  color: rgba(232,220,200,0.8);
  text-decoration: none;
  position: relative;
  transition: color var(--dur-fast) var(--ease-out);
}
.nav__link::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0; right: 0;
  height: 1px;
  background: var(--color-gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur-normal) var(--ease-out);
}
.nav__link:hover, .nav__link--active {
  color: var(--color-gold);
}
.nav__link:hover::after, .nav__link--active::after {
  transform: scaleX(1);
}

.nav__actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.nav__lang {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  color: rgba(232,220,200,0.7);
  transition: color var(--dur-fast);
  padding: var(--space-2) var(--space-3);
  border: 1px solid rgba(201,169,110,0.25);
  border-radius: var(--radius-sm);
}
.nav__lang:hover { color: var(--color-gold); border-color: var(--color-gold); }

.nav__cart {
  position: relative;
  color: rgba(232,220,200,0.8);
  padding: var(--space-2);
  transition: color var(--dur-fast);
}
.nav__cart:hover { color: var(--color-gold); }
.nav__cart-badge {
  position: absolute;
  top: -4px; right: -4px;
  width: 18px; height: 18px;
  background: var(--color-gold);
  color: var(--color-deep);
  border-radius: 50%;
  font-size: 10px;
  font-weight: var(--weight-medium);
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav__cta { display: none; }
.nav__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: var(--space-2);
}
.nav__hamburger span {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--color-cream);
  transition: all var(--dur-normal) var(--ease-out);
}

.nav__mobile {
  display: none;
}

/* Desktop: show CTA */
@media (min-width: 1024px) {
  .nav__cta { display: inline-flex; }
}

/* Tablet/Mobile adjustments */
@media (max-width: 1023px) {
  .nav__links { display: none; }
  .nav__hamburger { display: flex; }

  .nav__mobile {
    display: block;
    position: absolute;
    top: 100%; left: 0; right: 0;
    background: rgba(15,30,27,0.98);
    backdrop-filter: blur(16px);
    border-top: 1px solid rgba(201,169,110,0.2);
    padding: var(--space-6);
    transform: translateY(-10px);
    opacity: 0;
    pointer-events: none;
    transition: all var(--dur-normal) var(--ease-out);
  }
  .nav__mobile.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }
  .nav__mobile-link {
    display: block;
    padding: var(--space-4) 0;
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: var(--weight-light);
    color: var(--color-cream);
    border-bottom: 1px solid rgba(201,169,110,0.1);
    transition: color var(--dur-fast);
  }
  .nav__mobile-link:hover { color: var(--color-gold); }
}
</style>
