import { defineConfig } from 'astro/config'
import fullui from './src/preset/astro'
// import UnoCSS from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'http://localhost:4321',
  integrations: [
    fullui(),
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
