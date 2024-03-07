import { default as UnoCSS } from '@unocss/astro'
import type { AstroIntegration } from 'astro'
import type { UnoConfig } from './uno'
import preset from './uno'

interface Config extends UnoConfig {}

export default function fullui(config?: Partial<Config>): AstroIntegration {
  return UnoCSS({
    injectReset: false,
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
  })
}
