// @ts-check
import { defineConfig } from 'astro/config'
import fulldev from 'fulldev-ui/integration'

// https://astro.build/config
export default defineConfig({
  integrations: [fulldev({})],
})
