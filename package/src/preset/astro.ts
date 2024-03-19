import UnoCSS from '@unocss/astro'
import type { AstroIntegration } from 'astro'
import type { UnoConfig } from './uno'
import preset from './uno'

interface Config extends UnoConfig {}

// export default function fullui(config?: Partial<Config>): AstroIntegration {
//   return UnoCSS({
//     injectReset: true,
//     content: {
//       pipeline: {
//         include: [
//           // the default
//           /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
//           // include js/ts files
//           'src/**/*.{js,ts,md}',
//         ],
//       },
//       filesystem: ['src/**/*.md'],
//     },
//     presets: [preset(config)],
//   })
// }

export default function fullui(config?: Partial<Config>): AstroIntegration {
  return {
    name: 'banana-css-integration',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [
              UnoCSS({
                injectReset: true,
                content: {
                  pipeline: {
                    include: [
                      // the default
                      /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
                      // include js/ts files
                      'src/**/*.{js,ts,md}',
                    ],
                  },
                  filesystem: ['src/**/*.md'],
                },
                presets: [preset(config)],
              }),
            ],
          },
        })
      },
    },
  }
}
