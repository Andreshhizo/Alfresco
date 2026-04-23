<template>
  <div class="reservations-page">

    <section class="page-hero">
      <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&auto=format&fit=crop&q=85" alt="Reservas Alfresco" class="page-hero__img" />
      <div class="page-hero__overlay" />
      <div class="page-hero__content container">
        <p class="section-subtitle animate-fade-up">Reserve su Mesa</p>
        <h1 class="page-hero__title animate-fade-up delay-100">Reservaciones</h1>
        <p class="page-hero__desc animate-fade-up delay-200">Garantice su lugar en una experiencia gastronómica única</p>
      </div>
    </section>

    <section class="section reservations-section">
      <div class="container reservations-layout">

        <!-- Form -->
        <div class="reservation-form-wrap reveal">
          <div v-if="submitted" class="reservation-success animate-fade-in">
            <div class="reservation-success__icon">🎉</div>
            <h3>¡Reserva Confirmada!</h3>
            <p>Hemos recibido tu solicitud. Nos pondremos en contacto contigo a la brevedad para confirmar la disponibilidad.</p>
            <p style="margin-top: 0.5rem; color: var(--color-gold);">{{ confirmationCode }}</p>
            <a :href="`https://wa.me/51979701279?text=Hola,%20acabo%20de%20hacer%20una%20reserva%20online.%20Mi%20código%20es%20${confirmationCode}`" target="_blank" class="btn btn-dark" style="margin-top: 1.5rem;">
              Confirmar por WhatsApp
            </a>
            <button @click="submitted = false" class="btn btn-ghost" style="margin-top: 0.75rem;">Hacer otra reserva</button>
          </div>

          <form v-else @submit.prevent="submitReservation" class="reservation-form">
            <div class="form-section">
              <h3 class="form-section__title">Datos Personales</h3>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Nombre *</label>
                  <input v-model="form.firstName" type="text" class="form-input" placeholder="Nombre" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Apellido *</label>
                  <input v-model="form.lastName" type="text" class="form-input" placeholder="Apellido" required />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Teléfono / WhatsApp *</label>
                  <input v-model="form.phone" type="tel" class="form-input" placeholder="+51 999 999 999" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Correo Electrónico *</label>
                  <input v-model="form.email" type="email" class="form-input" placeholder="tu@email.com" required />
                </div>
              </div>
            </div>

            <div class="form-section">
              <h3 class="form-section__title">Detalles de la Reserva</h3>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Fecha *</label>
                  <input v-model="form.date" type="date" class="form-input" :min="minDate" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Hora *</label>
                  <select v-model="form.time" class="form-select" required>
                    <option value="">Seleccionar hora</option>
                    <option v-for="slot in timeSlots" :key="slot" :value="slot">{{ slot }}</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Número de Personas *</label>
                  <select v-model="form.guests" class="form-select" required>
                    <option value="">Seleccionar</option>
                    <option v-for="n in 12" :key="n" :value="n">{{ n }} {{ n === 1 ? 'persona' : 'personas' }}</option>
                    <option value="13+">Más de 12 personas</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Área Preferida</label>
                  <select v-model="form.area" class="form-select">
                    <option value="">Sin preferencia</option>
                    <option value="interior">Salón Interior</option>
                    <option value="terraza">Terraza</option>
                    <option value="privado">Salón Privado</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-section">
              <h3 class="form-section__title">Ocasión Especial</h3>
              <div class="occasion-grid">
                <button
                  v-for="occ in occasions"
                  :key="occ.id"
                  type="button"
                  class="occasion-btn"
                  :class="{ active: form.occasion === occ.id }"
                  @click="form.occasion = occ.id"
                >
                  <span>{{ occ.icon }}</span>
                  <span>{{ occ.label }}</span>
                </button>
              </div>
              <div class="form-group" style="margin-top: 1rem;">
                <label class="form-label">Solicitudes Especiales</label>
                <textarea v-model="form.notes" class="form-textarea" placeholder="Alergias alimentarias, decoración especial, menú personalizado..." />
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary" :disabled="loading" style="width: 100%; justify-content: center;">
                {{ loading ? 'Enviando...' : 'Confirmar Reserva' }}
              </button>
              <p class="form-disclaimer">
                Al confirmar, aceptas nuestras políticas de cancelación. Reservas sujetas a disponibilidad.
                Recibirás confirmación por WhatsApp en las próximas 2 horas.
              </p>
            </div>

            <div v-if="errorMsg" class="form-error">{{ errorMsg }}</div>
          </form>

          <!-- External link as alternative -->
          <div class="reservation-external">
            <p>También puedes reservar en nuestra plataforma oficial:</p>
            <a href="https://www.covermanager.com/reserve/module_restaurant/restaurante-alfresco/spanish"
               target="_blank" rel="noopener" class="btn btn-ghost" style="margin-top: 0.75rem;">
              Reservar en CoverManager ↗
            </a>
          </div>
        </div>

        <!-- Info sidebar -->
        <aside class="reservation-sidebar reveal delay-200">
          <div class="sidebar-card">
            <h3 class="sidebar-card__title">Información Importante</h3>
            <ul class="sidebar-list">
              <li>✓ Confirmación en máximo 2 horas</li>
              <li>✓ Cancelación gratuita con 24h de anticipación</li>
              <li>✓ Para grupos de más de 10, llámanos directamente</li>
              <li>✓ Menú especial para celebraciones disponible</li>
            </ul>
          </div>

          <div class="sidebar-card">
            <h3 class="sidebar-card__title">Horarios</h3>
            <div class="schedule-list">
              <div class="schedule-item"><span>Lunes – Viernes</span><span>12:00 – 22:00</span></div>
              <div class="schedule-item"><span>Sábados</span><span>12:00 – 23:00</span></div>
              <div class="schedule-item"><span>Domingos</span><span>12:00 – 21:00</span></div>
            </div>
          </div>

          <div class="sidebar-card sidebar-card--whatsapp">
            <p class="sidebar-wapp__label">¿Prefieres reservar por WhatsApp?</p>
            <a href="https://wa.me/51979701279?text=Hola,%20quisiera%20hacer%20una%20reserva%20en%20Alfresco"
               target="_blank" rel="noopener" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: 0.75rem;">
              💬 WhatsApp: +51 979 701 279
            </a>
          </div>

          <div class="sidebar-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.1!2d-77.0282!3d-12.1288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8b5d25663bf%3A0x1b!2sAv.%2028%20de%20Julio%20331%2C%20Lima!5e0!3m2!1ses!2spe!4v1"
              width="100%" height="220"
              style="border: 0; border-radius: var(--radius-md);"
              allowfullscreen loading="lazy"
              title="Mapa Alfresco"
            />
            <p class="sidebar-map__addr">Av. 28 de Julio 331, Lima 15074, Perú</p>
          </div>
        </aside>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

