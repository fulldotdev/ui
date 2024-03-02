import { default as UnoCSS } from '@unocss/astro'
import type { AstroIntegration } from 'astro'
import type { UnoConfig } from './uno'
import preset from './uno'

interface Config extends UnoConfig {}

export default function fullui(config?: Partial<Config>): AstroIntegration {
  return UnoCSS({
    injectReset: true,
    presets: [preset(config)],
  })
}
