import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import favicons from "astro-favicons"
import robotsTxt from "astro-robots-txt"
import { defineConfig, fontProviders } from "astro/config"

import site from "./site.json"

export default defineConfig({
  site: site.site,
  trailingSlash: "always",
  image: {
    breakpoints: [640, 750, 828, 1080, 1280, 1668, 2048, 2560],
    responsiveStyles: false,
    layout: "full-width",
  },
  prefetch: {
    prefetchAll: true,
  },
  devToolbar: {
    enabled: false,
  },
  i18n: {
    defaultLocale: site.defaultLocale,
    locales: site.locales,
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
      fallbackType: "redirect",
    },
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        cssVariable: "--font-base",
        name: site.fonts.base,
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
        name: site.fonts.heading || site.fonts.base,
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
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    robotsTxt(),
    sitemap({
      changefreq: "weekly",
      lastmod: new Date(),
      i18n: {
        defaultLocale: site.defaultLocale,
        locales: Object.fromEntries(
          site.locales.map((locale) => [locale, locale])
        ),
      },
    }),
    favicons({
      input: {
        favicons: [site.favicon],
      },
      name: site.name,
      short_name: site.name,
    }),
  ],
})
