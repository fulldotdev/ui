import sitemap from '@astrojs/sitemap'
import starlight from '@astrojs/starlight'
// @ts-ignore
import liveCode from 'astro-live-code'
import { defineConfig } from 'astro/config'
import fulldevUI from 'fulldev-ui/integration'

// https://astro.build/config
export default defineConfig({
  site: 'https://ui.full.dev',
  integrations: [
    starlight({
      title: 'Fulldev UI',
      social: {
        discord: 'https://discord.gg/vXZqMbadm8',
        'x.com': 'https://x.com/silveltm',
        github: 'https://github.com/fulldotdev/ui',
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
        {
          label: 'Typography',
          autogenerate: {
            directory: 'typography',
          },
        },
        {
          label: 'Base',
          autogenerate: {
            directory: 'base',
          },
        },
      ],
    }),
    liveCode({
      layout: '/src/components/LiveCodeLayout.astro',
    }),
    sitemap(),
    fulldevUI({
      layer: false,
    }),
  ],
})
