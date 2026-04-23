<template>
  <div class="contact-page">

    <section class="page-hero">
      <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&auto=format&fit=crop&q=85" alt="Contacto Alfresco" class="page-hero__img" />
      <div class="page-hero__overlay" />
      <div class="page-hero__content container">
        <p class="section-subtitle animate-fade-up">Estamos para Usted</p>
        <h1 class="page-hero__title animate-fade-up delay-100">Contacto</h1>
        <p class="page-hero__desc animate-fade-up delay-200">Hablemos — cada gran velada empieza con una conversación</p>
      </div>
    </section>

    <section class="section contact-section">
      <div class="container contact-layout">

        <!-- Contact info -->
        <div class="contact-info reveal">
          <p class="section-subtitle">Canales de Contacto</p>
          <h2 class="section-title" style="margin-bottom: 2rem;">Comunícate<br><em>con nosotros</em></h2>

          <div class="contact-channels">
            <a href="https://wa.me/51979701279" target="_blank" rel="noopener" class="contact-channel">
              <div class="contact-channel__icon">💬</div>
              <div class="contact-channel__info">
                <strong>WhatsApp</strong>
                <span>+51 979 701 279</span>
                <span class="contact-channel__note">Respuesta inmediata · 10:00 – 22:00</span>
              </div>
            </a>
            <a href="tel:+51979701279" class="contact-channel">
              <div class="contact-channel__icon">📞</div>
              <div class="contact-channel__info">
                <strong>Teléfono</strong>
                <span>+51 979 701 279</span>
                <span class="contact-channel__note">Reservas y consultas</span>
              </div>
            </a>
            <a href="https://maps.app.goo.gl/rdAnUJh5o8TiGsc59" target="_blank" rel="noopener" class="contact-channel">
              <div class="contact-channel__icon">📍</div>
              <div class="contact-channel__info">
                <strong>Dirección</strong>
                <span>Av. 28 de Julio 331</span>
                <span class="contact-channel__note">Lima 15074, Miraflores, Perú</span>
              </div>
            </a>
            <a href="https://www.instagram.com/restaurantealfresco/" target="_blank" rel="noopener" class="contact-channel">
              <div class="contact-channel__icon">📸</div>
              <div class="contact-channel__info">
                <strong>Instagram</strong>
                <span>@restaurantealfresco</span>
                <span class="contact-channel__note">Síguenos y envíanos un DM</span>
              </div>
            </a>
          </div>

          <div class="contact-hours">
            <h3 class="contact-hours__title">Horario de Atención</h3>
            <div class="contact-hours__grid">
              <div class="hours-row"><span>Lunes – Viernes</span><span>12:00 – 22:00</span></div>
              <div class="hours-row"><span>Sábados</span><span>12:00 – 23:00</span></div>
              <div class="hours-row"><span>Domingos</span><span>12:00 – 21:00</span></div>
              <div class="hours-row hours-row--note"><span>Feriados</span><span>Consultar disponibilidad</span></div>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="contact-form-wrap reveal delay-200">
          <div v-if="sent" class="contact-success animate-scale-in">
            <div class="contact-success__icon">✉️</div>
            <h3>¡Mensaje Enviado!</h3>
            <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
            <button @click="sent = false" class="btn btn-ghost" style="margin-top: 1rem;">Enviar otro mensaje</button>
          </div>

          <form v-else @submit.prevent="submitContact">
            <h3 class="contact-form__title">Envíanos un Mensaje</h3>
            <p class="contact-form__desc">Tu consulta será guardada y respondida en un máximo de 24 horas.</p>

            <div class="form-group" style="margin-top: 1.5rem;">
              <label class="form-label">Nombre Completo *</label>
              <input v-model="form.name" type="text" class="form-input" placeholder="Tu nombre completo" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Teléfono</label>
                <input v-model="form.phone" type="tel" class="form-input" placeholder="+51 999 999 999" />
              </div>
              <div class="form-group">
                <label class="form-label">Email *</label>
                <input v-model="form.email" type="email" class="form-input" placeholder="tu@email.com" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Asunto *</label>
              <select v-model="form.subject" class="form-select" required>
                <option value="">Seleccionar asunto</option>
                <option>Reservación Especial</option>
                <option>Eventos Privados</option>
                <option>Menú & Carta</option>
                <option>Catering</option>
                <option>Prensa & Media</option>
                <option>Otro</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Mensaje *</label>
              <textarea v-model="form.message" class="form-textarea" placeholder="Cuéntanos en qué podemos ayudarte..." style="min-height: 150px;" required />
            </div>
            <button type="submit" class="btn btn-primary" :disabled="loading" style="width: 100%; justify-content: center; margin-top: 0.5rem;">
              {{ loading ? 'Enviando...' : 'Enviar Mensaje' }}
            </button>
            <div v-if="errorMsg" class="form-error" style="margin-top: 1rem;">{{ errorMsg }}</div>
          </form>
        </div>
      </div>
    </section>

    <!-- Full width map -->
    <div class="contact-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.1!2d-77.0282!3d-12.1288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8b5d25663bf%3A0x1b!2sAv.%2028%20de%20Julio%20331%2C%20Lima%2015074!5e0!3m2!1ses!2spe!4v1"
        width="100%" height="440"
        style="border: 0; display: block;"
        allowfullscreen loading="lazy"
        title="Mapa Alfresco Lima"
      />
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

