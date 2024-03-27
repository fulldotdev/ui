import UnoCSS from '@unocss/astro'
import type { AstroIntegration } from 'astro'
import type { UnoConfig } from './unoPreset'
import unoPreset from './unoPreset'

interface Config extends UnoConfig {}

export default function unoIntegration(
  config?: Partial<Config>
): AstroIntegration {
  return UnoCSS({
    injectReset: true,
    content: {
      pipeline: {
        include: [
          /\.(vue|svelte|[jt]sx|md|mdx?|astro|elm|php|phtml|html)($|\?)/,
          'src/**/*.{js,ts,md,mdx}',
        ],
      },
      filesystem: ['src/**/*.md'],
    },
    presets: [unoPreset(config)],
  })
}
