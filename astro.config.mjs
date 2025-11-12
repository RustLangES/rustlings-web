// @ts-check

import mdx from "@astrojs/mdx"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import Icons from "unplugin-icons/vite"

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [
			tailwindcss(),
			Icons({
				compiler: "astro",
			}),
		],
	},

	integrations: [
		mdx({
			syntaxHighlight: "shiki",
			shikiConfig: { theme: "dracula" },
			remarkRehype: { footnoteLabel: "Footnotes" },
			gfm: true,
		}),
	],
})
