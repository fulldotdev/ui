import mdx from "@astrojs/mdx"
import netlify from "@astrojs/netlify"
import sitemap from "@astrojs/sitemap"
import starlight from "@astrojs/starlight"
import tailwindcss from "@tailwindcss/vite"
import favicons from "astro-favicons"
import liveCode from "astro-live-code"
import robotsTxt from "astro-robots-txt"
import { defineConfig, envField, fontProviders } from "astro/config"

export default defineConfig({
  output: "static",
  site: "https://ui.full.dev",
  // i18n: {
  //   defaultLocale: "en",
  //   locales: ["en"],
  //   routing: {
  //     prefixDefaultLocale: false,
  //     redirectToDefaultLocale: false,
  //     fallbackType: "redirect",
  //   },
  // },
  image: {
    responsiveStyles: true,
    breakpoints: [640, 750, 828, 1080, 1280, 1668, 2048, 2560],
  },
  prefetch: {
    prefetchAll: true,
  },
  devToolbar: {
    enabled: false,
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
    starlight({
      title: "fulldev/ui",
      description:
        "The Astro UI component and block library for content-driven websites.",
      sidebar: [
        {
          label: "Get started",
          items: ["docs", "docs/installation", "docs/theming"],
        },
        {
          label: "Components",
          autogenerate: { directory: "docs/components" },
        },
      ],
      customCss: [
        "./src/styles/globals.css",
        "@fontsource/geist/400.css",
        "@fontsource/geist/500.css",
        "@fontsource/geist/600.css",
      ],
      components: {
        SiteTitle: "/src/components/starlight-title.astro",
        ThemeSelect: "/src/components/starlight-icons.astro",
        ThemeProvider:
          "/src/components/ui/mode-toggle/mode-toggle-provider.astro",
      },
    }),
    liveCode({
      layout: "/src/components/live-code-layout.astro",
    }),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
    // server: {
    //   allowedHosts: ["devserver-cms-2--fulldev-cms.netlify.app"],
    // },
  },
  // adapter: netlify(),
})
