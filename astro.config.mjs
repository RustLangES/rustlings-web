// @ts-check

import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { rehypeGithubAlerts } from "rehype-github-alerts"
import Icons from "unplugin-icons/vite"

// https://astro.build/config
export default defineConfig({
	output: "server",
	adapter: cloudflare({ imageService: "passthrough" }),
	i18n: {
		defaultLocale: "es",
		locales: ["es", "en"],
		routing: {
			prefixDefaultLocale: true,
		},
	},
	vite: {
		plugins: [
			tailwindcss(),
			Icons({
				compiler: "astro",
			}),
		],
	},

	markdown: {
		rehypePlugins: [rehypeGithubAlerts],
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
