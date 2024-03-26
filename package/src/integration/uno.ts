import { merge } from 'merge-anything'
import { presetMini, type Preset } from 'unocss'
import presetColor, { type ColorConfig } from './presetColor'
import presetFlow, { type FlowConfig } from './presetFlow'
import type { FontConfig } from './presetFont'
import presetFont from './presetFont'
import presetTheme, { type ThemeConfig } from './presetTheme'

interface Config {
  color: ColorConfig
  font: FontConfig
  flow: FlowConfig
  theme: ThemeConfig
}

const defaultConfig: Config = {
  color: {
    scheme: 'light',
    palettes: {
      base: 'slate',
      accent: 'indigo',
    },
  },
  font: {
    base: 'Inter',
    heading: 'Inter',
  },
  flow: {
    scale: 1,
    radius: 1,
    slope: 1,
  },
  theme: {
    border: 1,
  },
}

export default function preset(userConfig?: Partial<Config>): Preset {
  const config: Config = merge(defaultConfig, userConfig || {})
  return {
    name: 'unocss-preset-fullui',
    presets: [
      presetMini(),
      presetFlow(config.flow),
      presetFont(config.font),
      presetColor(config.color),
      presetTheme(config.theme),
    ],
  }
}

export type UnoConfig = Config
