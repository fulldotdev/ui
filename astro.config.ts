import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import liveCode from 'astro-live-code'
import { defineConfig } from 'astro/config'
import integration from 'fulldev-ui/integration'

// https://astro.build/config
export default defineConfig({
  site: 'https://ui.full.dev',
  integrations: [
    sitemap(),
    mdx(),

    liveCode({
      layout: '/src/components/experimental/Window.astro',
    }),
    integration({
      css: '/src/css/custom.css',
      colors: {
        theme: 'dark',
        dark: {
          background: '#131113',
          base: '#18191B',
          brand: '#EA512F',
        },
      },
    }),
  ],
  redirects: {
    '/discord': 'https://discord.gg/vXZqMbadm8',
  },
})
