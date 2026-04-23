<template>
  <div class="menu-page">

    <section class="page-hero">
      <img src="https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=1800&auto=format&fit=crop&q=85" alt="Menú Alfresco" class="page-hero__img" />
      <div class="page-hero__overlay" />
      <div class="page-hero__content container">
        <p class="section-subtitle animate-fade-up">Gastronomía Marina</p>
        <h1 class="page-hero__title animate-fade-up delay-100">Nuestra Carta</h1>
        <p class="page-hero__desc animate-fade-up delay-200">Ingredientes del Pacífico, técnica peruana, sabor incomparable</p>
      </div>
    </section>

    <!-- Price toggle -->
    <div class="menu-toggle-bar">
      <div class="container menu-toggle-bar__inner">
        <span class="menu-toggle-bar__label">Ver precios en:</span>
        <div class="menu-toggle">
          <button :class="{ active: currency === 'PEN' }" @click="currency = 'PEN'">S/ Soles</button>
          <button :class="{ active: currency === 'USD' }" @click="currency = 'USD'">$ USD</button>
        </div>
      </div>
    </div>

    <!-- Category filters -->
    <section class="section menu-section">
      <div class="container">
        <div class="menu-filters reveal">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="menu-filter-btn"
            :class="{ active: activeCategory === cat.id }"
            @click="activeCategory = cat.id"
          >
            {{ cat.icon }} {{ cat.label }}
          </button>
        </div>

        <div class="menu-grid">
          <template v-for="cat in filteredCategories" :key="cat.id">
            <div class="menu-category reveal">
              <div class="menu-category__header">
                <h2 class="menu-category__title">{{ cat.icon }} {{ cat.label }}</h2>
                <p class="menu-category__desc">{{ cat.description }}</p>
              </div>
              <div class="menu-items">
                <article
                  v-for="(item, i) in cat.items"
                  :key="item.id"
                  class="menu-item reveal"
                  :class="`delay-${(i % 4) * 50}`"
                >
                  <div class="menu-item__img" v-if="item.image">
                    <img :src="item.image" :alt="item.name" class="img-cover" />
                  </div>
                  <div class="menu-item__info">
                    <div class="menu-item__header">
                      <div>
                        <h3 class="menu-item__name">{{ item.name }}</h3>
                        <p class="menu-item__desc">{{ item.description }}</p>
                      </div>
                      <span class="menu-item__price">
                        {{ currency === 'PEN' ? `S/ ${item.price}` : `$ ${(item.price / 3.7).toFixed(0)}` }}
                      </span>
                    </div>
                    <div class="menu-item__tags">
                      <span class="tag" v-if="item.signature">Signature</span>
                      <span class="tag tag--spicy" v-if="item.spicy">🌶 Picante</span>
                      <span class="tag tag--veg" v-if="item.vegetarian">🌿 Vegetariano</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </template>
        </div>

        <div class="menu-note reveal">
          <p>* Todos nuestros platos se preparan con ingredientes frescos del día. Infórmenos de sus alergias alimentarias.</p>
          <p>* Los precios incluyen IGV. Propina voluntaria.</p>
          <a href="https://wa.me/51979701279?text=Hola,%20quisiera%20consultar%20sobre%20la%20carta" target="_blank" class="btn btn-dark" style="margin-top: 1rem;">
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>

    <!-- Reserve CTA -->
    <section class="menu-cta">
      <div class="container text-center">
        <p class="section-subtitle" style="color:var(--color-gold);">¿Te antojaste?</p>
        <h2 class="menu-cta__title">Reserva tu mesa ahora</h2>
        <RouterLink to="/reservas" class="btn btn-primary" style="margin-top: 1.5rem;">Hacer Reservación</RouterLink>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currency = ref('PEN')
const activeCategory = ref('all')

const categories = [
  { id: 'all', icon: '🌊', label: 'Toda la Carta' },
  { id: 'ceviches', icon: '🍋', label: 'Ceviches' },
  { id: 'tiraditos', icon: '🐟', label: 'Tiraditos' },
  { id: 'entradas', icon: '🦐', label: 'Entradas' },
  { id: 'fondos', icon: '🦞', label: 'Fondos' },
  { id: 'parrilla', icon: '🔥', label: 'Parrilla Marina' },
  { id: 'postres', icon: '🍮', label: 'Postres' },
  { id: 'bebidas', icon: '🍹', label: 'Bebidas' },
]

