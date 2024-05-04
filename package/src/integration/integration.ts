import type { AstroIntegration } from 'astro'
import autoprefixer from 'autoprefixer'
import postcssNesting from 'postcss-nesting'
import postcssPresetEnv from 'postcss-preset-env'
import { mergeDeep } from 'remeda'
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
    heading: 'IMB Plex Sans:700',
    subheading: 'IMB Plex Sans:700',
    text: 'IMB Plex Sans:400',
    tagline: 'IMB Plex Sans:400',
    button: 'IMB Plex Sans:500',
  },
}

export default function fulluiIntegration(userConfig: any): AstroIntegration {
  const config: any = mergeDeep(defaultConfig || {}, userConfig || {})

  return {
    name: '@fullui/ui/integration',
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
                'virtual:@fullui/ui/config': `export default ${JSON.stringify(config)}`,
              }),
            ],
            css: {
              postcss: {
                plugins: [postcssNesting, postcssPresetEnv, autoprefixer],
              },
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
