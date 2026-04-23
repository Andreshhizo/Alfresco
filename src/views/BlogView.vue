<template>
  <div class="blog-page">

    <section class="page-hero">
      <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1800&auto=format&fit=crop&q=85" alt="Blog Alfresco" class="page-hero__img" />
      <div class="page-hero__overlay" />
      <div class="page-hero__content container">
        <p class="section-subtitle animate-fade-up">Conocimiento & Cultura</p>
        <h1 class="page-hero__title animate-fade-up delay-100">Blog & Noticias</h1>
        <p class="page-hero__desc animate-fade-up delay-200">Historias del mar, gastronomía peruana y vida en Alfresco</p>
      </div>
    </section>

    <section class="section blog-section">
      <div class="container">

        <!-- Featured post -->
        <article class="blog-featured reveal">
          <RouterLink :to="`/blog/${posts[0].slug}`" class="blog-featured__img-wrap">
            <img :src="posts[0].image" :alt="posts[0].title" class="img-cover" />
          </RouterLink>
          <div class="blog-featured__content">
            <span class="tag">{{ posts[0].category }}</span>
            <RouterLink :to="`/blog/${posts[0].slug}`">
              <h2 class="blog-featured__title">{{ posts[0].title }}</h2>
            </RouterLink>
            <p class="blog-featured__excerpt">{{ posts[0].excerpt }}</p>
            <div class="blog-featured__meta">
              <span class="blog-meta__date">{{ posts[0].date }}</span>
              <span class="blog-meta__dot">·</span>
              <span class="blog-meta__read">{{ posts[0].readTime }} de lectura</span>
            </div>
            <RouterLink :to="`/blog/${posts[0].slug}`" class="btn btn-dark" style="margin-top: 1.5rem;">
              Leer Artículo
            </RouterLink>
          </div>
        </article>

        <div class="ornament reveal"><span>✦</span></div>

        <!-- Blog grid -->
        <div class="blog-grid">
          <article
            v-for="(post, i) in posts.slice(1)"
            :key="post.id"
            class="blog-card reveal"
            :class="`delay-${(i % 3) * 100}`"
          >
            <RouterLink :to="`/blog/${post.slug}`" class="blog-card__img-wrap">
              <img :src="post.image" :alt="post.title" class="img-cover" />
              <div class="blog-card__cat">
                <span class="tag">{{ post.category }}</span>
              </div>
            </RouterLink>
            <div class="blog-card__body">
              <div class="blog-meta">
                <span class="blog-meta__date">{{ post.date }}</span>
                <span class="blog-meta__dot">·</span>
                <span class="blog-meta__read">{{ post.readTime }}</span>
              </div>
              <RouterLink :to="`/blog/${post.slug}`">
                <h3 class="blog-card__title">{{ post.title }}</h3>
              </RouterLink>
              <p class="blog-card__excerpt">{{ post.excerpt }}</p>
              <RouterLink :to="`/blog/${post.slug}`" class="blog-card__link">Leer más →</RouterLink>
            </div>
          </article>
        </div>

      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter-section">
      <div class="container newsletter-inner">
        <div class="newsletter-text reveal">
          <p class="section-subtitle" style="color:var(--color-gold);">Newsletter</p>
          <h2 class="newsletter-title">Recibe nuestras novedades</h2>
          <p class="newsletter-desc">Novedades del menú, eventos especiales y recetas exclusivas directo a tu email.</p>
        </div>
        <form class="newsletter-form reveal delay-200" @submit.prevent="subscribeNewsletter">
          <div class="form-group">
            <input type="email" v-model="email" class="form-input newsletter-input" placeholder="tu@email.com" required />
          </div>
          <button type="submit" class="btn btn-primary">Suscribirme</button>
          <p v-if="subscribed" class="newsletter-success">✓ ¡Gracias! Te has suscrito exitosamente.</p>
        </form>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const subscribed = ref(false)

const posts = [
  {
    id: 1, slug: 'historia-ceviche-peruano',
    title: 'La Historia del Ceviche: El Plato que Conquistó el Mundo',
    excerpt: 'Un viaje por los orígenes del plato más emblemático del Perú, desde las costas prehispánicas hasta las mesas más exclusivas del mundo. Cómo el ceviche pasó de ser comida de pescadores a ser declarado Patrimonio Cultural de la Nación.',
    category: 'Cultura Gastronómica',
    date: '15 Abril 2024',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=900&auto=format&fit=crop&q=85'
  },
  {
    id: 2, slug: 'temporada-mariscos-lima',
    title: 'Temporada de Mariscos en Lima: Qué Pedir en Cada Mes',
    excerpt: 'Los mejores mariscos no son los mismos todo el año. Te enseñamos a comer como un experto según la temporada del litoral peruano.',
    category: 'Guía Gastronómica',
    date: '8 Abril 2024',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=85'
  },
  {
    id: 3, slug: 'arte-del-leche-de-tigre',
    title: 'El Arte de la Leche de Tigre: Secretos de Nuestra Cocina',
    excerpt: 'Nuestro chef ejecutivo revela los principios detrás de la perfecta leche de tigre: el corazón de todo buen ceviche peruano.',
    category: 'Desde la Cocina',
    date: '1 Abril 2024',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=85'
  },
  {
    id: 4, slug: 'nikkei-fusion-peruana-japonesa',
    title: 'Nikkei: La Bella Fusión Peruano-Japonesa que Cambió Todo',
    excerpt: 'Cómo la migración japonesa transformó para siempre la gastronomía peruana y dio origen al tiradito, la leche de tigre y mucho más.',
    category: 'Historia & Cultura',
    date: '22 Marzo 2024',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&auto=format&fit=crop&q=85'
  },
  {
    id: 5, slug: 'maridaje-pisco-mariscos',
    title: 'Maridaje Perfecto: Pisco y Mariscos, una Pareja Inseparable',
    excerpt: 'Nuestra sommelier Ana Ríos explica qué piscos potencian mejor los sabores del mar. Guía práctica para no equivocarte en la mesa.',
    category: 'Maridaje',
    date: '14 Marzo 2024',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop&q=85'
  },
]

