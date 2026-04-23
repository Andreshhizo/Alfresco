<template>
  <div class="home">

    <!-- ── HERO ── -->
    <section class="hero">
      <div class="hero__bg">
        <img src="https://images.unsplash.com/photo-1615361200141-f45040f367be?w=1800&auto=format&fit=crop&q=85" alt="Alfresco" class="hero__img" />
        <div class="hero__overlay" />
      </div>
      <div class="container hero__content">
        <p class="hero__eyebrow animate-fade-up">Lima, Perú · Desde 1991</p>
        <h1 class="hero__title animate-fade-up delay-100">
          <em>El sabor del</em><br>
          <span>mar en su</span><br>
          <em>máxima expresión</em>
        </h1>
        <p class="hero__sub animate-fade-up delay-200">
          Íconos de la comida costera peruana. Mariscos, pescados<br>y ceviches en un ambiente de distinción y elegancia.
        </p>
        <div class="hero__actions animate-fade-up delay-300">
          <RouterLink to="/reservas" class="btn btn-primary">Reservar Mesa</RouterLink>
          <RouterLink to="/menu" class="btn btn-outline">Descubrir el Menú</RouterLink>
        </div>
      </div>
      <div class="hero__scroll">
        <span class="hero__scroll-text">Scroll</span>
        <div class="hero__scroll-line" />
      </div>
    </section>

    <!-- ── ANNOUNCEMENT STRIP ── -->
    <div class="strip">
      <div class="strip__inner">
        <span>🦪 Mariscos frescos cada mañana</span>
        <span class="strip__dot">·</span>
        <span>🐟 Carta de temporada</span>
        <span class="strip__dot">·</span>
        <span>🥂 Eventos & celebraciones privadas</span>
        <span class="strip__dot">·</span>
        <span>📍 Av. 28 de Julio 331, Miraflores</span>
      </div>
    </div>

    <!-- ── ABOUT INTRO ── -->
    <section class="section about-intro">
      <div class="container about-intro__grid">
        <div class="about-intro__images">
          <div class="about-intro__img-main reveal">
            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=85" alt="Plato principal" class="img-cover" />
          </div>
          <div class="about-intro__img-accent reveal delay-200">
            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=85" alt="Detalle culinario" class="img-cover" />
            <div class="about-intro__year">
              <span>Est.</span>
              <strong>1991</strong>
            </div>
          </div>
        </div>
        <div class="about-intro__text">
          <p class="section-subtitle reveal">Nuestra Historia</p>
          <h2 class="section-title reveal">Una experiencia<br><em>inigualable</em></h2>
          <div class="ornament reveal"><span>✦</span></div>
          <p class="section-desc reveal">
            Desde 1991, Alfresco ha revolucionado el estilo de la comida marina en el Perú,
            ofreciendo los mejores mariscos, pescados y ceviches en un ambiente donde la elegancia
            y la calidez se unen para crear momentos inolvidables.
          </p>
          <p class="section-desc reveal delay-100" style="margin-top: 1rem;">
            Nuestro fundador creyó firmemente que la buena mesa merece la mejor atención,
            y ese principio guía cada plato que servimos hoy.
          </p>
          <RouterLink to="/nosotros" class="btn btn-dark reveal delay-200" style="margin-top: 2rem;">
            Conocer Más
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ── STATS ── -->
    <section class="stats-section">
      <div class="container stats-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat reveal">
          <span class="stat__number">{{ stat.number }}</span>
          <span class="stat__label">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- ── FEATURED DISHES ── -->
    <section class="section featured">
      <div class="container">
        <div class="section-header text-center reveal">
          <p class="section-subtitle">Del Chef</p>
          <h2 class="section-title">Nuestras Especialidades</h2>
          <p class="section-desc" style="margin: 1rem auto 0; text-align: center;">
            Creaciones del mar seleccionadas por nuestro chef ejecutivo
          </p>
        </div>
        <div class="featured__grid">
          <article v-for="(dish, i) in featuredDishes" :key="dish.id" class="dish-card reveal" :class="`delay-${i * 100}`">
            <div class="dish-card__img">
              <img :src="dish.image" :alt="dish.name" class="img-cover" />
              <div class="dish-card__badge" v-if="dish.badge">{{ dish.badge }}</div>
            </div>
            <div class="dish-card__body">
              <div class="dish-card__meta">
                <span class="tag">{{ dish.category }}</span>
                <span class="dish-card__price">S/ {{ dish.price }}</span>
              </div>
              <h3 class="dish-card__name">{{ dish.name }}</h3>
              <p class="dish-card__desc">{{ dish.description }}</p>
              <RouterLink to="/menu" class="dish-card__link">Ver carta completa →</RouterLink>
            </div>
          </article>
        </div>
        <div class="text-center" style="margin-top: 3rem;">
          <RouterLink to="/menu" class="btn btn-dark">Ver Carta Completa</RouterLink>
        </div>
      </div>
    </section>

    <!-- ── EXPERIENCE PARALLAX ── -->
    <section class="experience">
      <div class="experience__bg">
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&auto=format&fit=crop&q=85" alt="Restaurante" class="img-cover" />
        <div class="experience__overlay" />
      </div>
      <div class="container experience__content">
        <p class="section-subtitle" style="color: var(--color-gold);">La Experiencia Alfresco</p>
        <h2 class="experience__title">
          Donde el mar se<br>convierte en arte
        </h2>
        <p class="experience__desc">
          Cada visita es una celebración. Déjate envolver por aromas del Pacífico,
          sabores auténticos y un servicio que supera todas las expectativas.
        </p>
        <div class="experience__actions">
          <RouterLink to="/reservas" class="btn btn-primary">Reservar Ahora</RouterLink>
          <RouterLink to="/galeria" class="btn btn-outline">Ver Galería</RouterLink>
        </div>
      </div>
    </section>

    <!-- ── TESTIMONIALS ── -->
    <section class="section testimonials">
      <div class="container">
        <div class="section-header text-center reveal">
          <p class="section-subtitle">Opiniones</p>
          <h2 class="section-title">Lo que dicen<br>nuestros comensales</h2>
        </div>
        <div class="testimonials__grid">
          <div v-for="(t, i) in testimonials" :key="i" class="testimonial reveal" :class="`delay-${i * 100}`">
            <div class="testimonial__stars">★★★★★</div>
            <blockquote class="testimonial__text">"{{ t.text }}"</blockquote>
            <cite class="testimonial__author">
              <strong>{{ t.name }}</strong>
              <span>{{ t.date }}</span>
            </cite>
          </div>
        </div>
        <div class="text-center" style="margin-top: 2rem;">
          <a href="https://www.tripadvisor.com.pe/Restaurant_Review-g294316-d775152-Reviews-Restaurante_Alfresco-Lima_Lima_Region.html" target="_blank" rel="noopener" class="btn btn-ghost">
            Ver más reseñas en TripAdvisor
          </a>
        </div>
      </div>
    </section>

    <!-- ── MAP & CONTACT ── -->
    <section class="section map-section">
      <div class="container map-section__grid">
        <div class="map-section__info reveal">
          <p class="section-subtitle">Encuéntranos</p>
          <h2 class="section-title">Visítanos en<br>Miraflores</h2>
          <div class="ornament"><span>✦</span></div>
          <div class="map-section__details">
            <div class="map-detail">
              <div class="map-detail__icon">📍</div>
              <div>
                <strong>Dirección</strong>
                <p>Av. 28 de Julio 331, Lima 15074, Perú</p>
              </div>
            </div>
            <div class="map-detail">
              <div class="map-detail__icon">📞</div>
              <div>
                <strong>Reservas & WhatsApp</strong>
                <p><a href="https://wa.me/51979701279">+51 979 701 279</a></p>
              </div>
            </div>
            <div class="map-detail">
              <div class="map-detail__icon">🕐</div>
              <div>
                <strong>Horario</strong>
                <p>Lun – Vie: 12:00 – 22:00<br>Sáb: 12:00 – 23:00 | Dom: 12:00 – 21:00</p>
              </div>
            </div>
          </div>
          <RouterLink to="/contacto" class="btn btn-dark" style="margin-top: 1.5rem;">
            Ir a Contacto
          </RouterLink>
        </div>
        <div class="map-section__map reveal delay-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.1!2d-77.0282!3d-12.1288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8b5d25663bf%3A0x1b3c3c3c3c3c3c3c!2sAv.%2028%20de%20Julio%20331%2C%20Lima%2015074!5e0!3m2!1ses!2spe!4v1"
            width="100%"
            height="100%"
            style="border: 0; border-radius: var(--radius-md);"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Ubicación Alfresco"
          />
        </div>
      </div>
    </section>

    <!-- ── INSTAGRAM FEED PREVIEW ── -->
    <section class="section insta-section">
      <div class="container">
        <div class="section-header text-center reveal">
          <p class="section-subtitle">Síguenos</p>
          <h2 class="section-title">@restaurantealfresco</h2>
        </div>
        <div class="insta__grid">
          <a v-for="(img, i) in instaImages" :key="i"
             href="https://www.instagram.com/restaurantealfresco/"
             target="_blank" rel="noopener"
             class="insta__item reveal"
             :class="`delay-${i * 50}`">
            <img :src="img" alt="Instagram Alfresco" class="img-cover" />
            <div class="insta__hover">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </div>
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
const stats = [
  { number: '30+', label: 'Años de Excelencia' },
  { number: '80+', label: 'Platos Únicos' },
  { number: '50k+', label: 'Comensales Felices' },
  { number: '15+', label: 'Premios Gastronómicos' },
]

