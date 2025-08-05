import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import favicons from "astro-favicons"
import robotsTxt from "astro-robots-txt"
import { defineConfig, fontProviders } from "astro/config"

export default defineConfig({
  site: "https://ui.full.dev",
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Geist",
        cssVariable: "--font-sans",
        weights: [
          "100",
          "200",
          "300",
          "400",
          "500",
          "600",
          "700",
          "800",
          "900",
        ],
      },
    ],
  },
  trailingSlash: "never",
  i18n: {
    defaultLocale: "nl",
    locales: ["nl", "en"],
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
    objectFit: "cover",
    objectPosition: "center",
    breakpoints: [320, 768, 1024, 1280, 1536, 1920],
  },
  prefetch: {
    prefetchAll: true,
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [robotsTxt(), sitemap(), react(), favicons()],
  vite: {
    plugins: [tailwindcss()],
  },
})
