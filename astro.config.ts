import svelte from '@astrojs/svelte'
import { defineConfig } from 'astro/config'
import integration from 'fulldev-ui/integration'

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [
    integration({
      company: 'Fulldev UI',
      favicon: 'public/images/favicon.svg',
      css: '/src/css/custom.css',
      injectRoutes: false,
    }),
    svelte(),
  ],
  redirects: {
    // '/structure/[...slug]': '/docs/components/[...slug]',
    // '/segment/[...slug]': '/docs/components/[...slug]',
    // '/typography/[...slug]': '/docs/components/[...slug]',
    // '/base/[...slug]': '/docs/components/[...slug]',
    // '/overview/theming/': '/docs/customization/',
    // '/overview/[...slug]': '/docs/[...slug]',
  },
})
