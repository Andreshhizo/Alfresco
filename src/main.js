import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

// i18n messages
const messages = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      menu: 'Menú',
      shop: 'Tienda',
      gallery: 'Galería',
      blog: 'Blog',
      reservations: 'Reservas',
      contact: 'Contacto'
    },
    home: {
      hero_tagline: 'El sabor del mar en su máxima expresión',
      hero_sub: 'Íconos de la comida costera peruana',
      reserve_btn: 'Reservar Mesa',
      discover_btn: 'Descubrir el Menú',
      experience_title: 'Una Experiencia Inigualable',
      experience_text: 'Desde 1991, Alfresco ha revolucionado el estilo de la comida marina en el Perú, ofreciendo los mejores mariscos, pescados y ceviches en un ambiente de elegancia y distinción.',
      stats_years: 'Años de Excelencia',
      stats_dishes: 'Platos Únicos',
      stats_guests: 'Comensales Satisfechos',
      stats_awards: 'Premios Gastronómicos',
      featured_title: 'Nuestras Especialidades',
      featured_sub: 'Creaciones del mar seleccionadas por nuestro chef ejecutivo',
    },
    footer: {
      schedule: 'Horarios',
      mon_fri: 'Lunes a Viernes',
      sat: 'Sábados',
      sun: 'Domingos',
      follow: 'Síguenos',
      rights: 'Todos los derechos reservados.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      menu: 'Menu',
      shop: 'Shop',
      gallery: 'Gallery',
      blog: 'Blog',
      reservations: 'Reservations',
      contact: 'Contact'
    },
    home: {
      hero_tagline: 'The flavor of the sea at its finest',
      hero_sub: 'Icons of Peruvian coastal cuisine',
      reserve_btn: 'Reserve a Table',
      discover_btn: 'Explore the Menu',
      experience_title: 'An Unparalleled Experience',
      experience_text: 'Since 1991, Alfresco has revolutionized marine cuisine in Peru, offering the finest seafood, fish and ceviches in an atmosphere of elegance and distinction.',
      stats_years: 'Years of Excellence',
      stats_dishes: 'Unique Dishes',
      stats_guests: 'Satisfied Guests',
      stats_awards: 'Gastronomic Awards',
      featured_title: 'Our Specialties',
      featured_sub: 'Sea creations selected by our executive chef',
    },
    footer: {
      schedule: 'Opening Hours',
      mon_fri: 'Monday to Friday',
      sat: 'Saturdays',
      sun: 'Sundays',
      follow: 'Follow Us',
      rights: 'All rights reserved.'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
