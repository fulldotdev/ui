import { defineConfig } from "astro/config"

import fulldev from "./src/lib/integration"

export default defineConfig({
  integrations: [
    fulldev({
      name: "Van Dillen antieke bouwmaterialen",
      site: "https://vdabouwmaterialen.nl",
      fonts: {
        base: "Geist",
        heading: "Geist",
      },
      defaultLocale: "nl",
      locales: ["nl", "en", "de", "fr"],
      favicon: "src/assets/favicon.svg",
    }),
  ],
})
