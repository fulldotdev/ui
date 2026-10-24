import { defineConfig, fontProviders } from "astro/config"
import { unified } from "@astrojs/markdown-remark"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import netlifyDev from "@netlify/vite-plugin"
import tailwindcss from "@tailwindcss/vite"
import favicons from "astro-favicons"
import liveCode from "astro-live-code"
import robotsTxt from "astro-robots-txt"

import { inheritCodeColors } from "./src/lib/code"

// Docs tables scroll inside the content column instead of widening the page.
// The wrapper takes focus, so a keyboard can scroll it too.
type Node = { type: string; tagName?: string; children?: Node[] }
const scrollTables = () => (tree: Node) => {
  const wrap = (node: Node) => {
    node.children = node.children?.map((child) => {
      if (child.type === "element" && child.tagName === "table")
        return {
          type: "element",
          tagName: "div",
          properties: { className: ["typeset-scroll"], tabIndex: 0 },
          children: [child],
        } as Node
      wrap(child)
      return child
    })
  }
  wrap(tree)
}

// React previews come from the gallery in react/, at /preview/react/. In
// development its Vite server runs on REACT_PREVIEW_PORT (pnpm --dir react dev).
const reactPreviewPort = process.env.REACT_PREVIEW_PORT ?? "4322"

export default defineConfig({
  site: "https://ui.full.dev",
  // Match the marketing sites: render the first view without a CSS request.
  build: { inlineStylesheets: "always" },
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    routing: {
      fallbackType: "redirect",
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  server: {
    host: "127.0.0.1",
    port: 4321,
  },
  vite: {
    plugins: [tailwindcss(), netlifyDev({ edgeFunctions: { enabled: false } })],
    server: {
      allowedHosts: ["otis.tailb5cb80.ts.net"],
      proxy: {
        "/preview/react/": {
          target: `http://127.0.0.1:${reactPreviewPort}`,
          ws: true,
        },
      },
    },
    // Vite's preview server would inherit the proxy; astro preview serves the
    // built galleries from dist/preview/react/ instead.
    preview: {
      proxy: {},
    },
    // The docs create page imports this; prebundle it so the first dev visit
    // does not trigger a dependency re-optimization.
    optimizeDeps: {
      include: ["shadcn/preset"],
    },
  },
  prefetch: {
    prefetchAll: false,
  },
  devToolbar: {
    enabled: false,
  },
  image: {
    responsiveStyles: true,
    // Widths for images with a layout. Source photos are at most 3840 pixels,
    // so the list ends there; the browser picks one through srcset and sizes.
    breakpoints: [640, 828, 1080, 1280, 1920, 2560, 3840],
  },
  markdown: {
    // astro-live-code adds a remark plugin, which only runs on the unified
    // processor. Astro 7 defaults to Sätteri.
    processor: unified({ rehypePlugins: [scrollTables] }),
    shikiConfig: {
      themes: {
        light: "github-light-high-contrast",
        dark: "github-dark-default",
      },
      transformers: [inheritCodeColors],
    },
  },
  fonts: [
    // Geist 1.7.2 with the stylistic sets of the full.dev
    // websites (fulldotdev/fulldev packages/web/astro.js): ss02 single-storey
    // a, ss03 straight l, ss06 alternate G, ss08 round dots and punctuation.
    {
      provider: fontProviders.local(),
      name: "Geist",
      cssVariable: "--font-sans",
      featureSettings: '"ss02" 1, "ss03" 1, "ss06" 1, "ss08" 1',
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/geist-variable.woff2"],
            weight: "100 900",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/geist-italic-variable.woff2"],
            weight: "100 900",
            style: "italic",
          },
        ],
      },
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist Mono",
      cssVariable: "--font-mono",
    },
  ],
  integrations: [
    robotsTxt(),
    sitemap({
      // The previews in the docs' iframes are not pages for search results.
      filter: (page) => !page.includes("/preview/"),
      changefreq: "weekly",
      lastmod: new Date(),
      i18n: { defaultLocale: "en", locales: { en: "en" } },
    }),
    favicons({
      // The rounded tile with transparent corners for the browser, the
      // full-bleed square for the touch icon that iOS rounds.
      input: {
        favicons: ["src/assets/favicon.svg"],
        android: ["src/assets/favicon.svg"],
        appleIcon: ["src/assets/touch-icon.svg"],
      },
      name: "Fulldev UI",
      short_name: "Fulldev UI",
      // A website, not an app: open in the browser and keep only the icons
      // current browsers use.
      manifest: { display: "browser", display_override: [], start_url: "/" },
      // Keep the head in the order base.astro writes it.
      withCapo: false,
      icons: {
        favicons: true,
        android: ["android-chrome-192x192.png", "android-chrome-512x512.png"],
        appleIcon: ["apple-touch-icon.png"],
        appleStartup: false,
        windows: false,
        yandex: false,
      },
    }),
    liveCode({
      layout: "/src/components/live-code.astro",
    }),
    mdx({ gfm: true }),
  ],
})
