import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import preset from './src/preset/uno'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'http://localhost:4321',
  integrations: [
    UnoCSS({
      injectReset: true,
      content: {
        pipeline: {
          include: [
            // the default
            /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
            // include js/ts files
            'src/**/*.{js,ts,md}',
          ],
        },
        filesystem: ['src/**/*.md'],
      },
      presets: [preset({})],
    }),
    // UnoCSS({
    //   injectReset: true,
    // }),
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
