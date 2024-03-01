import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'
import { fullui } from './src/integration/fullui'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: import.meta.env?.PUBLIC_APP_URL,
  integrations: [
    sitemap(),
    robotsTxt(),
    fullui({
      palettes: {
        base: 'slate',
        accent: 'indigo',
      },
    }),
    // starlight({
    //   title: 'Fullui',
    //   sidebar: [
    //     {
    //       label: 'Getting started',
    //       autogenerate: {
    //         directory: 'getting-started',
    //       },
    //     },
    //     {
    //       label: 'Design system',
    //       items: [
    //         { label: 'Introduction', link: '/design-system/introduction/' },
    //         { label: 'Theme', link: '/design-system/theme/' },
    //         { label: 'Flow', link: '/design-system/flow/' },
    //       ],
    //       autogenerate: {
    //         directory: 'design-system',
    //       },
    //     },
    //     {
    //       label: 'Components',
    //       autogenerate: {
    //         directory: 'components',
    //       },
    //     },
    //     {
    //       label: 'Blocks',
    //       autogenerate: {
    //         directory: 'blocks',
    //       },
    //     },
    //   ],
    // }),
  ],
})
