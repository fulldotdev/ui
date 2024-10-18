import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import yaml from '@rollup/plugin-yaml'
import favicons from 'astro-favicons'
// @ts-ignore
import liveCode from 'astro-live-code'
import pagefind from 'astro-pagefind'
import { defineConfig } from 'astro/config'
import integration from 'fulldev-ui/integration'

// https://astro.build/config
export default defineConfig({
  site: 'https://ui.full.dev',
  devToolbar: {
    enabled: false,
  },
  experimental: {
    contentIntellisense: false,
    contentLayer: true,
  },
  integrations: [
    sitemap(),
    mdx(),
    pagefind(),
    liveCode({
      layout: '/src/components/experimental/Window.astro',
    }),
    favicons({
      path: 'src/images/favicon.svg',
      masterPicture: 'src/images/favicon.svg',
      appName: 'Fulldev UI',
      appShortName: 'Fulldev UI',
    }),
    integration({
      css: '/src/css/custom.css',
      colors: {
        theme: 'dark',
        light: {
          background: '#fff',
          base: '#0F0F0F',
          brand: '#F50',
        },
        dark: {
          background: '#0F0F0F',
          base: '#0F0F0F',
          brand: '#F50',
        },
      },
      injectRoutes: true,
      overrideComponents: true,
    }),
  ],
  vite: {
    plugins: [yaml()],
  },
  redirects: {
    '/discord': 'https://discord.gg/vXZqMbadm8',
    '/segment/card': '/base/card',
    '/segment/section': '/base/section',
    '/segment/header': '/blocks/header',
    '/segment/footer': '/blocks/footer',
    '/blocks': '/blocks/banner',
  },
})
