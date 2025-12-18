import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import starlight from "@astrojs/starlight"
import tailwindcss from "@tailwindcss/vite"
import favicons from "astro-favicons"
import liveCode from "astro-live-code"
import robotsTxt from "astro-robots-txt"
import { defineConfig, fontProviders } from "astro/config"

import site from "./site.json"

export default defineConfig({
  site: site.site,
  image: {
    breakpoints: [640, 750, 828, 1080, 1280, 1668, 2048, 2560],
    layout: "full-width",
    responsiveStyles: false,
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
  redirects: {
    // components
    "/docs/customization/": "/docs/theming/",
    "/docs/framworks/": "/docs/introduction/",
    "/docs/structures/": "/docs/section/",
    "/docs/components/badges/": "/docs/components/badge/",
    "/docs/components/channel/": "/docs/components/item/",
    "/docs/components/channels/": "/docs/components/item/",
    "/docs/components/heading/": "/docs/components/prose/",
    "/docs/components/link/": "/docs/components/button/",
    "/docs/components/links/": "/docs/components/button/",
    "/docs/components/menus/": "/docs/components/navigation-menu/",
    "/docs/components/paragraph/": "/docs/components/prose/",
    "/docs/components/social/": "/docs/components/button/",
    "/docs/components/socials/": "/docs/components/button/",
    "/docs/components/switch/": "/docs/components/",
    "/docs/components/tagline/": "/docs/components/prose/",

    // structures
    "/docs/structures/card/": "/docs/components/tile/",
    "/docs/structures/carousel/": "/docs/components/native-carousel/",
    "/docs/structures/code/": "/docs/components/",
    "/docs/structures/container/": "/docs/components/section/",
    "/docs/structures/drawer/": "/docs/components/sheet/",
    "/docs/structures/group/": "/docs/components/section/",
    "/docs/structures/layout/": "/docs/components/section/",
    "/docs/structures/masonry/": "/docs/components/section/",
    "/docs/structures/matrix/": "/docs/components/section/",
    "/docs/structures/panel/": "/docs/components/section/",
    "/docs/structures/prose/": "/docs/components/prose/",
    "/docs/structures/section/": "/docs/components/section/",
    "/docs/structures/sidebar/": "/docs/components/",
    "/docs/structures/split/": "/docs/components/section/",
    "/docs/structures/stack/": "/docs/components/section/",

    // blocks
    "/docs/blocks/banner/": "/blocks/banner/",
    "/docs/blocks/colleagues/": "/blocks/",
    "/docs/blocks/content/": "/blocks/content/",
    "/docs/blocks/cta/": "/blocks/cta/",
    "/docs/blocks/features/": "/blocks/features/",
    "/docs/blocks/footer/": "/blocks/footer/",
    "/docs/blocks/header/": "/blocks/header/",
    "/docs/blocks/hero/": "/blocks/hero/",
    "/docs/blocks/intro/": "/blocks/hero/",
    "/docs/blocks/logos/": "/blocks/logos/",
    "/docs/blocks/reviews/": "/blocks/reviews/",
    "/docs/blocks/projects/": "/blocks/services/",
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
    starlight({
      title: site.name,
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
        "./src/styles/global.css",
        "@fontsource/inter/400.css",
        "@fontsource/inter/500.css",
        "@fontsource/inter/600.css",
        "@fontsource/inter/700.css",
        "@fontsource/inter/800.css",
      ],
      components: {
        SiteTitle: "/src/components/starlight-title.astro",
        ThemeSelect: "/src/components/starlight-icons.astro",
        MarkdownContent: "/src/components/starlight-markdown-content.astro",
      },
    }),
    liveCode({
      layout: "/src/components/live-code-layout.astro",
    }),
    mdx(),
  ],
})
