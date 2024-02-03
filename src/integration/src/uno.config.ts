import { defineConfig } from 'unocss'
import presetFlow from './presetFlow'
import presetTheme from './presetTheme'
// @ts-ignore
import jsonConfig from '../dist/integration-options.json'
const config: any = jsonConfig

export default defineConfig({
  presets: [presetTheme(config.theme), presetFlow(config.theme)],
})
