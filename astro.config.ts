// @ts-ignore
import liveCode from 'astro-live-code'
import { defineConfig } from 'astro/config'
import integration from 'fulldev-ui/integration'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [
    liveCode({
      layout: '/src/components/experimental/Window.astro',
    }),
    integration({
      company: 'Fulldev UI',
      favicon: 'src/images/favicon.svg',
      css: '/src/css/custom.css',
      basePreset: 'base',
      injectRoutes: true,
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
    }),
    tailwind({
      applyBaseStyles: false,
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
