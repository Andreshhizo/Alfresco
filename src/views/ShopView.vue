<template>
  <div class="shop-page">

    <section class="page-hero">
      <img src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1800&auto=format&fit=crop&q=85" alt="Tienda Alfresco" class="page-hero__img" />
      <div class="page-hero__overlay" />
      <div class="page-hero__content container">
        <p class="section-subtitle animate-fade-up">Lleva Alfresco a Casa</p>
        <h1 class="page-hero__title animate-fade-up delay-100">Nuestra Tienda</h1>
        <p class="page-hero__desc animate-fade-up delay-200">Productos gourmet, conservas artesanales y experiencias premium</p>
      </div>
    </section>

    <section class="section shop-section">
      <div class="container">

        <div class="shop-toolbar reveal">
          <div class="shop-filters">
            <button
              v-for="cat in shopCategories"
              :key="cat.id"
              class="menu-filter-btn"
              :class="{ active: activeFilter === cat.id }"
              @click="activeFilter = cat.id"
            >
              {{ cat.icon }} {{ cat.label }}
            </button>
          </div>
          <div class="shop-sort">
            <select class="form-select" v-model="sortBy" style="width: auto; padding: 0.5rem 1rem;">
              <option value="default">Orden predeterminado</option>
              <option value="price_asc">Precio: menor a mayor</option>
              <option value="price_desc">Precio: mayor a menor</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>
        </div>

        <div class="shop-grid">
          <article
            v-for="(product, i) in sortedProducts"
            :key="product.id"
            class="product-card reveal"
            :class="`delay-${(i % 4) * 75}`"
          >
            <div class="product-card__img">
              <img :src="product.image" :alt="product.name" class="img-cover" />
              <div class="product-card__actions">
                <button class="product-card__wish" aria-label="Favorito">♡</button>
                <span class="product-card__badge" v-if="product.badge">{{ product.badge }}</span>
              </div>
            </div>
            <div class="product-card__body">
              <span class="tag" style="margin-bottom: 0.5rem; display: inline-block;">{{ product.category }}</span>
              <h3 class="product-card__name">{{ product.name }}</h3>
              <p class="product-card__desc">{{ product.description }}</p>
              <div class="product-card__footer">
                <span class="product-card__price">S/ {{ product.price }}</span>
                <button class="btn btn-dark product-card__btn" @click="addToCart(product)">
                  + Añadir
                </button>
              </div>
            </div>
          </article>
        </div>

        <div v-if="sortedProducts.length === 0" class="shop-empty reveal">
          <p>No hay productos en esta categoría aún.</p>
        </div>

        <div class="shop-info reveal">
          <div class="shop-info__card">
            <span class="shop-info__icon">🚚</span>
            <h4>Delivery Lima</h4>
            <p>Entregamos en Lima Metropolitana. Consulta disponibilidad para otras ciudades.</p>
          </div>
          <div class="shop-info__card">
            <span class="shop-info__icon">❄️</span>
            <h4>Cadena de Frío</h4>
            <p>Todos nuestros productos perecederos son enviados con empaque isotérmico.</p>
          </div>
          <div class="shop-info__card">
            <span class="shop-info__icon">📞</span>
            <h4>Pedidos por WhatsApp</h4>
            <p>Para pedidos especiales o en cantidad, contáctanos directamente por WhatsApp.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Cart notification toast -->
    <Transition name="toast">
      <div v-if="showToast" class="cart-toast">
        ✓ Producto añadido al carrito
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const activeFilter = ref('all')
const sortBy = ref('default')
const showToast = ref(false)

const shopCategories = [
  { id: 'all', icon: '🌊', label: 'Todo' },
  { id: 'conservas', icon: '🥫', label: 'Conservas' },
  { id: 'salsas', icon: '🫙', label: 'Salsas & Aderezos' },
  { id: 'packs', icon: '🎁', label: 'Gift Packs' },
  { id: 'experiencias', icon: '🥂', label: 'Experiencias' },
]

