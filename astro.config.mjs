import sitemap from '@astrojs/sitemap'
import starlight from '@astrojs/starlight'
import bookshop from '@bookshop/astro-bookshop'
import yaml from '@rollup/plugin-yaml'
import robotsTxt from 'astro-robots-txt'
import { defineConfig, passthroughImageService } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  output: import.meta.env.OUPUT || 'static', // static | server
  site: import.meta.env?.PUBLIC_APP_URL,
  scopedStyleStrategy: 'where',
  image: {
    service: passthroughImageService(),
  },
  vite: {
    plugins: [yaml()],
  },
  integrations: [
    sitemap(),
    robotsTxt(),
    bookshop(),
    import.meta.env.OUPUT !== 'server' &&
      starlight({
        title: 'FullUI',
        social: {
          github: 'https://github.com/silveltman/fullui',
        },
        sidebar: [
          {
            label: 'Getting started',
            autogenerate: { directory: 'getting-started' },
          },
          {
            label: 'Guides',
            autogenerate: { directory: 'guides' },
          },
          {
            label: 'Blocks',
            autogenerate: { directory: 'blocks' },
          },
          {
            label: 'Elements',
            autogenerate: { directory: 'elements' },
          },
        ],
      }),
  ],
})
