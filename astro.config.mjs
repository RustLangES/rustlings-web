import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [tailwind(), vue()],
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
  },
});