const products = [
  { id: 1, name: 'Conserva de Pulpo en Aceite de Oliva', category: 'Conservas', description: 'Pulpo mediterráneo en aceite de oliva virgen extra con hierbas finas. 180g.', price: 38, badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=85', filter: 'conservas' },
  { id: 2, name: 'Leche de Tigre Alfresco', category: 'Salsas & Aderezos', description: 'Nuestra icónica base de ceviche, lista para usar. Botella 500ml.', price: 32, badge: 'Signature', image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&auto=format&fit=crop&q=85', filter: 'salsas' },
  { id: 3, name: 'Pack Gourmet Marino', category: 'Gift Packs', description: 'Conserva de pulpo + Leche de Tigre + Salsa de Ají Amarillo + packaging premium.', price: 95, badge: 'Nuevo', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=85', filter: 'packs' },
  { id: 4, name: 'Salsa de Ají Amarillo Artesanal', category: 'Salsas & Aderezos', description: 'Ají amarillo fresco del norte peruano con toques de limón y culantro. 250ml.', price: 24, badge: null, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=85', filter: 'salsas' },
  { id: 5, name: 'Conserva de Anchoveta Premium', category: 'Conservas', description: 'Anchoveta peruana del litoral, prensada en aceite de oliva. Lata 120g.', price: 22, badge: null, image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&auto=format&fit=crop&q=85', filter: 'conservas' },
  { id: 6, name: 'Experiencia Ceviche en Casa', category: 'Experiencias', description: 'Kit completo para preparar ceviche Alfresco: insumos frescos + receta + video del chef.', price: 120, badge: 'Exclusivo', image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=600&auto=format&fit=crop&q=85', filter: 'experiencias' },
  { id: 7, name: 'Pack Navideño Alfresco', category: 'Gift Packs', description: 'Selección especial de 5 productos gourmet en caja de madera artesanal con lazo dorado.', price: 185, badge: 'Edición Especial', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=85', filter: 'packs' },
  { id: 8, name: 'Chicha Morada Artesanal', category: 'Salsas & Aderezos', description: 'Concentrado de chicha morada con maíz cusqueño, clavo y canela. 1 litro.', price: 28, badge: null, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop&q=85', filter: 'salsas' },
]

const filteredProducts = computed(() => {
  if (activeFilter.value === 'all') return products
  return products.filter(p => p.filter === activeFilter.value)
})

const sortedProducts = computed(() => {
  const list = [...filteredProducts.value]
  if (sortBy.value === 'price_asc') return list.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price_desc') return list.sort((a, b) => b.price - a.price)
  if (sortBy.value === 'name') return list.sort((a, b) => a.name.localeCompare(b.name))
  return list
})

function addToCart(product) {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
  })
  cartStore.isOpen = false
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 2500)
}
</script>

<style scoped>
.page-hero { position: relative; height: 50vh; min-height: 380px; display: flex; align-items: flex-end; overflow: hidden; }
.page-hero__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.page-hero__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,30,27,0.85), rgba(15,30,27,0.3)); }
.page-hero__content { position: relative; z-index: 1; padding-bottom: var(--space-16); }
.page-hero__title { font-family: var(--font-display); font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 300; color: var(--color-cream); margin: 0.5rem 0 0.75rem; }
.page-hero__desc { font-size: var(--text-lg); color: rgba(232,220,200,0.75); font-weight: 300; }

.shop-toolbar { display: flex; justify-content: space-between; align-items: center; gap: var(--space-5); flex-wrap: wrap; margin-bottom: var(--space-10); }
.shop-filters { display: flex; gap: var(--space-2); flex-wrap: wrap; }
.menu-filter-btn { padding: var(--space-2) var(--space-5); font-size: var(--text-sm); font-weight: 300; letter-spacing: var(--tracking-wide); border: 1px solid var(--border-light); border-radius: var(--radius-full); color: var(--text-muted); transition: all var(--dur-fast); }
.menu-filter-btn:hover, .menu-filter-btn.active { background: var(--color-gold); border-color: var(--color-gold); color: var(--color-deep); }

.shop-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}

.product-card { background: var(--color-ivory); border: 1px solid var(--border-light); border-radius: var(--radius-md); overflow: hidden; transition: transform var(--dur-normal) var(--ease-out), box-shadow var(--dur-normal) var(--ease-out); }
.product-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-xl); }
.product-card__img { position: relative; aspect-ratio: 1/1; overflow: hidden; }
.product-card__img img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--dur-slow) var(--ease-out); }
.product-card:hover .product-card__img img { transform: scale(1.06); }
.product-card__actions { position: absolute; top: var(--space-3); left: var(--space-3); right: var(--space-3); display: flex; justify-content: space-between; align-items: flex-start; }
.product-card__wish { font-size: 1.2rem; width: 32px; height: 32px; background: rgba(250,248,243,0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all var(--dur-fast); }
.product-card__wish:hover { background: var(--color-gold); }
.product-card__badge { background: var(--color-gold); color: var(--color-deep); font-size: var(--text-xs); font-weight: 500; letter-spacing: var(--tracking-wide); text-transform: uppercase; padding: var(--space-1) var(--space-3); border-radius: var(--radius-sm); }
.product-card__body { padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-2); }
.product-card__name { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 300; line-height: var(--leading-snug); }
.product-card__desc { font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-relaxed); flex: 1; }
.product-card__footer { display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-3); }
.product-card__price { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 300; color: var(--color-gold); }
.product-card__btn { padding: var(--space-2) var(--space-4); font-size: var(--text-sm); }

.shop-empty { text-align: center; padding: var(--space-20) 0; color: var(--text-muted); }

.shop-info { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); margin-top: var(--space-16); }
.shop-info__card { background: var(--color-cream); border-radius: var(--radius-md); padding: var(--space-8); text-align: center; border: 1px solid var(--border-light); }
.shop-info__icon { font-size: 2rem; display: block; margin-bottom: var(--space-3); }
.shop-info__card h4 { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 300; margin-bottom: var(--space-2); }
.shop-info__card p { font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-relaxed); }

.cart-toast { position: fixed; bottom: var(--space-8); right: var(--space-8); background: var(--color-forest); color: var(--color-cream); padding: var(--space-4) var(--space-6); border-radius: var(--radius-md); border-left: 3px solid var(--color-gold); font-size: var(--text-sm); z-index: 500; box-shadow: var(--shadow-lg); }
.toast-enter-active, .toast-leave-active { transition: all var(--dur-normal) var(--ease-out); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(20px); }

@media (max-width: 1024px) { .shop-grid { grid-template-columns: repeat(2, 1fr); } .shop-info { grid-template-columns: 1fr; } }
@media (max-width: 640px) { .shop-grid { grid-template-columns: 1fr; } }
</style>
