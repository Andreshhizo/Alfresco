<template>
  <Teleport to="body">
    <div class="overlay" :class="{ active: cartStore.isOpen }" @click="cartStore.toggleCart" />
    <aside class="drawer" :class="{ open: cartStore.isOpen }">
      <div class="drawer__header">
        <h2 class="drawer__title">Tu Pedido</h2>
        <button @click="cartStore.toggleCart" class="drawer__close" aria-label="Cerrar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="drawer__body">
        <div v-if="cartStore.items.length === 0" class="drawer__empty">
          <div class="drawer__empty-icon">🐟</div>
          <p>Tu carrito está vacío</p>
          <RouterLink to="/tienda" class="btn btn-dark" @click="cartStore.toggleCart">
            Ver Tienda
          </RouterLink>
        </div>

        <ul v-else class="drawer__items">
          <li v-for="item in cartStore.items" :key="item.id" class="drawer__item">
            <div class="drawer__item-img" :style="`background-image: url(${item.image})`" />
            <div class="drawer__item-info">
              <p class="drawer__item-name">{{ item.name }}</p>
              <p class="drawer__item-price">S/ {{ (item.price * item.quantity).toFixed(2) }}</p>
              <div class="drawer__item-qty">
                <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)">–</button>
                <span>{{ item.quantity }}</span>
                <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)">+</button>
              </div>
            </div>
            <button class="drawer__item-remove" @click="cartStore.removeItem(item.id)" aria-label="Eliminar">×</button>
          </li>
        </ul>
      </div>

      <div v-if="cartStore.items.length > 0" class="drawer__footer">
        <div class="drawer__total">
          <span>Total</span>
          <span>S/ {{ cartStore.total.toFixed(2) }}</span>
        </div>
        <a href="https://wa.me/51979701279" target="_blank" rel="noopener" class="btn btn-primary w-full" style="justify-content: center;">
          Pedir por WhatsApp
        </a>
        <button @click="cartStore.clearCart" class="btn btn-ghost w-full" style="justify-content: center; margin-top: 0.5rem;">
          Vaciar carrito
        </button>
      </div>
    </aside>
  </Teleport>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
</script>

<style scoped>
.drawer {
  position: fixed;
  top: 0; right: 0; bottom: 0;
  width: min(400px, 100vw);
  background: var(--color-ivory);
  z-index: 200;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform var(--dur-slow) var(--ease-out);
  box-shadow: var(--shadow-xl);
}
.drawer.open { transform: translateX(0); }

.drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6) var(--space-6);
  border-bottom: 1px solid var(--border-light);
}
.drawer__title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--weight-light);
}
.drawer__close {
  color: var(--text-muted);
  transition: color var(--dur-fast);
  padding: var(--space-2);
}
.drawer__close:hover { color: var(--text-primary); }

.drawer__body { flex: 1; overflow-y: auto; padding: var(--space-6); }

.drawer__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: var(--space-4);
  text-align: center;
}
.drawer__empty-icon { font-size: 3rem; }
.drawer__empty p { color: var(--text-muted); font-weight: var(--weight-light); }

.drawer__items { display: flex; flex-direction: column; gap: var(--space-4); }
.drawer__item {
  display: flex;
  gap: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-light);
  position: relative;
}
.drawer__item-img {
  width: 72px; height: 72px;
  border-radius: var(--radius-sm);
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
}
.drawer__item-info { flex: 1; }
.drawer__item-name {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  margin-bottom: var(--space-1);
}
.drawer__item-price {
  color: var(--color-gold);
  font-size: var(--text-sm);
  margin-bottom: var(--space-2);
}
.drawer__item-qty {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.drawer__item-qty button {
  width: 24px; height: 24px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  font-size: var(--text-base);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--dur-fast);
}
.drawer__item-qty button:hover { border-color: var(--color-gold); color: var(--color-gold); }
.drawer__item-qty span { font-size: var(--text-sm); font-weight: var(--weight-medium); }
.drawer__item-remove {
  position: absolute;
  top: 0; right: 0;
  color: var(--text-muted);
  font-size: 1.2rem;
  transition: color var(--dur-fast);
}
.drawer__item-remove:hover { color: var(--color-terracotta); }

.drawer__footer {
  padding: var(--space-6);
  border-top: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.drawer__total {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-lg);
  font-weight: var(--weight-medium);
  margin-bottom: var(--space-2);
}
</style>
