import { defineConfig, passthroughImageService } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import bookshop from '@bookshop/astro-bookshop'
import yaml from '@rollup/plugin-yaml'
import robotsTxt from 'astro-robots-txt'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: import.meta.env?.PUBLIC_APP_URL,
  scopedStyleStrategy: 'where',
  image: {
    service: passthroughImageService(),
  },
  vite: {
    plugins: [yaml()],
  },
  integrations: [
    svelte(), 
    sitemap(), 
    robotsTxt(), 
    bookshop(),
    starlight({
      title: "FullUI",
      social: {
        github: "https://github.com/dylankuipers",
      },
      sidebar: [
        {
          label: "Getting started",
          autogenerate: { directory: "getting-started" },
        },
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        {
          label: "Elements",
          autogenerate: { directory: "elements" },
        },
        {
          label: "Wrappers",
          autogenerate: { directory: "wrappers" },
        },
        {
          label: "Components",
          autogenerate: { directory: "components" },
        },
      ],
    }),
  ],
});
