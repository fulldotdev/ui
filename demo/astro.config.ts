import fullui from '@fullui/ui/integration'
import type { AstroIntegration } from 'astro'
import { defineConfig } from 'astro/config'

export default defineConfig({
  output: 'static',
  site: 'https://localhost:4321',
  integrations: [fullui({}) as AstroIntegration],
})
