import { default as UnoCSS } from '@unocss/astro'
import type { AstroIntegration } from 'astro'
import merge from 'deepmerge'
import { presetWebFonts } from 'unocss'
import { presetRadix, type RadixColors } from 'unocss-preset-radix'
import type { WebFontsOptions } from 'unocss/preset-web-fonts'
import flowPrelight from './flowPrelight'

interface Config {
  colors: Record<string, RadixColors>
  fonts: WebFontsOptions['fonts']
  borderWidth: number
  scheme: 'light' | 'dark'
  scale: number
  slope: number
  radius: number
}

const defaultConfig: Config = {
  colors: {
    base: 'slate',
    accent: 'indigo',
  },
  fonts: {
    base: 'Inter',
    heading: 'Inter',
  },
  scheme: 'light',
  scale: 1,
  radius: 1,
  slope: 1,
  borderWidth: 1,
}

export default function fullui(
  passedConfig?: Partial<Config>
): AstroIntegration {
  const config: Config = merge(defaultConfig, passedConfig || {})

  return UnoCSS({
    injectReset: true,
    preflights: [flowPrelight(config)],
    presets: [
      presetRadix({
        lightSelector: config.scheme === 'light' ? ':root, .light' : '.light',
        darkSelector: config.scheme === 'dark' ? ':root, .dark' : '.dark',
        prefix: '--',
        palette: Object.values(config.colors),
        aliases: config.colors,
      }),
      presetWebFonts({
        provider: 'bunny',
        fonts: config.fonts,
      }),
    ],
  })
}
