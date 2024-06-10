import type { AstroIntegration } from 'astro'
import { mergeDeep } from 'remeda'
import virtual from 'vite-plugin-virtual'

const defaultConfig = {
  layer: 'fulldev',
}

export default function fulluiIntegration(
  userConfig: any = {}
): AstroIntegration {
  const config: any = mergeDeep(defaultConfig || {}, userConfig || {})

  return {
    name: '/integration',
    hooks: {
      'astro:config:setup': async ({
        // config: astroConfig,
        updateConfig,
        injectScript,
      }) => {
        updateConfig({
          vite: {
            plugins: [
              virtual({
                'virtual:/config': `export default ${JSON.stringify(config)}`,
              }) as any,
            ],
            css: {
              preprocessorOptions: {
                scss: {
                  additionalData: `$layer: ${config.layer};`,
                },
              },
            },
          },
        })

        // injectScript('page-ssr', 'import "fulldev-ui/css";')
      },
    },
  }
}