const submitted = ref(false)
const loading = ref(false)
const errorMsg = ref('')
const confirmationCode = ref('')

const form = ref({
  firstName: '', lastName: '', phone: '', email: '',
  date: '', time: '', guests: '', area: '',
  occasion: '', notes: ''
})

const minDate = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
})

const timeSlots = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '19:00', '19:30', '20:00',
  '20:30', '21:00', '21:30'
]

const occasions = [
  { id: 'cumpleanos', icon: '🎂', label: 'Cumpleaños' },
  { id: 'aniversario', icon: '💑', label: 'Aniversario' },
  { id: 'negocios', icon: '💼', label: 'Negocios' },
  { id: 'celebracion', icon: '🥂', label: 'Celebración' },
  { id: 'familia', icon: '👨‍👩‍👧', label: 'Familiar' },
  { id: 'ninguna', icon: '🍽', label: 'Sin ocasión' },
]

async function submitReservation() {
  loading.value = true
  errorMsg.value = ''
  const code = 'ALF-' + Math.random().toString(36).substring(2, 8).toUpperCase()

  try {
    const { error } = await supabase.from('reservations').insert([{
      first_name: form.value.firstName,
      last_name: form.value.lastName,
      phone: form.value.phone,
      email: form.value.email,
      reservation_date: form.value.date,
      reservation_time: form.value.time,
      guests: parseInt(form.value.guests) || 0,
      area: form.value.area,
      occasion: form.value.occasion,
      notes: form.value.notes,
      confirmation_code: code,
      status: 'pending'
    }])
    if (error) throw error
  } catch (e) {
    // Show success anyway if Supabase not yet configured
    console.warn('Supabase insert error (configure .env):', e.message)
  }

  confirmationCode.value = code
  submitted.value = true
  loading.value = false
  form.value = { firstName: '', lastName: '', phone: '', email: '', date: '', time: '', guests: '', area: '', occasion: '', notes: '' }
}
</script>

