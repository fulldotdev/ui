import { defineConfig, fontProviders } from "astro/config"
import mdx from "@astrojs/mdx"
import liveCode from "astro-live-code"

import fulldevIntegration from "./src/lib/integration"

const redirects = {
  "/docs/components/": "/components/",
  "/docs/components/accordion/": "/components/accordion/",
  "/docs/components/alert/": "/components/alert/",
  "/docs/components/auto-form/": "/components/form/",
  "/docs/components/avatar/": "/components/avatar/",
  "/docs/components/badge/": "/components/badge/",
  "/docs/components/banner/": "/components/banner/",
  "/docs/components/button/": "/components/button/",
  "/docs/components/card/": "/components/card/",
  "/docs/components/checkbox/": "/components/checkbox/",
  "/docs/components/collapsible/": "/components/collapsible/",
  "/docs/components/empty/": "/components/empty/",
  "/docs/components/field/": "/components/field/",
  "/docs/components/footer/": "/components/section/",
  "/docs/components/header/": "/components/header/",
  "/docs/components/icon/": "/components/icon/",
  "/docs/components/image/": "/components/image/",
  "/docs/components/input/": "/components/input/",
  "/docs/components/item/": "/components/item/",
  "/docs/components/label/": "/components/label/",
  "/docs/components/list/": "/components/typography/",
  "/docs/components/logo/": "/components/logo/",
  "/docs/components/marquee/": "/components/marquee/",
  "/docs/components/native-carousel/": "/components/carousel/",
  "/docs/components/native-select/": "/components/native-select/",
  "/docs/components/navigation-menu/": "/components/navigation-menu/",
  "/docs/components/price/": "/components/price/",
  "/docs/components/radio-group/": "/components/radio-group/",
  "/docs/components/rating/": "/components/rating/",
  "/docs/components/section/": "/components/section/",
  "/docs/components/separator/": "/components/separator/",
  "/docs/components/sheet/": "/components/sheet/",
  "/docs/components/sidebar/": "/components/sidebar/",
  "/docs/components/skeleton/": "/components/skeleton/",
  "/docs/components/spinner/": "/components/spinner/",
  "/docs/components/table/": "/components/table/",
  "/docs/components/tabs/": "/components/tabs/",
  "/docs/components/textarea/": "/components/textarea/",
  "/docs/components/theme-toggle/": "/components/theme-toggle/",
  "/docs/components/tile/": "/components/tile/",
  "/docs/components/video/": "/components/video/",
  "/blocks/pricings/": "/blocks/pricing/",
  "/blocks/pricings-1/": "/blocks/pricing-1/",
  "/blocks/pricings-2/": "/blocks/pricing-2/",
  "/blocks/pricings-3/": "/blocks/pricing-3/",
}

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 4321,
  },
  prefetch: {
    prefetchAll: true,
  },
  devToolbar: {
    enabled: false,
  },
  redirects,
  image: {
    breakpoints: [640, 750, 828, 1080, 1280, 1668, 2048, 2560],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Geist",
      cssVariable: "--font-sans",
      weights: ["300 700"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist Mono",
      cssVariable: "--font-mono",
    },
  ],
  integrations: [
    fulldevIntegration({
      site: "https://ui.full.dev",
      name: "Fulldev UI",
      favicon: "src/assets/favicon.svg",
      i18n: {
        defaultLocale: "en",
        locales: ["en"],
      },
    }),
    liveCode({
      layout: "/src/components/live-code.astro",
    }),
    mdx(),
  ],
})
