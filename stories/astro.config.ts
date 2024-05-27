import type { AstroIntegration } from 'astro'
import { defineConfig } from 'astro/config'
import fullui from 'fulldev-ui/integration'

export default defineConfig({
  output: 'server',
  site: 'https://localhost:4321',
  integrations: [
    fullui({
      font: {
        heading: 'Inter:600',
        subheading: 'Inter:600',
        text: 'JetBrains Mono:400',
        subtext: 'JetBrains Mono:400',
        button: 'JetBrains Mono:500',
      },
    }) as AstroIntegration,
  ],
})