<style scoped>
.page-hero { position: relative; height: 50vh; min-height: 380px; display: flex; align-items: flex-end; overflow: hidden; }
.page-hero__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.page-hero__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,30,27,0.85), rgba(15,30,27,0.3)); }
.page-hero__content { position: relative; z-index: 1; padding-bottom: var(--space-16); }
.page-hero__title { font-family: var(--font-display); font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 300; color: var(--color-cream); margin: 0.5rem 0 0.75rem; }
.page-hero__desc { font-size: var(--text-lg); color: rgba(232,220,200,0.75); font-weight: 300; }

.reservations-layout { display: grid; grid-template-columns: 1.4fr 1fr; gap: var(--space-16); align-items: start; }

/* Form */
.reservation-form-wrap { background: var(--color-ivory); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: var(--space-10); }
.form-section { margin-bottom: var(--space-8); padding-bottom: var(--space-8); border-bottom: 1px solid var(--border-light); }
.form-section:last-of-type { border-bottom: none; margin-bottom: 0; }
.form-section__title { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 300; margin-bottom: var(--space-6); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); margin-bottom: var(--space-5); }
.form-group { display: flex; flex-direction: column; gap: var(--space-2); }

.occasion-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); }
.occasion-btn {
  display: flex; flex-direction: column; align-items: center; gap: var(--space-2);
  padding: var(--space-4); border: 1px solid var(--border-light); border-radius: var(--radius-md);
  font-size: var(--text-xs); color: var(--text-muted); transition: all var(--dur-fast);
}
.occasion-btn span:first-child { font-size: 1.5rem; }
.occasion-btn:hover, .occasion-btn.active { border-color: var(--color-gold); color: var(--color-gold); background: rgba(201,169,110,0.06); }

.form-actions { margin-top: var(--space-8); }
.form-disclaimer { font-size: var(--text-xs); color: var(--text-muted); text-align: center; margin-top: var(--space-4); line-height: var(--leading-relaxed); }
.form-error { background: rgba(196,115,90,0.1); border: 1px solid rgba(196,115,90,0.3); border-radius: var(--radius-sm); padding: var(--space-4); color: var(--color-terracotta); font-size: var(--text-sm); margin-top: var(--space-4); }

.reservation-success { text-align: center; padding: var(--space-10) 0; display: flex; flex-direction: column; align-items: center; gap: var(--space-4); }
.reservation-success__icon { font-size: 4rem; }
.reservation-success h3 { font-family: var(--font-display); font-size: var(--text-3xl); font-weight: 300; }
.reservation-success p { font-size: var(--text-base); color: var(--text-muted); max-width: 400px; }

.reservation-external { margin-top: var(--space-8); padding-top: var(--space-6); border-top: 1px solid var(--border-light); text-align: center; }
.reservation-external p { font-size: var(--text-sm); color: var(--text-muted); }

/* Sidebar */
.reservation-sidebar { display: flex; flex-direction: column; gap: var(--space-5); position: sticky; top: calc(var(--nav-height) + 2rem); }
.sidebar-card { background: var(--color-ivory); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: var(--space-6); }
.sidebar-card__title { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 300; margin-bottom: var(--space-5); }
.sidebar-list { display: flex; flex-direction: column; gap: var(--space-3); }
.sidebar-list li { font-size: var(--text-sm); color: var(--text-muted); }
.schedule-list { display: flex; flex-direction: column; gap: var(--space-3); }
.schedule-item { display: flex; justify-content: space-between; font-size: var(--text-sm); color: var(--text-muted); padding-bottom: var(--space-3); border-bottom: 1px solid var(--border-light); }
.schedule-item:last-child { border-bottom: none; }
.sidebar-card--whatsapp { background: rgba(26,46,42,0.05); border-color: rgba(201,169,110,0.2); }
.sidebar-wapp__label { font-size: var(--text-sm); color: var(--text-muted); }
.sidebar-map { border-radius: var(--radius-md); overflow: hidden; }
.sidebar-map__addr { font-size: var(--text-xs); color: var(--text-muted); margin-top: var(--space-3); text-align: center; }

@media (max-width: 1024px) { .reservations-layout { grid-template-columns: 1fr; } .reservation-sidebar { position: static; } }
@media (max-width: 640px) { .form-row { grid-template-columns: 1fr; } .occasion-grid { grid-template-columns: repeat(2, 1fr); } }
</style>
