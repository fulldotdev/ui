import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import bookshop from "@bookshop/astro-bookshop"
import tailwindcss from "@tailwindcss/vite"
import favicons from "astro-favicons"
import robotsTxt from "astro-robots-txt"
import { defineConfig, fontProviders } from "astro/config"

export default defineConfig({
  site: "https://deuitzender.nl",
  i18n: {
    defaultLocale: "nl",
    locales: ["nl"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
      fallbackType: "redirect",
    },
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
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        cssVariable: "--font-base",
        name: "Geist",
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
      {
        provider: fontProviders.google(),
        cssVariable: "--font-heading",
        name: "Geist",
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
  integrations: [
    robotsTxt(),
    react(),
    sitemap({
      changefreq: "weekly",
      lastmod: new Date(),
      i18n: {
        defaultLocale: "nl",
        locales: {
          nl: "nl",
        },
      },
    }),
    favicons({
      input: {
        favicons: ["src/assets/favicon.svg"],
      },
      name: "deuitzender",
      short_name: "deuitzender",
    }),
    bookshop(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
