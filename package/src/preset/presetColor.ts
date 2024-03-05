import merge from 'deepmerge'
import type { Preset } from 'unocss'
import { presetRadix, type RadixColors } from 'unocss-preset-radix'

// TODO allow custom color palettes
// type ColorRadix = RadixColors
// const isRadix = (value: Config[string]): value is Radix =>
//   typeof value === 'string'

// type ColorScale = Record<string, string>
// const isScale = (value: any): value is Scale =>
//   typeof value === 'object' &&
//   value !== null &&
//   Object.values(value).every((v) => typeof v === 'string')

// type ColorPalette = Record<string, ColorScale>
// const isPalette = (value: Config[string]): value is Palette =>
//   typeof value === 'object' &&
//   value !== null &&
//   Object.values(value).every((v) => typeof v === 'object')

interface Config {
  scheme: 'light' | 'dark'
  palettes: Record<string, RadixColors>
}

const defaultConfig: Config = {
  scheme: 'light',
  palettes: {
    base: 'slate',
    accent: 'indigo',
  },
}

export default function preset(userConfig?: Partial<Config>): Preset {
  const config: Config = merge(defaultConfig, userConfig || {})
  return {
    name: 'unocss-preset-fullui-color',
    presets: [
      presetRadix({
        lightSelector: config.scheme === 'light' ? ':root, .light' : '.light',
        darkSelector: config.scheme === 'dark' ? ':root, .dark' : '.dark',
        prefix: '--',
        palette: Object.values(config.palettes),
        aliases: config.palettes,
      }),
    ],
  }
}

export type ColorConfig = Config
