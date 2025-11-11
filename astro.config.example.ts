import { defineConfig } from "astro/config"

import integration from "./src/lib/integration"

export default defineConfig({
  integrations: [
    integration({
      site: "https://ui.full.dev",
      name: "fulldev/ui",
      defaultLocale: "en",
      locales: ["en"],
      favicon: "src/assets/favicon.svg",
      fonts: {
        base: "Geist",
        heading: "Geist",
      },
    }),
  ],
})
