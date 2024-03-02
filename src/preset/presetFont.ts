import merge from 'deepmerge'
import type { Preset } from 'unocss'
import { presetWebFonts } from 'unocss'
import type { WebFontsOptions } from 'unocss/preset-web-fonts'

// TODO add settings for fontweight etc
type Config = WebFontsOptions['fonts']

const defaultConfig: Config = {
  sans: 'Roboto',
  monoooo: ['Fira Code', 'Fira Mono:400,700'],
}

export default function preset(userConfig?: Partial<Config>): Preset {
  const config: Config = merge(defaultConfig || {}, userConfig || {})
  return {
    name: 'unocss-preset-fullui-font',
    presets: [
      presetWebFonts({
        provider: 'bunny',
        fonts: config,
      }),
    ],
  }
}

export type FontConfig = Config
