// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
      langs: ['rust', 'shell', 'viml', 'shellsession'] // instala el lang faltante
    },
  },
});
