// @ts-check
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'
import preset from 'fulldev-ui/integrations/preset.ts'

// https://astro.build/config
export default defineConfig({
  integrations: [preset(), vue()],
})
