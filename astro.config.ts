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
  ],
})
