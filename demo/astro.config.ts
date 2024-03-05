import fullui from '@fulldevlabs/fullui/src/preset/astro'
import type { AstroIntegration } from 'astro'
import { defineConfig } from 'astro/config'

export default defineConfig({
  output: 'static',
  site: 'https://localhost:4321',
  integrations: [
    fullui({
      color: {
        scheme: 'light',
        palettes: {
          base: 'sand',
          accent: 'orange',
        },
      },
      theme: {
        border: 2,
      },
    }) as AstroIntegration,
  ],
})
