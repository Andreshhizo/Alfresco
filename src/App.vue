<template>
  <div id="alfresco-app">
    <AppNav />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
    <CartDrawer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLangStore } from '@/stores/lang'
import AppNav from '@/components/AppNav.vue'
import AppFooter from '@/components/AppFooter.vue'
import CartDrawer from '@/components/CartDrawer.vue'

const { locale } = useI18n()
const langStore = useLangStore()

onMounted(() => {
  locale.value = langStore.currentLang
  // Intersection observer for scroll reveal
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  )
  const observe = () => document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
  observe()
  const mutObs = new MutationObserver(observe)
  mutObs.observe(document.body, { childList: true, subtree: true })
})
</script>
