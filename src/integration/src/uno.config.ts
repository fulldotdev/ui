import { defineConfig } from 'unocss'
import presetFlow from './presetFlow'
import presetTheme from './presetTheme'

export default defineConfig({
  presets: [presetTheme(), presetFlow()],
})
