import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

import { createStyleMaps, transformSource } from "../scripts/styles.mjs"

const source = fileURLToPath(new URL("./src/", import.meta.url))

// Render the cn-* placeholders of the components in one style, the same way
// an install in that style gets them.
function styles(style: string): Plugin {
  const { maps, known } = createStyleMaps((path: string) =>
    readFileSync(new URL(`../registry/styles/${path}`, import.meta.url), "utf8")
  )
  if (!maps[style]) throw new Error(`Unknown style: ${style}`)
  return {
    name: "fulldev-styles",
    enforce: "pre",
    transform(code, id) {
      if (!id.startsWith(source) || !/\.tsx?$/.test(id)) return
      return { code: transformSource(code, maps[style], known), map: null }
    },
  }
}

export default defineConfig(({ mode }) => {
  const style = process.env.STYLE ?? "vega"
  return {
    // The docs site proxies /preview/react/ to the dev server.
    base: process.env.BASE ?? "/preview/react/",
    plugins: [styles(style), react(), tailwindcss()],
    resolve: {
      alias: {
        "@": source,
      },
    },
    build: {
      outDir: process.env.OUT_DIR ?? "dist",
      // Each style builds into its own folder; vega, built first, holds the others.
      emptyOutDir: process.env.STYLE === "vega" || !process.env.STYLE,
      // Icon resolves content names at runtime, so its chunk holds every
      // Simple Icons brand (about 5 MB, 2 MB gzipped).
      chunkSizeWarningLimit: 6144,
    },
    // Demos load on demand; scan them all up front so the dev server does
    // not reload the page when it meets a new dependency.
    optimizeDeps: {
      entries: [
        "index.html",
        "gallery/**/*.tsx",
        "src/components/examples/**/*.tsx",
      ],
    },
    server: { strictPort: true },
    logLevel: mode === "production" ? "warn" : "info",
  }
})
