import netlify from "@astrojs/netlify"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import favicons from "astro-favicons"
import robotsTxt from "astro-robots-txt"
import { defineConfig, envField, fontProviders } from "astro/config"

export default defineConfig({
  output: "static",
  site: "https://ui.full.dev",
  env: {
    schema: {
      GITHUB_OWNER: envField.string({
        context: "server",
        access: "public",
      }),
      GITHUB_REPO: envField.string({
        context: "server",
        access: "public",
      }),
      GITHUB_BRANCH: envField.string({
        context: "server",
        access: "public",
      }),
      GITHUB_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
      fallbackType: "redirect",
    },
  },
  // image: {
  //   responsiveStyles: true,
  //   layout: "constrained",
  //   objectFit: "cover",
  //   objectPosition: "center",
  //   breakpoints: [320, 768, 1024, 1280, 1536, 1920],
  // },
  prefetch: {
    prefetchAll: true,
  },

  experimental: {
    liveContentCollections: true,
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
        defaultLocale: "en",
        locales: {
          en: "en",
        },
      },
    }),
    favicons({
      input: {
        favicons: ["src/assets/favicon.svg"],
      },
      name: "fulldev/ui",
      short_name: "fulldev/ui",
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["devserver-cms-2--fulldev-cms.netlify.app"],
    },
  },
  adapter: netlify(),
})
