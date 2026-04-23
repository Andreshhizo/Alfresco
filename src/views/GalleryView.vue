<template>
  <div class="gallery-page">

    <section class="page-hero">
      <img src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1800&auto=format&fit=crop&q=85" alt="Galería Alfresco" class="page-hero__img" />
      <div class="page-hero__overlay" />
      <div class="page-hero__content container">
        <p class="section-subtitle animate-fade-up">Momentos y Sabores</p>
        <h1 class="page-hero__title animate-fade-up delay-100">Galería</h1>
        <p class="page-hero__desc animate-fade-up delay-200">Una ventana visual a nuestra cocina, ambiente y experiencias</p>
      </div>
    </section>

    <section class="section gallery-section">
      <div class="container">
        <div class="gallery-filters reveal">
          <button v-for="cat in galleryCategories" :key="cat.id" class="menu-filter-btn" :class="{ active: activeFilter === cat.id }" @click="activeFilter = cat.id">
            {{ cat.label }}
          </button>
        </div>

        <div class="masonry-grid">
          <div
            v-for="(photo, i) in filteredPhotos"
            :key="photo.id"
            class="masonry-item reveal"
            :class="[`delay-${(i % 6) * 50}`, { 'masonry-item--wide': photo.wide, 'masonry-item--tall': photo.tall }]"
            @click="openLightbox(photo)"
          >
            <img :src="photo.src" :alt="photo.caption" class="img-cover masonry-item__img" />
            <div class="masonry-item__overlay">
              <span class="masonry-item__caption">{{ photo.caption }}</span>
              <span class="masonry-item__zoom">↗</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="lightboxPhoto" class="lightbox" @click.self="closeLightbox">
        <button class="lightbox__close" @click="closeLightbox">×</button>
        <button class="lightbox__prev" @click="prevPhoto">‹</button>
        <div class="lightbox__content animate-scale-in">
          <img :src="lightboxPhoto.src" :alt="lightboxPhoto.caption" class="lightbox__img" />
          <p class="lightbox__caption">{{ lightboxPhoto.caption }}</p>
        </div>
        <button class="lightbox__next" @click="nextPhoto">›</button>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('all')
const lightboxPhoto = ref(null)
const currentIndex = ref(0)

const galleryCategories = [
  { id: 'all', label: '🌊 Todo' },
  { id: 'platos', label: '🍽 Platos' },
  { id: 'ambiente', label: '🕯 Ambiente' },
  { id: 'eventos', label: '🥂 Eventos' },
  { id: 'cocina', label: '👨‍🍳 Cocina' },
]

