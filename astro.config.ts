import sitemap from '@astrojs/sitemap'
import starlight from '@astrojs/starlight'
import yaml from '@rollup/plugin-yaml'
import robotsTxt from 'astro-robots-txt'
import { defineConfig, passthroughImageService } from 'astro/config'
import { fulluiIntegration } from './src/integration/fullui'
// @ts-ignore
import bookshop from '@bookshop/astro-bookshop'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: import.meta.env?.PUBLIC_APP_URL,
  scopedStyleStrategy: 'where',
  image: {
    service: passthroughImageService(),
  },
  vite: {
    plugins: [yaml() as any],
  },
  integrations: [
    sitemap(),
    robotsTxt(),
    bookshop(),
    fulluiIntegration({}),
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
