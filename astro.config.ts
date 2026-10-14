import { defineConfig, fontProviders } from "astro/config"
import { unified } from "@astrojs/markdown-remark"
import mdx from "@astrojs/mdx"
import liveCode from "astro-live-code"

import fulldevIntegration from "./src/lib/integration"

// Docs tables scroll inside the content column instead of widening the page.
type Node = { type: string; tagName?: string; children?: Node[] }
const scrollTables = () => (tree: Node) => {
  const wrap = (node: Node) => {
    node.children = node.children?.map((child) => {
      if (child.type === "element" && child.tagName === "table")
        return {
          type: "element",
          tagName: "div",
          properties: { className: ["typeset-scroll"] },
          children: [child],
        } as Node
      wrap(child)
      return child
    })
  }
  wrap(tree)
}

// React previews come from the gallery in react/, at /preview/react/. In
// development its Vite server runs on REACT_PREVIEW_PORT (pnpm dev:react).
const reactPreviewPort = process.env.REACT_PREVIEW_PORT ?? "4322"

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 4321,
  },
  vite: {
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
    prefetchAll: true,
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
    },
  },
  fonts: [
    // EXPERIMENT: Geist 1.7.2 with the stylistic sets of the full.dev
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
    mdx({ gfm: true }),
  ],
})
