// @ts-check
import { defineConfig } from 'astro/config'
import fulldev from 'fulldev-ui/integration'

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [fulldev({}), vue()],
})