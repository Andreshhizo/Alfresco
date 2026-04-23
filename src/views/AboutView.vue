<template>
  <div class="about-page">

    <!-- Page Hero -->
    <section class="page-hero">
      <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&auto=format&fit=crop&q=85" alt="Alfresco restaurante" class="page-hero__img" />
      <div class="page-hero__overlay" />
      <div class="page-hero__content container">
        <p class="section-subtitle animate-fade-up">Nuestra Historia</p>
        <h1 class="page-hero__title animate-fade-up delay-100">Sobre Nosotros</h1>
        <p class="page-hero__desc animate-fade-up delay-200">Íconos de la comida costera peruana desde 1991</p>
      </div>
    </section>

    <!-- Historia -->
    <section class="section">
      <div class="container about-story">
        <div class="about-story__text">
          <p class="section-subtitle reveal">Quiénes Somos</p>
          <h2 class="section-title reveal">Una pasión que<br><em>nació del mar</em></h2>
          <div class="ornament reveal"><span>✦</span></div>
          <p class="reveal" style="font-size: var(--text-lg); line-height: 1.9; color: var(--text-muted); font-weight: 300; margin-bottom: 1.2rem;">
            Alfresco nació en 1991 con una visión clara: revolucionar el estilo de la comida marina en el Perú. Nuestro fundador, apasionado por los sabores auténticos del océano Pacífico y la elegancia en la mesa, abrió las puertas de este restaurante con la firme convicción de que la buena comida merece el mejor ambiente.
          </p>
          <p class="reveal delay-100" style="font-size: var(--text-lg); line-height: 1.9; color: var(--text-muted); font-weight: 300; margin-bottom: 1.2rem;">
            Más de tres décadas después, esa filosofía permanece intacta. Cada plato que sale de nuestra cocina lleva consigo el compromiso con la frescura, la técnica y la innovación, siempre respetando las tradiciones que hacen de la gastronomía peruana una de las más reconocidas del mundo.
          </p>
          <p class="reveal delay-200" style="font-size: var(--text-lg); line-height: 1.9; color: var(--text-muted); font-weight: 300;">
            Creemos firmemente en la elegancia, la calidez y la atención al cliente. Para nosotros, cada visita es una celebración, y hacemos todo lo posible para que así lo sienta cada uno de nuestros comensales.
          </p>
        </div>
        <div class="about-story__visual reveal delay-200">
          <div class="about-story__img-wrap">
            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=85" alt="Historia Alfresco" class="img-cover" />
          </div>
          <div class="about-story__quote">
            <blockquote>"La elegancia en la mesa es el primer sabor que percibe el comensal."</blockquote>
            <cite>— Fundador, Alfresco</cite>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section values-section" style="background: var(--color-cream);">
      <div class="container">
        <div class="text-center reveal">
          <p class="section-subtitle">Nuestros Pilares</p>
          <h2 class="section-title">Lo que nos define</h2>
        </div>
        <div class="values-grid">
          <div v-for="(val, i) in values" :key="i" class="value-card reveal" :class="`delay-${i * 100}`">
            <div class="value-card__icon">{{ val.icon }}</div>
            <h3 class="value-card__title">{{ val.title }}</h3>
            <p class="value-card__text">{{ val.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="section team-section">
      <div class="container">
        <div class="text-center reveal">
          <p class="section-subtitle">Nuestro Equipo</p>
          <h2 class="section-title">Las manos detrás<br>del sabor</h2>
        </div>
        <div class="team-grid">
          <div v-for="(member, i) in team" :key="i" class="team-card reveal" :class="`delay-${i * 100}`">
            <div class="team-card__img">
              <img :src="member.photo" :alt="member.name" class="img-cover" />
            </div>
            <div class="team-card__info">
              <h3 class="team-card__name">{{ member.name }}</h3>
              <p class="team-card__role">{{ member.role }}</p>
              <p class="team-card__bio">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Awards -->
    <section class="awards-section">
      <div class="container awards-inner">
        <div class="text-center reveal">
          <p class="section-subtitle" style="color:var(--color-gold);">Reconocimientos</p>
          <h2 class="section-title" style="color:var(--color-cream);">Premios & Distinciones</h2>
        </div>
        <div class="awards-grid">
          <div v-for="(award, i) in awards" :key="i" class="award-item reveal" :class="`delay-${i * 100}`">
            <span class="award-item__year">{{ award.year }}</span>
            <span class="award-item__name">{{ award.name }}</span>
            <span class="award-item__org">{{ award.org }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" style="background: var(--color-cream);">
      <div class="container text-center">
        <p class="section-subtitle reveal">¿Listo para visitarnos?</p>
        <h2 class="section-title reveal">Reserva tu experiencia</h2>
        <div class="reveal" style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <RouterLink to="/reservas" class="btn btn-primary">Reservar Mesa</RouterLink>
          <RouterLink to="/menu" class="btn btn-ghost">Ver el Menú</RouterLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
const values = [
  { icon: '🐟', title: 'Frescura Absoluta', text: 'Trabajamos con pescadores locales del litoral peruano. Nuestros ingredientes llegan frescos cada mañana, garantizando la máxima calidad en cada plato.' },
  { icon: '👨‍🍳', title: 'Técnica & Creatividad', text: 'Nuestros chefs combinan técnicas tradicionales peruanas con innovación culinaria, creando experiencias gastronómicas únicas e irrepetibles.' },
  { icon: '🥂', title: 'Servicio de Excelencia', text: 'Cada comensal es tratado con la atención y el cuidado que merece. La hospitalidad es el pilar de todo lo que hacemos en Alfresco.' },
  { icon: '🌊', title: 'Sostenibilidad Marina', text: 'Nos comprometemos con la pesca responsable y el uso de ingredientes de temporada, cuidando el ecosistema marino que nos provee de sus tesoros.' },
]

const team = [
  { name: 'Carlos Vásquez', role: 'Chef Ejecutivo', photo: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&auto=format&fit=crop&q=85', bio: 'Con más de 20 años de experiencia en cocina marina peruana e internacional, Carlos dirige nuestra cocina con maestría y pasión por el sabor auténtico.' },
  { name: 'Ana Ríos', role: 'Sommelier & Mixóloga', photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&auto=format&fit=crop&q=85', bio: 'Especialista en maridaje y creadora de nuestros cócteles signature, Ana eleva cada experiencia gastronómica a otro nivel.' },
  { name: 'Pedro Aquino', role: 'Chef de Ceviches', photo: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?w=500&auto=format&fit=crop&q=85', bio: 'Maestro del ceviche y los tiraditos, Pedro custodia con orgullo las recetas que han dado fama a Alfresco desde sus inicios.' },
]

const awards = [
  { year: '2023', name: 'Mejor Restaurante de Mariscos', org: 'Summum Perú' },
  { year: '2022', name: 'Certificate of Excellence', org: 'TripAdvisor' },
  { year: '2021', name: 'Top 10 Lima Restaurants', org: 'OpenTable' },
  { year: '2020', name: 'Mejor Ceviche de Lima', org: 'Ceviche Awards Peru' },
  { year: '2019', name: 'Excelencia Gastronómica', org: 'Mistura' },
  { year: '2018', name: 'Chef del Año – Cocina Marina', org: 'Le Cordon Bleu Perú' },
]
</script>

<style scoped>
.page-hero {
  position: relative;
  height: 55vh;
  min-height: 420px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.page-hero__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.page-hero__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,30,27,0.85) 0%, rgba(15,30,27,0.3) 100%); }
.page-hero__content { position: relative; z-index: 1; padding-bottom: var(--space-16); }
.page-hero__title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: var(--weight-light);
  color: var(--color-cream);
  margin: var(--space-2) 0 var(--space-3);
}
.page-hero__desc { font-size: var(--text-lg); color: rgba(232,220,200,0.75); font-weight: var(--weight-light); }

.about-story {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-20);
  align-items: start;
}
.about-story__img-wrap {
  aspect-ratio: 3/4;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}
.about-story__quote {
  margin-top: var(--space-8);
  padding: var(--space-6);
  border-left: 2px solid var(--color-gold);
}
.about-story__quote blockquote {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--weight-light);
  font-style: italic;
  line-height: var(--leading-relaxed);
  color: var(--text-secondary);
  margin-bottom: var(--space-3);
}
.about-story__quote cite { font-size: var(--text-sm); color: var(--color-gold); font-style: normal; }

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
  margin-top: var(--space-12);
}
.value-card {
  padding: var(--space-8);
  background: var(--color-ivory);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  text-align: center;
  transition: box-shadow var(--dur-normal) var(--ease-out);
}
.value-card:hover { box-shadow: var(--shadow-lg); }
.value-card__icon { font-size: 2.5rem; margin-bottom: var(--space-5); }
.value-card__title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--weight-light);
  margin-bottom: var(--space-3);
}
.value-card__text { font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-relaxed); }

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
  margin-top: var(--space-12);
}
.team-card { display: flex; flex-direction: column; gap: var(--space-5); }
.team-card__img { aspect-ratio: 3/4; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-md); }
.team-card__name { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: var(--weight-light); }
.team-card__role { font-size: var(--text-xs); letter-spacing: var(--tracking-wider); text-transform: uppercase; color: var(--color-gold); margin-top: -0.2rem; }
.team-card__bio { font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-relaxed); margin-top: var(--space-2); }

.awards-section {
  background: var(--color-forest);
  padding: var(--space-24) 0;
}
.awards-inner { display: flex; flex-direction: column; gap: var(--space-12); }
.awards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(201,169,110,0.12);
  border: 1px solid rgba(201,169,110,0.12);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.award-item {
  background: var(--color-forest);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  transition: background var(--dur-normal);
}
.award-item:hover { background: rgba(45,74,62,0.8); }
.award-item__year { font-size: var(--text-xs); letter-spacing: var(--tracking-widest); text-transform: uppercase; color: var(--color-gold); }
.award-item__name { font-family: var(--font-display); font-size: var(--text-xl); font-weight: var(--weight-light); color: var(--color-cream); }
.award-item__org { font-size: var(--text-sm); color: rgba(184,205,196,0.6); }

@media (max-width: 1024px) {
  .about-story { grid-template-columns: 1fr; }
  .values-grid { grid-template-columns: repeat(2, 1fr); }
  .team-grid { grid-template-columns: 1fr 1fr; }
  .awards-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .values-grid, .team-grid, .awards-grid { grid-template-columns: 1fr; }
}
</style>
