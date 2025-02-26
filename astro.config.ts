import sitemap from '@astrojs/sitemap'
import vue from '@astrojs/vue'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://ui.full.dev',
  trailingSlash: 'always',

  prefetch: {
    prefetchAll: true,
  },

  integrations: [robotsTxt(), sitemap(), vue(), react()],

  devToolbar: {
    enabled: false,
  },

  vite: {
    plugins: [tailwindcss()],
  },
})
