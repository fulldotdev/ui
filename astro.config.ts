import mdx from "@astrojs/mdx"
import liveCode from "astro-live-code"
import { defineConfig, fontProviders } from "astro/config"

import fulldevIntegration from "./src/lib/integration"

export default defineConfig({
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
        dark: "github-dark",
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
    mdx(),
  ],
})
