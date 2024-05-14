import starlight from '@astrojs/starlight'
// @ts-ignore
import liveCode from 'astro-live-code'
import { defineConfig } from 'astro/config'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://fullui.dev',
  integrations: [
    starlight({
      title: 'Fullui',
      // logo: {
      //   src: './src/assets/logo.png',
      //   alt: 'Logo Fullui',
      //   replacesTitle: true,
      // },
      social: {
        github: 'https://github.com/fullui/ui',
        'x.com': 'https://x.com/silveltm',
        linkedin: 'https://www.linkedin.com/in/silveltman/',
      },
      tableOfContents: {
        maxHeadingLevel: 4,
      },
      favicon: './favicon.png',
      customCss: ['./src/css/custom.css', '@fullui/ui/colors'],
      components: {
        Head: './src/components/Head.astro',
      },
      pagefind: false,
      sidebar: [
        {
          label: 'Overview',
          autogenerate: {
            directory: 'overview',
          },
        },
        // {
        //   label: 'Foundation',
        //   autogenerate: {
        //     directory: 'foundation',
        //   },
        // },
        // {
        //   label: 'Theme',
        //   autogenerate: {
        //     directory: 'theme',
        //   },
        // },
        {
          label: 'Base',
          autogenerate: {
            directory: 'base',
          },
        },
        {
          label: 'Typography',
          autogenerate: {
            directory: 'typography',
          },
        },
        {
          label: 'Layout',
          autogenerate: {
            directory: 'layout',
          },
        },
      ],
    }),
    liveCode({
      layout: '/src/components/LiveCodeLayout.astro',
    }),
    sitemap(),
  ],
})
