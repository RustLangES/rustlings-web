// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  nitro: { preset: "cloudflare-pages" },

  modules: [
    "@nuxtjs/color-mode",
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    //"nitro-cloudflare-dev",
    "nuxt-clarity-analytics",
  ],

  content: {
    highlight: {
      theme: {
        default: "dracula",
      },
      langs: ['rust', 'shell', 'viml', 'shellsession'] // instala el lang faltante
    },
  },

  compatibilityDate: "2025-01-16",
});
