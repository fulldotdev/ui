import merge from 'deepmerge'
import type { Preset } from 'unocss'
import { presetWebFonts } from 'unocss'
import { presetRadix, type RadixColors } from 'unocss-preset-radix'
import presetTheme from 'unocss-preset-theme'
import type { WebFontsOptions } from 'unocss/preset-web-fonts'
import flowPrelight from './flowPrelight'

type ColorScale = Record<string, string>
type ColorPalette = Record<string, ColorScale>

interface Config {
  colors: Record<string, RadixColors | ColorScale | ColorPalette>
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

export default function preset(userConfig: Config): Preset {
  const config: Config = merge(defaultConfig, userConfig || {})

  return {
    name: 'unocss-preset-fullui',
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
      presetTheme({
        theme: {
          colors: {},
        },
      }),
    ],
  }
}