const featuredDishes = [
  {
    id: 1,
    name: 'Ceviche Clásico Alfresco',
    category: 'Ceviches',
    description: 'Corvina fresca marinada en leche de tigre, ají limo, cebolla morada y choclo serrano.',
    price: '52',
    badge: 'Signature',
    image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=600&auto=format&fit=crop&q=85'
  },
  {
    id: 2,
    name: 'Pulpo a la Parrilla',
    category: 'Parrilla Marina',
    description: 'Pulpo mediterráneo grillado con aceite de oliva, paprika ahumada y puré de papa amarilla.',
    price: '68',
    badge: null,
    image: 'https://images.unsplash.com/photo-1599021456807-25db0f974333?w=600&auto=format&fit=crop&q=85'
  },
  {
    id: 3,
    name: 'Tiradito de Lenguado',
    category: 'Tiraditos',
    description: 'Láminas de lenguado en salsa amarilla con trufa, culantro y crujiente de quinua negra.',
    price: '58',
    badge: 'Chef\'s Pick',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=85'
  },
]

const testimonials = [
  {
    text: 'El mejor restaurante de mariscos en Lima. El ceviche es absolutamente delicioso y el servicio impecable. Una experiencia que no olvidarás.',
    name: 'María González',
    date: 'TripAdvisor · Marzo 2024'
  },
  {
    text: 'Ambiente elegante, comida extraordinaria. El pulpo a la parrilla es una obra maestra. Definitivamente volveremos en nuestra próxima visita a Lima.',
    name: 'James & Sarah T.',
    date: 'TripAdvisor · Febrero 2024'
  },
  {
    text: 'Celebramos nuestro aniversario aquí y fue mágico. El personal estuvo atento a cada detalle. Lima no tiene otro restaurante como Alfresco.',
    name: 'Ricardo Montoya',
    date: 'Google · Abril 2024'
  },
]

