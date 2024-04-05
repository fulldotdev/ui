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
      social: {
        github: 'https://github.com/fullui/ui',
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
          autogenerate: { directory: 'utility' },
        },
      ],
    }),
    fullui({
      color: {
        base: 'gray',
        accent: 'indigo',
      },
      font: {
        heading: 'Montserrat:900',
        subheading: 'Montserrat:700',
        text: 'Montserrat:400',
        subtext: 'Montserrat:500',
        button: 'Montserrat:400',
      },
    }),
    liveCode({
      layout: '/src/components/LiveCodeLayout.astro',
    }),
  ],
})
