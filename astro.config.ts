import mdx from "@astrojs/mdx"
import { defineConfig } from "astro/config"

import fulldevIntegration from "./src/lib/integration"

export default defineConfig({
  image: {
    breakpoints: [640, 750, 828, 1080, 1280, 1668, 2048, 2560],
  },
  prefetch: {
    prefetchAll: true,
  },
  devToolbar: {
    enabled: false,
  },
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
    mdx(),
  ],
})