const instaImages = [
  'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=400&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=85',
]
</script>

<style scoped>
/* ── HERO ── */
.hero {
  position: relative;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.hero__bg { position: absolute; inset: 0; }
.hero__img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.05); transition: transform 8s ease; }
.hero:hover .hero__img { transform: scale(1); }
.hero__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    135deg,
    rgba(15,30,27,0.82) 0%,
    rgba(15,30,27,0.55) 50%,
    rgba(15,30,27,0.35) 100%
  );
}

.hero__content {
  position: relative;
  z-index: 1;
  padding-top: var(--nav-height);
  max-width: 750px;
}
.hero__eyebrow {
  font-size: var(--text-xs);
  font-weight: var(--weight-light);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: var(--space-6);
}
.hero__title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6.5rem);
  font-weight: var(--weight-light);
  line-height: 1.05;
  color: var(--color-cream);
  margin-bottom: var(--space-6);
}
.hero__title em {
  font-style: italic;
  color: var(--color-gold);
}
.hero__title span { font-weight: var(--weight-light); }

.hero__sub {
  font-size: var(--text-lg);
  font-weight: var(--weight-light);
  color: rgba(232,220,200,0.8);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-10);
}
.hero__actions { display: flex; gap: var(--space-4); flex-wrap: wrap; }

