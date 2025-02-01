import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
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
      css: '/src/styles/custom.css',
      injectRoutes: false,
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
