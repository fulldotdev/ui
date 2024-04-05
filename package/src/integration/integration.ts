import type { AstroIntegration } from 'astro'
import merge from 'deepmerge'
import virtual from 'vite-plugin-virtual'

const defaultConfig = {
  color: {
    accent: 'indigo',
    base: 'slate',
  },
  size: {
    scale: 1,
    space: 1,
    radius: 1,
    text: 1,
  },
  theme: {
    border: '1px',
  },
  font: {
    heading: 'Open Sans:700',
    subheading: 'Open Sans:500',
    text: 'Open Sans:400',
    subtext: 'Open Sans:400',
    button: 'Open Sans:500',
  },
}

export default function fulluiIntegration(userConfig: any): AstroIntegration {
  const config: any = merge(defaultConfig || {}, userConfig || {})

  return {
    name: '@fullui/ui/integration',
    hooks: {
      'astro:config:setup': async ({
        // config: astroConfig,
        updateConfig,
        injectScript,
      }) => {
        console.log(
          'config passed to stylus:',
          `config = ${JSON.stringify(config, null, 2)}`
        )

        updateConfig({
          vite: {
            plugins: [
              virtual({
                'virtual:@fullui/ui/config': `export default ${JSON.stringify(config)}`,
              }),
            ],
            css: {
              preprocessorOptions: {
                styl: {
                  additionalData: `config = ${JSON.stringify(config, null, 2)}`,
                },
              },
            },
          },
        })

        injectScript('page-ssr', 'import "@fullui/ui/css";')
      },
    },
  }
}
