import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://ui.full.dev',
  integrations: [
    sitemap(),
  ],
  redirects: {
    '/discord': 'https://discord.gg/vXZqMbadm8',
  },
})