const menuData = [
  {
    id: 'ceviches', icon: '🍋', label: 'Ceviches',
    description: 'La esencia del Perú. Elaborados con pescados y mariscos del día.',
    items: [
      { id: 1, name: 'Ceviche Clásico Alfresco', description: 'Corvina, leche de tigre, ají limo, cebolla morada, choclo y cancha serrana.', price: 52, image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=400&q=75', signature: true },
      { id: 2, name: 'Ceviche Mixto Premium', description: 'Corvina, pulpo, langostinos y conchas negras en leche de tigre con rocoto.', price: 68, image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=75', signature: false, spicy: true },
      { id: 3, name: 'Ceviche de Lenguado', description: 'Lenguado fresco, leche de tigre verde, culantro y ají amarillo suave.', price: 62, image: null },
      { id: 4, name: 'Leche de Tigre Alfresco', description: 'Concentrado de mariscos con trozos de corvina, ají limo y ginger. Servido en vaso.', price: 38, image: null, spicy: true },
    ]
  },
  {
    id: 'tiraditos', icon: '🐟', label: 'Tiraditos',
    description: 'La fusión japonesa-peruana en su máxima expresión.',
    items: [
      { id: 5, name: 'Tiradito Nikkei', description: 'Láminas de lenguado, leche de tigre de ají amarillo, aceite de sésamo y jengibre.', price: 58, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=75', signature: true },
      { id: 6, name: 'Tiradito de Trucha', description: 'Trucha del lago Titicaca, salsa de maracuyá picante, crujiente de quinua.', price: 54, image: null },
      { id: 7, name: 'Tiradito Clásico', description: 'Corvina en salsa amarilla cremosa, ají mirasol y hilos de apio.', price: 48, image: null },
    ]
  },
  {
    id: 'entradas', icon: '🦐', label: 'Entradas',
    description: 'El preludio perfecto a una gran velada marina.',
    items: [
      { id: 8, name: 'Pulpo al Olivo', description: 'Pulpo cocido en oliva negra, aceituna botija, mayonesa de aceituna y rocoto.', price: 48, image: 'https://images.unsplash.com/photo-1599021456807-25db0f974333?w=400&q=75', signature: true },
      { id: 9, name: 'Conchas a la Parmesana', description: 'Conchas negras gratinadas con queso parmesano, mantequilla y hierbas finas.', price: 52, image: null },
      { id: 10, name: 'Causas de Mariscos', description: 'Trío de causas limeñas rellenas de pulpo, langostinos y atún en escabeche.', price: 46, image: null },
      { id: 11, name: 'Choros a la Chalaca', description: 'Mejillones frescos con salsa criolla de tomate, cebolla y ají fresco.', price: 38, image: null },
    ]
  },
  {
    id: 'fondos', icon: '🦞', label: 'Fondos',
    description: 'Platos principales del mar diseñados para deleitar.',
    items: [
      { id: 12, name: 'Arroz con Mariscos Alfresco', description: 'Arroz meloso con langostinos, pulpo, almejas y mariscos en salsa de mariscos y ají panca.', price: 72, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=75', signature: true },
      { id: 13, name: 'Chupe de Camarones', description: 'Sopa cremosa de camarones del río con papa amarilla, leche, queso y ají mirasol.', price: 64, image: null },
      { id: 14, name: 'Sudado de Corvina', description: 'Corvina entera al vapor en fondo de mariscos, tomate, ají amarillo y chicha de jora.', price: 78, image: null },
      { id: 15, name: 'Jalea Alfresco', description: 'Frutos de mar apanados: calamar, langostinos, corvina, mariscos. Salsa tártara y criolla.', price: 68, image: null },
    ]
  },
  {
    id: 'parrilla', icon: '🔥', label: 'Parrilla Marina',
    description: 'Lo mejor del mar encontrando el fuego.',
    items: [
      { id: 16, name: 'Pulpo a la Parrilla', description: 'Pulpo mediterráneo grillado con aceite de oliva, paprika ahumada y puré de papa amarilla.', price: 78, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=75', signature: true },
      { id: 17, name: 'Langosta a la Parrilla', description: 'Media langosta grillada con mantequilla de ajo, limón y hierbas provenzales. Según disponibilidad.', price: 145, image: null },
      { id: 18, name: 'Mix de Mariscos al Grill', description: 'Langostinos, calamares, pulpo y mejillones grillados con chimichurri marino.', price: 92, image: null },
    ]
  },
  {
    id: 'postres', icon: '🍮', label: 'Postres',
    description: 'El dulce final de una experiencia perfecta.',
    items: [
      { id: 19, name: 'Suspiro Limeño Alfresco', description: 'Clásico postre criollo con manjar y merengue de oporto, versión premium.', price: 28, image: null },
      { id: 20, name: 'Tres Leches del Mar', description: 'Bizcocho húmedo bañado en tres leches con gelatina de maracuyá y coulis de mango.', price: 30, image: null },
      { id: 21, name: 'Picarones con Miel', description: 'Donuts de zapallo y camote con miel de chancaca y especias.', price: 24, image: null },
    ]
  },
  {
    id: 'bebidas', icon: '🍹', label: 'Bebidas',
    description: 'Cócteles, piscos y maridajes perfectos.',
    items: [
      { id: 22, name: 'Pisco Sour Alfresco', description: 'Pisco quebranta, limón, almíbar, clara de huevo y amargo de angostura.', price: 32, image: null, signature: true },
      { id: 23, name: 'Chilcano de Maracuyá', description: 'Pisco italia, maracuyá fresco, ginger ale y menta.', price: 28, image: null },
      { id: 24, name: 'Carta de Vinos', description: 'Selección de vinos blancos, rosados y tintos para maridar con nuestros platos.', price: 48, image: null },
      { id: 25, name: 'Chicha Morada Artesanal', description: 'Preparada con maíz morado del Cusco, clavo de olor, canela y frutas de temporada.', price: 18, image: null, vegetarian: true },
    ]
  },
]

const filteredCategories = computed(() => {
  if (activeCategory.value === 'all') return menuData
  return menuData.filter(c => c.id === activeCategory.value)
})
</script>

<style scoped>
.page-hero {
  position: relative; height: 50vh; min-height: 380px;
  display: flex; align-items: flex-end; overflow: hidden;
}
.page-hero__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.page-hero__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,30,27,0.85), rgba(15,30,27,0.3)); }
.page-hero__content { position: relative; z-index: 1; padding-bottom: var(--space-16); }
.page-hero__title { font-family: var(--font-display); font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 300; color: var(--color-cream); margin: 0.5rem 0 0.75rem; }
.page-hero__desc { font-size: var(--text-lg); color: rgba(232,220,200,0.75); font-weight: 300; }

.menu-toggle-bar {
  background: var(--color-cream);
  border-bottom: 1px solid var(--border-light);
  padding: var(--space-4) 0;
  position: sticky; top: var(--nav-height); z-index: 50;
}
.menu-toggle-bar__inner { display: flex; align-items: center; gap: var(--space-5); }
.menu-toggle-bar__label { font-size: var(--text-sm); color: var(--text-muted); font-weight: 300; }
.menu-toggle {
  display: flex;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  overflow: hidden;
}
.menu-toggle button {
  padding: var(--space-2) var(--space-5);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--text-muted);
  transition: all var(--dur-fast);
}
.menu-toggle button.active {
  background: var(--color-gold);
  color: var(--color-deep);
}

.menu-filters {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-bottom: var(--space-12);
}
.menu-filter-btn {
  padding: var(--space-2) var(--space-5);
  font-size: var(--text-sm);
  font-weight: var(--weight-light);
  letter-spacing: var(--tracking-wide);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-full);
  color: var(--text-muted);
  transition: all var(--dur-fast) var(--ease-out);
}
.menu-filter-btn:hover, .menu-filter-btn.active {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: var(--color-deep);
}