const photos = [
  { id: 1, src: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=800&auto=format&fit=crop&q=85', caption: 'Ceviche Clásico Alfresco', filter: 'platos', wide: true },
  { id: 2, src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=85', caption: 'Salón Principal', filter: 'ambiente', tall: true },
  { id: 3, src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=85', caption: 'Pulpo a la Parrilla', filter: 'platos' },
  { id: 4, src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=85', caption: 'Tiradito de Lenguado', filter: 'platos' },
  { id: 5, src: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800&auto=format&fit=crop&q=85', caption: 'Preparación del Ceviche', filter: 'cocina', wide: true },
  { id: 6, src: 'https://images.unsplash.com/photo-1599021456807-25db0f974333?w=800&auto=format&fit=crop&q=85', caption: 'Mariscos al Natural', filter: 'platos' },
  { id: 7, src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=85', caption: 'Celebración Privada', filter: 'eventos', tall: true },
  { id: 8, src: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&auto=format&fit=crop&q=85', caption: 'Vista del Restaurante', filter: 'ambiente' },
  { id: 9, src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=85', caption: 'Arroz con Mariscos', filter: 'platos' },
  { id: 10, src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&auto=format&fit=crop&q=85', caption: 'Chef en Acción', filter: 'cocina' },
  { id: 11, src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=85', caption: 'Sommelier y Maridaje', filter: 'eventos', wide: true },
  { id: 12, src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=85', caption: 'Chicha Morada Artesanal', filter: 'platos' },
]

const filteredPhotos = computed(() =>
  activeFilter.value === 'all' ? photos : photos.filter(p => p.filter === activeFilter.value)
)

function openLightbox(photo) {
  currentIndex.value = filteredPhotos.value.findIndex(p => p.id === photo.id)
  lightboxPhoto.value = photo
  document.body.style.overflow = 'hidden'
}
function closeLightbox() {
  lightboxPhoto.value = null
  document.body.style.overflow = ''
}
function prevPhoto() {
  currentIndex.value = (currentIndex.value - 1 + filteredPhotos.value.length) % filteredPhotos.value.length
  lightboxPhoto.value = filteredPhotos.value[currentIndex.value]
}
function nextPhoto() {
  currentIndex.value = (currentIndex.value + 1) % filteredPhotos.value.length
  lightboxPhoto.value = filteredPhotos.value[currentIndex.value]
}
</script>

<style scoped>
.page-hero { position: relative; height: 50vh; min-height: 380px; display: flex; align-items: flex-end; overflow: hidden; }
.page-hero__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.page-hero__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,30,27,0.85), rgba(15,30,27,0.3)); }
.page-hero__content { position: relative; z-index: 1; padding-bottom: var(--space-16); }
.page-hero__title { font-family: var(--font-display); font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 300; color: var(--color-cream); margin: 0.5rem 0 0.75rem; }
.page-hero__desc { font-size: var(--text-lg); color: rgba(232,220,200,0.75); font-weight: 300; }

.gallery-filters { display: flex; gap: var(--space-3); flex-wrap: wrap; margin-bottom: var(--space-10); }
.menu-filter-btn { padding: var(--space-2) var(--space-5); font-size: var(--text-sm); font-weight: 300; letter-spacing: var(--tracking-wide); border: 1px solid var(--border-light); border-radius: var(--radius-full); color: var(--text-muted); transition: all var(--dur-fast); }
.menu-filter-btn:hover, .menu-filter-btn.active { background: var(--color-gold); border-color: var(--color-gold); color: var(--color-deep); }

.masonry-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 220px;
  gap: var(--space-4);
}
.masonry-item { position: relative; overflow: hidden; border-radius: var(--radius-md); cursor: pointer; }
.masonry-item--wide { grid-column: span 2; }
.masonry-item--tall { grid-row: span 2; }
.masonry-item__img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--dur-slow) var(--ease-out); }
.masonry-item:hover .masonry-item__img { transform: scale(1.08); }
.masonry-item__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(15,30,27,0.7) 0%, transparent 60%);
  display: flex; align-items: flex-end; justify-content: space-between;
  padding: var(--space-5);
  opacity: 0;
  transition: opacity var(--dur-normal) var(--ease-out);
}
.masonry-item:hover .masonry-item__overlay { opacity: 1; }
.masonry-item__caption { font-size: var(--text-sm); color: var(--color-cream); font-weight: 300; }
.masonry-item__zoom { font-size: 1.5rem; color: var(--color-gold); }

/* Lightbox */
.lightbox {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(10,20,18,0.95);
  display: flex; align-items: center; justify-content: center;
  padding: var(--space-8);
}
.lightbox__close {
  position: absolute; top: var(--space-6); right: var(--space-6);
  font-size: 2rem; color: var(--color-cream);
  width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(201,169,110,0.3); border-radius: 50%;
  transition: all var(--dur-fast);
}
.lightbox__close:hover { border-color: var(--color-gold); color: var(--color-gold); }
.lightbox__prev, .lightbox__next {
  position: absolute; top: 50%; transform: translateY(-50%);
  font-size: 3rem; color: rgba(232,220,200,0.7);
  padding: var(--space-4);
  transition: color var(--dur-fast);
}
.lightbox__prev { left: var(--space-4); }
.lightbox__next { right: var(--space-4); }
.lightbox__prev:hover, .lightbox__next:hover { color: var(--color-gold); }
.lightbox__content { max-width: 90vw; max-height: 90vh; display: flex; flex-direction: column; align-items: center; gap: var(--space-4); }
.lightbox__img { max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: var(--radius-md); }
.lightbox__caption { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 300; color: var(--color-cream); font-style: italic; }

@media (max-width: 1024px) { .masonry-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) { .masonry-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 180px; } .masonry-item--wide { grid-column: span 1; } }
@media (max-width: 480px) { .masonry-grid { grid-template-columns: 1fr; } }
</style>