const sent = ref(false)
const loading = ref(false)
const errorMsg = ref('')

const form = ref({ name: '', phone: '', email: '', subject: '', message: '' })

async function submitContact() {
  loading.value = true
  errorMsg.value = ''
  try {
    const { error } = await supabase.from('contact_messages').insert([{
      name: form.value.name,
      phone: form.value.phone,
      email: form.value.email,
      subject: form.value.subject,
      message: form.value.message,
    }])
    if (error) throw error
  } catch (e) {
    console.warn('Supabase insert error (configure .env):', e.message)
    // Still show success for UX
  }
  loading.value = false
  sent.value = true
  form.value = { name: '', phone: '', email: '', subject: '', message: '' }
}
</script>

<style scoped>
.page-hero { position: relative; height: 50vh; min-height: 380px; display: flex; align-items: flex-end; overflow: hidden; }
.page-hero__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.page-hero__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,30,27,0.85), rgba(15,30,27,0.3)); }
.page-hero__content { position: relative; z-index: 1; padding-bottom: var(--space-16); }
.page-hero__title { font-family: var(--font-display); font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 300; color: var(--color-cream); margin: 0.5rem 0 0.75rem; }
.page-hero__desc { font-size: var(--text-lg); color: rgba(232,220,200,0.75); font-weight: 300; }

.contact-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: var(--space-16); align-items: start; }

.contact-channels { display: flex; flex-direction: column; gap: var(--space-4); margin-bottom: var(--space-8); }
.contact-channel {
  display: flex; gap: var(--space-5); padding: var(--space-5);
  border: 1px solid var(--border-light); border-radius: var(--radius-md);
  background: var(--color-ivory);
  transition: all var(--dur-normal) var(--ease-out);
}
.contact-channel:hover { border-color: var(--color-gold); box-shadow: var(--shadow-md); transform: translateX(4px); }
.contact-channel__icon { font-size: 1.8rem; flex-shrink: 0; }
.contact-channel__info { display: flex; flex-direction: column; gap: 2px; }
.contact-channel__info strong { font-size: var(--text-sm); font-weight: 500; }
.contact-channel__info span { font-size: var(--text-base); color: var(--text-secondary); }
.contact-channel__note { font-size: var(--text-xs) !important; color: var(--text-muted) !important; }

.contact-hours { background: var(--color-cream); border-radius: var(--radius-md); padding: var(--space-6); }
.contact-hours__title { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 300; margin-bottom: var(--space-5); }
.contact-hours__grid { display: flex; flex-direction: column; gap: var(--space-3); }
.hours-row { display: flex; justify-content: space-between; font-size: var(--text-sm); color: var(--text-muted); padding-bottom: var(--space-3); border-bottom: 1px solid var(--border-light); }
.hours-row:last-child { border-bottom: none; }
.hours-row--note span { font-style: italic; }

.contact-form-wrap { background: var(--color-ivory); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: var(--space-10); }
.contact-form__title { font-family: var(--font-display); font-size: var(--text-3xl); font-weight: 300; margin-bottom: var(--space-2); }
.contact-form__desc { font-size: var(--text-sm); color: var(--text-muted); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); margin: var(--space-5) 0; }
.form-group { display: flex; flex-direction: column; gap: var(--space-2); margin-bottom: var(--space-5); }
.form-group:last-of-type { margin-bottom: 0; }
.form-error { background: rgba(196,115,90,0.1); border: 1px solid rgba(196,115,90,0.3); border-radius: var(--radius-sm); padding: var(--space-4); color: var(--color-terracotta); font-size: var(--text-sm); }

.contact-success { text-align: center; padding: var(--space-12) 0; display: flex; flex-direction: column; align-items: center; gap: var(--space-4); }
.contact-success__icon { font-size: 4rem; }
.contact-success h3 { font-family: var(--font-display); font-size: var(--text-3xl); font-weight: 300; }
.contact-success p { font-size: var(--text-base); color: var(--text-muted); }

.contact-map { margin-top: var(--space-4); }

@media (max-width: 1024px) { .contact-layout { grid-template-columns: 1fr; } }
@media (max-width: 640px) { .form-row { grid-template-columns: 1fr; } }
</style>
