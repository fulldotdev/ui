import sitemap from '@astrojs/sitemap'
import starlight from '@astrojs/starlight'
import bookshop from '@bookshop/astro-bookshop'
import yaml from '@rollup/plugin-yaml'
import robotsTxt from 'astro-robots-txt'
import { defineConfig, passthroughImageService } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  output: 'static',
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
    starlight({
      title: 'FullUI',
      sidebar: [
        {
          label: 'Getting started',
          autogenerate: {
            directory: 'getting-started',
          },
        },
        {
          label: 'Guides',
          autogenerate: {
            directory: 'guides',
          },
        },
        {
          label: 'Components',
          autogenerate: {
            directory: 'components',
          },
        },
        {
          label: 'Elements',
          autogenerate: {
            directory: 'elements',
          },
        },
        {
          label: 'Roots',
          autogenerate: {
            directory: 'Roots',
          },
        },
      ],
    }),
  ],
})
