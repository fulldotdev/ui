import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import liveCode from 'astro-live-code'
import integration from 'fulldev-ui/integration/integration'


// https://astro.build/config
export default defineConfig({
  site: 'https://ui.full.dev',
  integrations: [
    sitemap(),
    mdx(),

    liveCode({
      layout: '/src/components/Window.astro',
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
