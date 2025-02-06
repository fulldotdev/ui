import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://ui.full.dev',
  integrations: [robotsTxt(), vue(), mdx(), sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
})
