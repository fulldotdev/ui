// uno.config.ts
import { defineConfig } from 'unocss'
import fulldevUI from '../package/src/integration/unocss.ts'

export default defineConfig({
  presets: [fulldevUI],
})
