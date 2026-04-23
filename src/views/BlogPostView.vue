<template>
  <div class="blog-post-page">
    <div class="blog-post__hero">
      <img :src="post.image" :alt="post.title" class="blog-post__hero-img" />
      <div class="blog-post__hero-overlay" />
      <div class="container blog-post__hero-content">
        <span class="tag animate-fade-up">{{ post.category }}</span>
        <h1 class="blog-post__title animate-fade-up delay-100">{{ post.title }}</h1>
        <div class="blog-post__meta animate-fade-up delay-200">
          <span>{{ post.date }}</span>
          <span>·</span>
          <span>{{ post.readTime }} de lectura</span>
          <span>·</span>
          <span>Por {{ post.author }}</span>
        </div>
      </div>
    </div>
    <article class="container blog-post__body">
      <div class="blog-post__content" v-html="post.content" />
      <div class="blog-post__back">
        <RouterLink to="/blog" class="btn btn-ghost">← Volver al Blog</RouterLink>
      </div>
    </article>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const postsData = {
  'historia-ceviche-peruano': {
    title: 'La Historia del Ceviche: El Plato que Conquistó el Mundo',
    category: 'Cultura Gastronómica',
    date: '15 Abril 2024',
    readTime: '8 min',
    author: 'Chef Carlos Vásquez',
    image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=1400&auto=format&fit=crop&q=85',
    content: `
      <p>El ceviche es, sin duda, el plato más emblemático de la gastronomía peruana. Su historia se remonta a más de dos mil años, cuando las culturas prehispánicas que habitaban las costas del actual Perú preparaban el pescado fresco con jugos de frutas ácidas, posiblemente tumbo o maracuyá silvestre.</p>
      <h2>Los Orígenes Prehispánicos</h2>
      <p>Los mochicas, que habitaron la costa norte peruana entre los siglos I y VIII d.C., preparaban el pescado fresco con el jugo fermentado de la fruta del tumbo. Con la llegada de los españoles en el siglo XVI, el limón y la cebolla morada se incorporaron a la receta, dándole ese carácter único que hoy reconocemos.</p>
      <h2>La Revolución del Siglo XX</h2>
      <p>Fue en el siglo XX cuando el ceviche se transformó en lo que hoy conocemos. La llegada de los inmigrantes japoneses a finales del siglo XIX y principios del XX trajo consigo nuevas técnicas de corte y preparación del pescado crudo, dando origen a variaciones como el tiradito.</p>
      <blockquote>"El ceviche es el alma del Perú en un plato. Ácido como nuestra historia, vibrante como nuestra cultura, fresco como nuestro mar." — Chef Carlos Vásquez</blockquote>
      <h2>El Reconocimiento Mundial</h2>
      <p>En 2004, el gobierno peruano declaró el ceviche como Patrimonio Cultural de la Nación. Hoy, el ceviche se sirve en los mejores restaurantes del mundo y Peru es reconocida como una de las capitales gastronómicas más importantes del planeta.</p>
      <p>En Alfresco, honramos esta historia en cada plato. Nuestro ceviche clásico sigue las tradiciones más puras, usando corvina del día, limón fresco del norte y la mejor leche de tigre que nuestro chef ha perfeccionado durante décadas.</p>
    `
  }
}

const post = computed(() => postsData[route.params.slug] || {
  title: 'Artículo no encontrado',
  category: 'Blog',
  date: '',
  readTime: '',
  author: 'Alfresco',
  image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=1400',
  content: '<p>Lo sentimos, este artículo no está disponible.</p>'
})
</script>

<style scoped>
.blog-post__hero { position: relative; height: 60vh; min-height: 460px; display: flex; align-items: flex-end; overflow: hidden; }
.blog-post__hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.blog-post__hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,30,27,0.92) 0%, rgba(15,30,27,0.3) 100%); }
.blog-post__hero-content { position: relative; z-index: 1; padding-bottom: var(--space-16); display: flex; flex-direction: column; gap: var(--space-4); max-width: 800px; }
.blog-post__title { font-family: var(--font-display); font-size: clamp(2rem, 5vw, 3.8rem); font-weight: 300; color: var(--color-cream); line-height: 1.15; }
.blog-post__meta { display: flex; gap: var(--space-3); font-size: var(--text-sm); color: rgba(184,205,196,0.6); }
.blog-post__body { max-width: 780px; margin: 0 auto; padding-top: var(--space-16); padding-bottom: var(--space-20); }
.blog-post__content { font-size: var(--text-lg); line-height: 1.9; color: var(--text-secondary); font-weight: 300; }
.blog-post__content :deep(h2) { font-family: var(--font-display); font-size: var(--text-3xl); font-weight: 300; color: var(--text-primary); margin: 2.5rem 0 1rem; }
.blog-post__content :deep(p) { margin-bottom: 1.4rem; }
.blog-post__content :deep(blockquote) { border-left: 3px solid var(--color-gold); padding: 1rem 1.5rem; margin: 2rem 0; font-family: var(--font-display); font-size: var(--text-xl); font-style: italic; color: var(--text-muted); background: var(--color-cream); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
.blog-post__back { margin-top: var(--space-16); padding-top: var(--space-8); border-top: 1px solid var(--border-light); }
</style>
