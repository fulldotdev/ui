import starlight from '@astrojs/starlight'
import fullui from '@fullui/ui/integration'
// @ts-ignore
import liveCode from 'astro-live-code'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://fullui.dev',
  integrations: [
    starlight({
      title: 'Fullui',
      logo: {
        src: './src/assets/logo.png',
        alt: 'Logo Fullui',
        replacesTitle: true,
      },
      favicon: './favicon.png',
      // components: {
      // FIXME: causing erro on vercel build
      // Head: './src/components/StarlightHead.astro',
      // },
      customCss: ['./src/css/custom.css'],
      sidebar: [
        {
          label: 'Overview',
          autogenerate: { directory: 'overview' },
        },
        // {
        //   label: 'Typography',
        //   autogenerate: { directory: 'typography' },
        // },
        // {
        //   label: 'Layout',
        //   autogenerate: { directory: 'layout' },
        // },
        {
          label: 'Base',
          autogenerate: { directory: 'base' },
        },
        {
          label: 'Typography',
          autogenerate: { directory: 'typography' },
        },
        {
          label: 'Layout',
          autogenerate: { directory: 'layout' },
        },
        {
          label: 'Utility',
          autogenerate: { directory: 'utilities' },
        },
      ],
    }),
    fullui(),
    liveCode({
      layout: '/src/components/LiveCodeLayout.astro',
    }),
  ],
})
