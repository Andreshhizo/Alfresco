import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLangStore = defineStore('lang', () => {
  const currentLang = ref(localStorage.getItem('alfresco-lang') || 'es')

  function setLang(lang) {
    currentLang.value = lang
    localStorage.setItem('alfresco-lang', lang)
  }

  return { currentLang, setLang }
})
