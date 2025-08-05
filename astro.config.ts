import { defineConfig } from "astro/config"

import fulldev from "./src/lib/integration"

export default defineConfig({
  integrations: [
    fulldev({
      name: "fulldev",
      site: "https://ui.full.dev",
      font: "Geist",
      defaultLocale: "nl",
      locales: ["nl", "en"],
      favicon: "src/images/favicon.svg",
    }),
  ],
})
