import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://ui.full.dev',
  trailingSlash: 'always',
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    robotsTxt(),
    mdx(),
    sitemap(),
    vue(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  devToolbar: {
    enabled: false,
  },
})
