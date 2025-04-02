import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import robotsTxt from "astro-robots-txt"
import { defineConfig, envField } from "astro/config"

import integration from "./src/lib/integration"

export default defineConfig({
  site: "https://ui.full.dev",
  prefetch: {
    prefetchAll: true,
  },
  env: {
    schema: {
      SHOPIFY_ADMIN_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      SHOPIFY_ADMIN_SECRET_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [robotsTxt(), sitemap(), react(), integration()],
  vite: {
    plugins: [tailwindcss()],
  },
})
