import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel/static';
import fullui from '@fulldevlabs/fullui/integration';
// @ts-ignore
import liveCode from 'astro-live-code';
import { defineConfig } from 'astro/config';

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
          autogenerate: { directory: 'overview' },
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
});