.hero__scroll {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  z-index: 1;
}
.hero__scroll-text {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: rgba(201,169,110,0.7);
}
.hero__scroll-line {
  width: 1px;
  height: 50px;
  background: linear-gradient(to bottom, rgba(201,169,110,0.7), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%, 100% { opacity: 0.4; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.2); }
}

/* ── STRIP ── */
.strip {
  background: var(--color-forest);
  border-top: 1px solid rgba(201,169,110,0.15);
  border-bottom: 1px solid rgba(201,169,110,0.15);
  padding: var(--space-4) 0;
  overflow: hidden;
}
.strip__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
  flex-wrap: wrap;
  font-size: var(--text-sm);
  font-weight: var(--weight-light);
  letter-spacing: var(--tracking-wide);
  color: rgba(232,220,200,0.8);
}
.strip__dot { color: var(--color-gold); }

/* ── ABOUT INTRO ── */
.about-intro__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-20);
  align-items: center;
}
.about-intro__images {
  position: relative;
  height: 560px;
}
.about-intro__img-main {
  position: absolute;
  top: 0; left: 0;
  width: 78%;
  height: 80%;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}
.about-intro__img-accent {
  position: absolute;
  bottom: 0; right: 0;
  width: 50%;
  height: 48%;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 4px solid var(--color-ivory);
}
.about-intro__year {
  position: absolute;
  bottom: -16px; left: -16px;
  background: var(--color-gold);
  color: var(--color-deep);
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}
.about-intro__year span {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  font-weight: var(--weight-medium);
}
.about-intro__year strong {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: var(--weight-light);
  line-height: 1;
}

/* ── STATS ── */
.stats-section {
  background: var(--color-forest);
  padding: var(--space-16) 0;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(201,169,110,0.15);
}
.stat {
  background: var(--color-forest);
  padding: var(--space-10) var(--space-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-2);
}
.stat__number {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: var(--weight-light);
  color: var(--color-gold);
  line-height: 1;
}
.stat__label {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: rgba(184,205,196,0.6);
  font-weight: var(--weight-light);
}

/* ── FEATURED ── */
.featured__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
  margin-top: var(--space-12);
}
.section-header { margin-bottom: 0; }

