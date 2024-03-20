import { fullui } from '@fulldevlabs/fullui/astro'
import type { AstroIntegration } from 'astro'
import { defineConfig } from 'astro/config'

export default defineConfig({
  output: 'static',
  site: 'https://localhost:4321',
  integrations: [
    fullui({
      color: {
        scheme: 'dark',
        palettes: {
          base: 'sand',
          accent: 'amber',
        },
      },
      theme: {
        border: 2,
      },
    }) as AstroIntegration,
  ],
})
