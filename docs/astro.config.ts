import starlight from '@astrojs/starlight'
import fullui from '@fulldevlabs/fullui/integration'
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
      social: {
        github: 'https://github.com/fulldevlabs/fullui',
        linkedin: 'https://www.linkedin.com/in/silveltman/',
      },
      favicon: './favicon.png',
      customCss: ['./src/css/custom.css'],
      components: {
        // Relative path to the custom component.
        Head: './src/components/Head.astro',
      },
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
            // { label: 'Endomorphic', link: '/guides/endomorphic/' },
            { label: 'Typescript', link: '/guides/typescript/' },
          ],
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
      ],
    }),
    fullui({}),
    liveCode({
      layout: '@components/LiveCodeLayout.astro',
    }),
  ],
})
