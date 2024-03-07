import starlight from '@astrojs/starlight'
import { fullui } from '@fulldevlabs/fullui/astro'
import liveCode from 'astro-live-code'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://fullui.dev',
  integrations: [
    liveCode({
      layout: './src/components/LiveCodeLayout.astro',
    }),
    fullui(),
    starlight({
      title: 'Fullui',
      logo: {
        src: './src/assets/logo.png',
        alt: 'Logo Fullui',
        replacesTitle: true,
      },
      favicon: './favicon.png',
      components: {
        Head: './src/components/Head.astro',
      },
      customCss: ['./src/css/custom.css'],
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'Introduction', link: '/start-here/introduction/' },
            { label: 'Quick Start', link: '/start-here/quick-start/' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Installation', link: '/guides/installation/' },
            { label: 'Theming', link: '/guides/theming/' },
            { label: 'Components', link: '/guides/components/' },
            { label: 'Typescript', link: '/guides/typescript/' },
          ],
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
      ],
    }),
  ],
})
