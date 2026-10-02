import { defineConfig, fontProviders } from "astro/config"
import { unified } from "@astrojs/markdown-remark"
import mdx from "@astrojs/mdx"
import liveCode from "astro-live-code"

import fulldevIntegration from "./src/lib/integration"

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 4321,
  },
  vite: {
    server: {
      allowedHosts: ["otis.tailb5cb80.ts.net"],
    },
    // The docs create page imports this; prebundle it so the first dev visit
    // does not trigger a dependency re-optimization.
    optimizeDeps: {
      include: ["shadcn/preset"],
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
    // astro-live-code adds a remark plugin, which only runs on the unified
    // processor. Astro 7 defaults to Sätteri.
    processor: unified(),
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
      site: "https://ui.full.dev",
      name: "Fulldev UI",
      favicon: "src/assets/favicon.svg",
      i18n: {
        defaultLocale: "en",
        locales: ["en"],
      },
    }),
    liveCode({
      layout: "/src/components/live-code.astro",
    }),
    mdx({ gfm: true }),
  ],
})