.dish-card {
  background: var(--color-ivory);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform var(--dur-normal) var(--ease-out), box-shadow var(--dur-normal) var(--ease-out);
}
.dish-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-xl); }
.dish-card__img {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}
.dish-card__img img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform var(--dur-slow) var(--ease-out);
}
.dish-card:hover .dish-card__img img { transform: scale(1.08); }
.dish-card__badge {
  position: absolute;
  top: var(--space-4); left: var(--space-4);
  background: var(--color-gold);
  color: var(--color-deep);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-sm);
}
.dish-card__body { padding: var(--space-6); }
.dish-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-3);
}
.dish-card__price {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--weight-light);
  color: var(--color-gold);
}
.dish-card__name {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--weight-light);
  margin-bottom: var(--space-2);
  line-height: var(--leading-snug);
}
.dish-card__desc {
  font-size: var(--text-sm);
  color: var(--text-muted);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
}
.dish-card__link {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-gold);
  font-weight: var(--weight-medium);
  transition: gap var(--dur-fast);
}
.dish-card__link:hover { text-decoration: underline; }

/* ── EXPERIENCE ── */
.experience {
  position: relative;
  padding: var(--space-32) 0;
  overflow: hidden;
}
.experience__bg { position: absolute; inset: 0; }
.experience__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, rgba(15,30,27,0.9) 0%, rgba(15,30,27,0.5) 100%);
}
.experience__content {
  position: relative;
  z-index: 1;
  max-width: 640px;
}
.experience__title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: var(--weight-light);
  color: var(--color-cream);
  line-height: 1.1;
  margin: var(--space-4) 0 var(--space-6);
}
.experience__desc {
  font-size: var(--text-lg);
  font-weight: var(--weight-light);
  color: rgba(232,220,200,0.8);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-10);
}
.experience__actions { display: flex; gap: var(--space-4); flex-wrap: wrap; }

/* ── TESTIMONIALS ── */
.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  margin-top: var(--space-12);
}
.testimonial {
  background: var(--color-ivory);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: var(--space-8);
  transition: box-shadow var(--dur-normal) var(--ease-out);
}
.testimonial:hover { box-shadow: var(--shadow-lg); }
.testimonial__stars { color: var(--color-gold); font-size: var(--text-sm); margin-bottom: var(--space-5); }
.testimonial__text {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--weight-light);
  font-style: italic;
  line-height: var(--leading-relaxed);
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
}
.testimonial__author {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  font-style: normal;
}
.testimonial__author strong { font-size: var(--text-sm); font-weight: var(--weight-medium); }
.testimonial__author span { font-size: var(--text-xs); color: var(--text-muted); }

/* ── MAP ── */
.map-section__grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: var(--space-16);
  align-items: center;
}
.map-section__map {
  height: 480px;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-light);
}
.map-section__details { display: flex; flex-direction: column; gap: var(--space-6); margin-top: var(--space-6); }
.map-detail { display: flex; gap: var(--space-4); align-items: flex-start; }
.map-detail__icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 2px; }
.map-detail strong { display: block; font-weight: var(--weight-medium); font-size: var(--text-sm); margin-bottom: var(--space-1); }
.map-detail p { font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-relaxed); }
.map-detail a { color: var(--color-gold); }

/* ── INSTAGRAM ── */
.insta__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--space-3);
  margin-top: var(--space-10);
}
.insta__item {
  aspect-ratio: 1/1;
  border-radius: var(--radius-sm);
  overflow: hidden;
  position: relative;
  display: block;
}
.insta__item img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--dur-slow) var(--ease-out); }
.insta__item:hover img { transform: scale(1.1); }
.insta__hover {
  position: absolute; inset: 0;
  background: rgba(15,30,27,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-cream);
  opacity: 0;
  transition: opacity var(--dur-normal) var(--ease-out);
}
.insta__item:hover .insta__hover { opacity: 1; }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .about-intro__grid { grid-template-columns: 1fr; gap: var(--space-12); }
  .about-intro__images { height: 420px; }
  .featured__grid { grid-template-columns: 1fr 1fr; }
  .testimonials__grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .map-section__grid { grid-template-columns: 1fr; }
  .map-section__map { height: 360px; }
  .insta__grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .hero__title { font-size: clamp(2.5rem, 10vw, 4rem); }
  .featured__grid { grid-template-columns: 1fr; }
  .insta__grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
