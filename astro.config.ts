import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'
import config from './src/data/config.json'
import integration from './src/lib/integration'

export default defineConfig({
  site: 'https://ui.full.dev',
  trailingSlash: 'always',
  prefetch: {
    prefetchAll: true,
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [robotsTxt(), sitemap(), react(), integration(config as any)],
  vite: {
    plugins: [tailwindcss()],
  },
})
