import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/HomeView.vue') },
  { path: '/nosotros', name: 'About', component: () => import('@/views/AboutView.vue') },
  { path: '/menu', name: 'Menu', component: () => import('@/views/MenuView.vue') },
  { path: '/tienda', name: 'Shop', component: () => import('@/views/ShopView.vue') },
  { path: '/galeria', name: 'Gallery', component: () => import('@/views/GalleryView.vue') },
  { path: '/blog', name: 'Blog', component: () => import('@/views/BlogView.vue') },
  { path: '/blog/:slug', name: 'BlogPost', component: () => import('@/views/BlogPostView.vue') },
  { path: '/reservas', name: 'Reservations', component: () => import('@/views/ReservationsView.vue') },
  { path: '/contacto', name: 'Contact', component: () => import('@/views/ContactView.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFoundView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
