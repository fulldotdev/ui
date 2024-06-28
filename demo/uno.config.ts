// uno.config.ts
import { defineConfig } from 'unocss'
import fullUI from '../package/src/integration/unocss.ts'

export default defineConfig({
  presets: [fullUI],
})
