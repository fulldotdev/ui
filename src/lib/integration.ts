import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import type { AstroIntegration } from 'astro'

interface Config {}

export default function fulldevIntegration(config?: Partial<Config> | undefined): AstroIntegration {
  return {
    name: '/integration',
    hooks: {
      'astro:config:setup': async ({ updateConfig, injectScript }) => {
        // Update the config with required integrations
        updateConfig({
          integrations: [
            vue({ appEntrypoint: 'fulldev-ui/_app' }),
            tailwind({
              applyBaseStyles: false,
            }),
          ],
        })

        // Inject the global CSS file
        injectScript('page-ssr', `import "@/styles/global.css";`)
      },
    },
  }
}
