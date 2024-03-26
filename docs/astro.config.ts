import starlight from '@astrojs/starlight'
import vercel from '@astrojs/vercel/static'
import { fullui } from '@fulldevlabs/fullui/astro'
// @ts-ignore
import liveCode from 'astro-live-code'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://fullui.dev',
  adapter: vercel(),
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
          items: [
            { label: 'Introduction', link: '/overview/introduction/' },
            { label: 'Getting started', link: '/overview/getting-started/' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Installation', link: '/guides/installation/' },
            { label: 'Theming', link: '/guides/theming/' },
            { label: 'Endomorphic', link: '/guides/macromorphic/' },
            { label: 'Typescript', link: '/guides/typescript/' },
          ],
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
      ],
    }),
    fullui(),
    liveCode({
      layout: './src/components/LiveCodeLayout.astro',
    }),
  ],
})
