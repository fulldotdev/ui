// @ts-ignore
import liveCode from 'astro-live-code'
import { defineConfig, envField } from 'astro/config'
import integration from 'fulldev-ui/integration'

// https://astro.build/config
export default defineConfig({
  site: 'https://ui.full.dev',
  devToolbar: {
    enabled: false,
  },
  experimental: {
    contentLayer: true,
    env: {
      schema: {
        SITE_URL: envField.string({
          context: 'client',
          access: 'public',
        }),
        STRIPE_RESTRICTED_KEY: envField.string({
          context: 'client',
          access: 'public',
          optional: true,
        }),
        STRIPE_SECRET_KEY: envField.string({
          context: 'server',
          access: 'secret',
          optional: true,
        }),
      },
      validateSecrets: true,
    },
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
