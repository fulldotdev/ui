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
      layout: '/src/components/Code.astro',
    }),
    integration({
      company: 'Fulldev UI',
      favicon: 'src/images/favicon.svg',
      css: '/src/css/custom.css',
      basePreset: 'base',
      injectRoutes: true,
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  redirects: {
    '/discord': 'https://discord.gg/vXZqMbadm8',
    '/structure/[...slug]': '/components/[...slug]',
    '/segment/[...slug]': '/components/[...slug]',
    '/typography/[...slug]': '/components/[...slug]',
    '/base/[...slug]': '/components/[...slug]',
    '/overview/theming/': '/overview/customization/',
  },
})
