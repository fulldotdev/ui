import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
// @ts-ignore
import liveCode from 'astro-live-code'
import { defineConfig } from 'astro/config'
import integration from 'fulldev-ui/integration'

// https://astro.build/config
export default defineConfig({
  site: 'https://ui.full.dev',
  devToolbar: {
    enabled: false,
  },
  experimental: {
    contentIntellisense: false,
    contentLayer: true,
  },
  integrations: [
    sitemap(),
    mdx(),
    liveCode({
      layout: '/src/components/experimental/Window.astro',
    }),
    integration({
      company: 'Fulldev UI',
      favicon: 'src/images/favicon.svg',
      css: '/src/css/custom.css',
      colors: {
        theme: 'dark',
        light: {
          background: '#fff',
          base: '#0F0F0F',
          brand: '#F50',
        },
        dark: {
          background: '#0F0F0F',
          base: '#0F0F0F',
          brand: '#F50',
        },
      },
      injectRoutes: true,
    }),
  ],
  redirects: {
    '/discord': 'https://discord.gg/vXZqMbadm8',
    '/segment/card': '/base/card',
    '/segment/section': '/base/section',
    '/segment/header': '/blocks/header',
    '/segment/footer': '/blocks/footer',
    '/blocks': '/blocks/banner',
  },
})
