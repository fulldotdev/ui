import mdx from "@astrojs/mdx"
import starlight from "@astrojs/starlight"
import liveCode from "astro-live-code"
import { defineConfig } from "astro/config"

import fulldevIntegration from "./src/lib/integration"

export default defineConfig({
  image: {
    breakpoints: [640, 750, 828, 1080, 1280, 1668, 2048, 2560],
  },
  prefetch: {
    prefetchAll: true,
  },
  devToolbar: {
    enabled: false,
  },
  redirects: {
    // components
    "/docs/customization": "/docs/theming/",
    "/docs/framworks": "/docs/introduction/",
    "/docs/structures": "/docs/section/",
    "/docs/components/badges": "/docs/components/badge/",
    "/docs/components/channel": "/docs/components/item/",
    "/docs/components/channels": "/docs/components/item/",
    "/docs/components/heading": "/docs/components/section/",
    "/docs/components/link": "/docs/components/button/",
    "/docs/components/links": "/docs/components/button/",
    "/docs/components/menus": "/docs/components/navigation-menu/",
    "/docs/components/paragraph": "/docs/components/section/",
    "/docs/components/social": "/docs/components/button/",
    "/docs/components/socials": "/docs/components/button/",
    "/docs/components/switch": "/docs/components/",
    "/docs/components/tagline": "/docs/components/section/",

    // structures
    "/docs/structures/card": "/docs/components/tile/",
    "/docs/structures/carousel": "/docs/components/native-carousel/",
    "/docs/structures/code": "/docs/components/",
    "/docs/structures/container": "/docs/components/section/",
    "/docs/structures/drawer": "/docs/components/sheet/",
    "/docs/structures/group": "/docs/components/section/",
    "/docs/structures/layout": "/docs/components/section/",
    "/docs/structures/masonry": "/docs/components/section/",
    "/docs/structures/matrix": "/docs/components/section/",
    "/docs/structures/panel": "/docs/components/section/",
    "/docs/structures/prose": "/docs/components/section/",
    "/docs/structures/section": "/docs/components/section/",
    "/docs/structures/sidebar": "/docs/components/",
    "/docs/structures/split": "/docs/components/section/",
    "/docs/structures/stack": "/docs/components/section/",

    // blocks
    "/docs/blocks/banner": "/blocks/banner/",
    "/docs/blocks/colleagues": "/blocks/",
    "/docs/blocks/content": "/blocks/content/",
    "/docs/blocks/cta": "/blocks/cta/",
    "/docs/blocks/features": "/blocks/features/",
    "/docs/blocks/footer": "/blocks/footer/",
    "/docs/blocks/header": "/blocks/header/",
    "/docs/blocks/hero": "/blocks/hero/",
    "/docs/blocks/intro": "/blocks/hero/",
    "/docs/blocks/logos": "/blocks/logos/",
    "/docs/blocks/reviews": "/blocks/reviews/",
    "/docs/blocks/projects": "/blocks/services/",
  },
  integrations: [
    fulldevIntegration({
      site: "https://ui.full.dev",
      name: "Fulldev UI",
      favicon: "src/assets/logo-fulldev-mark-light.svg",
      fonts: {
        sans: "Geist",
        mono: "Geist Mono",
      },
      i18n: {
        defaultLocale: "en",
        locales: ["en"],
      },
    }),
    starlight({
      title: "Fulldev UI",
      description:
        "The Astro UI component and block library for content-driven websites.",
      sidebar: [
        {
          label: "Get started",
          items: [
            "docs",
            "docs/installation",
            "docs/theming",
            {
              label: "Blocks",
              link: "/blocks/",
            },
          ],
        },
        {
          label: "Components",
          autogenerate: { directory: "docs/components" },
        },
      ],
      customCss: ["./src/styles/global.css"],
      components: {
        SiteTitle: "/src/components/starlight-title.astro",
        ThemeSelect: "/src/components/starlight-icons.astro",
        MarkdownContent: "/src/components/starlight-markdown-content.astro",
        ThemeProvider: "/src/components/ui/theme-toggle/theme-provider.astro",
      },
    }),
    mdx(),
    liveCode({
      layout: "/src/components/live-code-layout.astro",
    }),
  ],
})
