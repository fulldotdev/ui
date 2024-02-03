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
          autogenerate: {
            directory: 'getting-started',
          },
        },
        {
          label: 'Design system',
          items: [
            { label: 'Introduction', link: '/design-system/introduction/' },
            { label: 'Theme', link: '/design-system/theme/' },
            { label: 'Flow', link: '/design-system/flow/' },
          ],
          autogenerate: {
            directory: 'design-system',
          },
        },
        {
          label: 'Elements',
          autogenerate: {
            directory: 'elements',
          },
        },
        {
          label: 'Blocks',
          autogenerate: {
            directory: 'Blocks',
          },
        },
      ],
    }),
  ],
})
