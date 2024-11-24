// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/color-mode",
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
  ],

  content: {
    highlight: {
      theme: {
        default: "dracula",
      },
      langs: ['rust'] // instala el lang faltante
    },
  },
});
