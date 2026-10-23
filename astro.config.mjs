// @ts-check

import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { rehypeGithubAlerts } from "rehype-github-alerts"
import Icons from "unplugin-icons/vite"

// https://astro.build/config
export default defineConfig({
	// Public origin for canonical URLs and Open Graph images (override per environment with SITE_URL)
	site: process.env.SITE_URL ?? "https://rustlings.rustlang-es.org",
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
		// Colors come from --astro-code-* tokens in global.css (brand code palette, AA comments)
		shikiConfig: { theme: "css-variables" },
	},

	integrations: [
		mdx({
			syntaxHighlight: "shiki",
			shikiConfig: { theme: "css-variables" },
			remarkRehype: { footnoteLabel: "Footnotes" },
			gfm: true,
		}),
	],
})