.menu-grid { display: flex; flex-direction: column; gap: var(--space-16); }
.menu-category__header { margin-bottom: var(--space-8); border-bottom: 1px solid var(--border-gold); padding-bottom: var(--space-5); }
.menu-category__title {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: var(--weight-light);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}
.menu-category__desc { font-size: var(--text-sm); color: var(--text-muted); }

.menu-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}
.menu-item {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-5);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  background: var(--color-ivory);
  transition: box-shadow var(--dur-normal) var(--ease-out), transform var(--dur-normal) var(--ease-out);
}
.menu-item:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.menu-item__img {
  width: 90px; height: 90px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  flex-shrink: 0;
}
.menu-item__info { flex: 1; display: flex; flex-direction: column; gap: var(--space-3); }
.menu-item__header { display: flex; justify-content: space-between; gap: var(--space-4); }
.menu-item__name { font-family: var(--font-display); font-size: var(--text-xl); font-weight: var(--weight-light); margin-bottom: var(--space-1); }
.menu-item__desc { font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-relaxed); }
.menu-item__price { font-family: var(--font-display); font-size: var(--text-xl); font-weight: var(--weight-light); color: var(--color-gold); white-space: nowrap; flex-shrink: 0; }
.menu-item__tags { display: flex; gap: var(--space-2); flex-wrap: wrap; }
.tag--spicy { color: #c4735a; border-color: rgba(196,115,90,0.3); background: rgba(196,115,90,0.08); }
.tag--veg { color: var(--color-sage); border-color: rgba(92,122,106,0.3); background: rgba(92,122,106,0.08); }

.menu-note {
  margin-top: var(--space-12);
  padding: var(--space-8);
  background: var(--color-cream);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-gold);
}
.menu-note p { font-size: var(--text-sm); color: var(--text-muted); margin-bottom: var(--space-2); }

.menu-cta {
  background: var(--color-forest);
  padding: var(--space-20) 0;
}
.menu-cta__title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: var(--weight-light);
  color: var(--color-cream);
  margin-top: var(--space-3);
}

@media (max-width: 768px) {
  .menu-items { grid-template-columns: 1fr; }
  .menu-item__img { width: 70px; height: 70px; }
}
</style>
