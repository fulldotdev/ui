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
    responsiveStyles: true,
    // Widths for images with a layout. Source photos are at most 3840 pixels,
    // so the list ends there; the browser picks one through srcset and sizes.
    breakpoints: [640, 828, 1080, 1280, 1920, 2560, 3840],
  },
  markdown: {
    // astro-live-code adds a remark plugin, which only runs on the unified
    // processor. Astro 7 defaults to Sätteri.
    processor: unified(),
    shikiConfig: {
      themes: {
        light: "github-light-default",
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
