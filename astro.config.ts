import mdx from "@astrojs/mdx"
import starlight from "@astrojs/starlight"
import liveCode from "astro-live-code"
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
        "./src/styles/global.css",
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
})
