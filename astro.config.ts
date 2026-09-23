import { defineConfig, fontProviders } from "astro/config"
import mdx from "@astrojs/mdx"
import liveCode from "astro-live-code"

import fulldevIntegration from "./src/lib/integration"
import { siteConfig } from "./src/site.config"

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 4321,
  },
  vite: {
    server: {
      allowedHosts: ["otis.tailb5cb80.ts.net"],
    },
  },
  prefetch: {
    prefetchAll: true,
  },
  devToolbar: {
    enabled: false,
  },
  image: {
    breakpoints: [640, 750, 828, 1080, 1280, 1668, 2048, 2560],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark-default",
      },
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Geist",
      cssVariable: "--font-sans",
      weights: ["300 700"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist Mono",
      cssVariable: "--font-mono",
    },
  ],
  integrations: [
    fulldevIntegration({
      ...siteConfig,
      sitemap: new URL("/sitemap-index.xml", siteConfig.site).href,
      favicon: "src/assets/favicon.svg",
    }),
    liveCode({
      layout: "/src/components/live-code.astro",
    }),
    mdx(),
  ],
})
