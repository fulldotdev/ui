import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import preset from './src/preset/uno'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'http://localhost:4321',
  integrations: [
    starlight({
      title: 'Fullui',
      sidebar: [
        {
          label: 'Home',
          items: [
            {
              label: 'Getting Started',
              link: '/docs',
            },
          ],
        },
      ],
    }),
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
  ],
})
