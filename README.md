# 🦞 Alfresco – Sitio Web Restaurante Marino Premium

Proyecto web completo para **Restaurante Alfresco**, Lima, Perú.  
Stack: **Vue 3 + Vite + Pinia + Vue Router + Supabase**

---

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación Local](#instalación-local)
- [Configuración de Supabase](#configuración-de-supabase)
- [Variables de Entorno](#variables-de-entorno)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Deploy en Hostinger](#deploy-en-hostinger)
- [Funcionalidades](#funcionalidades)
- [Personalización](#personalización)

---

## ✅ Requisitos Previos

- **Node.js** 18 o superior → [nodejs.org](https://nodejs.org)
- **npm** 9 o superior (incluido con Node)
- Cuenta en **Supabase** (gratuita) → [supabase.com](https://supabase.com)
- Hosting en **Hostinger** con soporte para archivos estáticos

---

## 🚀 Instalación Local

```bash
# 1. Clonar o extraer el proyecto
cd alfresco

# 2. Instalar dependencias
npm install

# 3. Crear archivo de variables de entorno
cp .env.example .env

# 4. Editar .env con tus credenciales de Supabase
# (ver sección "Configuración de Supabase")

# 5. Iniciar servidor de desarrollo
npm run dev

# El sitio estará disponible en:
# http://localhost:5173
```

---

## 🗄️ Configuración de Supabase

### Paso 1: Crear proyecto
1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto (elige la región más cercana a Lima: East US o São Paulo)
3. Guarda tu contraseña de la base de datos

### Paso 2: Ejecutar el SQL
1. En el panel de Supabase, ve a **SQL Editor** (ícono de código en sidebar izquierdo)
2. Haz clic en **New Query**
3. Abre el archivo `SUPABASE_PROMPT.md` en este proyecto
4. Copia **todo el bloque SQL** que está dentro de los triple backticks
5. Pégalo en el editor y haz clic en **Run**
6. Deberías ver: `Alfresco DB configurada exitosamente 🎉`

### Paso 3: Obtener credenciales
1. Ve a **Settings → API** en el panel de Supabase
2. Copia:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

---

## 🔐 Variables de Entorno

Edita el archivo `.env` en la raíz del proyecto:

```env
# Supabase – Obtén estos valores en Settings → API
VITE_SUPABASE_URL=https://tu-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...

# Info del sitio (opcional)
VITE_SITE_URL=https://restaurantealfresco.com
VITE_SITE_NAME=Alfresco Restaurante
```

> ⚠️ **Importante**: El archivo `.env` NO debe subirse a GitHub. Ya está incluido en `.gitignore`.

---

## 📁 Estructura del Proyecto

```
alfresco/
├── public/
│   └── .htaccess              # Configuración Apache para Hostinger
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css       # Design system completo (CSS variables)
│   ├── components/
│   │   ├── AppNav.vue         # Navbar fija con scroll effect + lang toggle
│   │   ├── AppFooter.vue      # Footer completo
│   │   └── CartDrawer.vue     # Carrito lateral deslizable
│   ├── lib/
│   │   └── supabase.js        # Cliente de Supabase
│   ├── router/
│   │   └── index.js           # Vue Router con todas las rutas
│   ├── stores/
│   │   ├── cart.js            # Pinia store del carrito
│   │   └── lang.js            # Pinia store del idioma
│   ├── views/
│   │   ├── HomeView.vue       # Página inicio (hero, featured, stats, mapa)
│   │   ├── AboutView.vue      # Historia, valores, equipo, premios
│   │   ├── MenuView.vue       # Carta completa con filtros y toggle de moneda
│   │   ├── ShopView.vue       # Tienda online con carrito
│   │   ├── GalleryView.vue    # Galería masonry con lightbox
│   │   ├── BlogView.vue       # Blog con newsletter
│   │   ├── BlogPostView.vue   # Post individual
│   │   ├── ReservationsView.vue # Sistema de reservas completo
│   │   ├── ContactView.vue    # Formulario de contacto + mapa
│   │   └── NotFoundView.vue   # Página 404
│   ├── App.vue                # Componente raíz
│   └── main.js                # Entry point + i18n (ES/EN)
├── .env.example               # Template de variables de entorno
├── .htaccess                  # Apache config (SPA + cache + HTTPS)
├── index.html                 # HTML base con Google Fonts
├── package.json
├── vite.config.js
├── SUPABASE_PROMPT.md         # SQL completo para configurar el backend
└── README.md                  # Este archivo
```

---

## 🌐 Deploy en Hostinger

### Opción A: Subir build manual (FTP)

```bash
# 1. Generar build de producción
npm run build

# Esto crea la carpeta /dist con todos los archivos estáticos

# 2. Subir a Hostinger via FTP
# - Conecta tu cliente FTP (FileZilla, etc.)
# - Host: tu-dominio.com o FTP IP de Hostinger
# - Sube el CONTENIDO de /dist/ a /public_html/
# - El archivo .htaccess ya está incluido en /public/
#   y Vite lo copiará automáticamente a /dist/

# 3. Verificar
# Abre tu dominio en el navegador y verifica que funcione
```

### Opción B: Deploy via Git en Hostinger

1. En el panel de Hostinger, ve a **Git** o **Deployment**
2. Conecta tu repositorio de GitHub
3. Configura el comando de build: `npm run build`
4. Configura el directorio de publicación: `dist`
5. Agrega las variables de entorno en el panel de Hostinger

### Configuración importante en Hostinger

Verifica que el archivo `.htaccess` esté en la raíz de `public_html/`.
Este archivo es crítico para que las rutas del SPA (Vue Router) funcionen correctamente.

---

## ✨ Funcionalidades Incluidas

| Funcionalidad | Estado |
|---|---|
| Sitio completamente responsive (mobile/tablet/desktop) | ✅ |
| Navbar fija con efecto scroll + menú móvil | ✅ |
| Cambio de idioma Español / English | ✅ |
| Sistema de reservas online (guarda en Supabase) | ✅ |
| Formulario de contacto (guarda en Supabase) | ✅ |
| Menú con filtros por categoría | ✅ |
| Toggle de precios (Soles / USD) | ✅ |
| Tienda online con carrito (drawer lateral) | ✅ |
| Filtros de productos por categoría | ✅ |
| Galería masonry con lightbox | ✅ |
| Blog con posts y newsletter | ✅ |
| Mapa de Google Maps embebido | ✅ |
| Animaciones y microinteracciones CSS | ✅ |
| Scroll reveal en todas las secciones | ✅ |
| SEO básico (meta tags, og:image) | ✅ |
| Footer completo con horarios y redes | ✅ |
| Integración WhatsApp | ✅ |
| Row Level Security en Supabase | ✅ |
| Trigger automático para perfiles de usuario | ✅ |

---

## 🎨 Personalización

### Cambiar colores
Edita las variables CSS en `src/assets/styles/main.css`:

```css
:root {
  --color-gold: #c9a96e;      /* Color dorado principal */
  --color-deep: #0f1e1b;      /* Fondo oscuro */
  --color-cream: #f5f0e6;     /* Texto claro */
  /* etc. */
}
```

### Cambiar contenido del menú
Edita el array `menuData` en `src/views/MenuView.vue`.

### Cambiar imágenes
Reemplaza las URLs de Unsplash con tus propias imágenes subidas al bucket de Supabase Storage.

### Agregar idiomas
Agrega nuevas traducciones en el objeto `messages` dentro de `src/main.js`.

---

## 📞 Soporte

Para consultas técnicas sobre este proyecto:
- **WhatsApp Alfresco**: +51 979 701 279
- **Instagram**: [@restaurantealfresco](https://www.instagram.com/restaurantealfresco/)

---

© 2024 Restaurante Alfresco. Lima, Perú.
