import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'
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
  integrations: [
    robotsTxt(),
    sitemap(),
    react(),
    integration({
      colors: {
        appearance: 'light',
        primary: '#C41115',
        base: '#8E8C99',
        background: '#FDFCFD',
      },
      slugs: {
        collections: 'collecties',
        persons: 'personen',
        posts: 'blog',
        products: 'producten',
        projects: 'projecten',
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
