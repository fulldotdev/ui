import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
// @ts-ignore
import liveCode from 'astro-live-code'
import pagefind from 'astro-pagefind'
import { defineConfig } from 'astro/config'
import integration from 'fulldev-ui/integration'

// https://astro.build/config
export default defineConfig({
  site: 'https://ui.full.dev',
  integrations: [
    sitemap(),
    mdx(),
    pagefind(),

    liveCode({
      layout: '/src/components/experimental/Window.astro',
    }),
    integration({
      css: '/src/css/custom.css',
      colors: {
        theme: 'dark',
        light: {
          background: '#fff',
          base: '#6F6D66',
          brand: '#F50',
        },
        dark: {
          background: '#111110',
          base: '#6F6D66',
          brand: '#F50',
        },
      },
    }),
  ],
  redirects: {
    '/discord': 'https://discord.gg/vXZqMbadm8',
    '/segment/card': '/base/card',
    '/segment/section': '/base/section',
    '/segment/header': '/blocks/header',
    '/segment/footer': '/blocks/footer',
  },
})
