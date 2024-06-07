import sitemap from '@astrojs/sitemap'
import starlight from '@astrojs/starlight'
// @ts-ignore
import liveCode from 'astro-live-code'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://ui.full.dev',
  integrations: [
    starlight({
      title: 'Fulldev UI',
      social: {
        github: 'https://github.com/fulldotdev/ui',
        'x.com': 'https://x.com/silveltm',
        linkedin: 'https://www.linkedin.com/in/silveltman/',
      },
      tableOfContents: {
        maxHeadingLevel: 4,
      },
      favicon: './favicon.png',
      customCss: ['./src/css/custom.css', 'fulldev-ui/colors'],
      pagefind: false,
      sidebar: [
        {
          label: 'Overview',
          autogenerate: {
            directory: 'overview',
          },
        },
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
          label: 'Structure',
          autogenerate: {
            directory: 'structure',
          },
        },
        {
          label: 'Segment',
          autogenerate: {
            directory: 'segment',
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