function subscribeNewsletter() {
  subscribed.value = true
  email.value = ''
  setTimeout(() => { subscribed.value = false }, 5000)
}
</script>

<style scoped>
.page-hero { position: relative; height: 50vh; min-height: 380px; display: flex; align-items: flex-end; overflow: hidden; }
.page-hero__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.page-hero__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,30,27,0.85), rgba(15,30,27,0.3)); }
.page-hero__content { position: relative; z-index: 1; padding-bottom: var(--space-16); }
.page-hero__title { font-family: var(--font-display); font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 300; color: var(--color-cream); margin: 0.5rem 0 0.75rem; }
.page-hero__desc { font-size: var(--text-lg); color: rgba(232,220,200,0.75); font-weight: 300; }

/* Featured */
.blog-featured {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--space-16);
  align-items: center;
  margin-bottom: var(--space-12);
}
.blog-featured__img-wrap { aspect-ratio: 4/3; border-radius: var(--radius-md); overflow: hidden; display: block; }
.blog-featured__img-wrap img { width: 100%; height: 100%; transition: transform var(--dur-slow) var(--ease-out); }
.blog-featured__img-wrap:hover img { transform: scale(1.05); }
.blog-featured__content { display: flex; flex-direction: column; gap: var(--space-4); }
.blog-featured__title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  font-weight: 300;
  line-height: var(--leading-snug);
  color: var(--text-primary);
  transition: color var(--dur-fast);
}
.blog-featured__title:hover { color: var(--color-gold); }
.blog-featured__excerpt { font-size: var(--text-base); color: var(--text-muted); line-height: var(--leading-relaxed); }
.blog-featured__meta { display: flex; align-items: center; gap: var(--space-3); }

/* Blog grid */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
  margin-top: var(--space-4);
}
.blog-card { display: flex; flex-direction: column; }
.blog-card__img-wrap { aspect-ratio: 4/3; border-radius: var(--radius-md); overflow: hidden; display: block; position: relative; margin-bottom: var(--space-5); }
.blog-card__img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--dur-slow) var(--ease-out); }
.blog-card__img-wrap:hover img { transform: scale(1.06); }
.blog-card__cat { position: absolute; top: var(--space-4); left: var(--space-4); }
.blog-card__body { display: flex; flex-direction: column; gap: var(--space-3); flex: 1; }
.blog-meta { display: flex; align-items: center; gap: var(--space-2); }
.blog-meta__date, .blog-meta__read { font-size: var(--text-xs); color: var(--text-muted); }
.blog-meta__dot { color: var(--color-gold); }
.blog-card__title { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 300; line-height: var(--leading-snug); transition: color var(--dur-fast); }
.blog-card__title:hover { color: var(--color-gold); }
.blog-card__excerpt { font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-relaxed); flex: 1; }
.blog-card__link { font-size: var(--text-xs); letter-spacing: var(--tracking-wider); text-transform: uppercase; color: var(--color-gold); font-weight: 500; }
.blog-card__link:hover { text-decoration: underline; }

/* Newsletter */
.newsletter-section { background: var(--color-forest); padding: var(--space-20) 0; }
.newsletter-inner { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-16); align-items: center; }
.newsletter-title { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem); font-weight: 300; color: var(--color-cream); margin-top: var(--space-3); }
.newsletter-desc { font-size: var(--text-base); color: rgba(184,205,196,0.7); line-height: var(--leading-relaxed); margin-top: var(--space-3); }
.newsletter-form { display: flex; flex-direction: column; gap: var(--space-4); }
.newsletter-input { background: rgba(45,74,62,0.5); border-color: rgba(201,169,110,0.25); color: var(--color-cream); }
.newsletter-input::placeholder { color: rgba(184,205,196,0.4); }
.newsletter-input:focus { border-color: var(--color-gold); }
.newsletter-success { font-size: var(--text-sm); color: var(--color-gold); }

@media (max-width: 1024px) { .blog-featured { grid-template-columns: 1fr; } .blog-grid { grid-template-columns: 1fr 1fr; } .newsletter-inner { grid-template-columns: 1fr; } }
@media (max-width: 640px) { .blog-grid { grid-template-columns: 1fr; } }
</style>
