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
    base: process.env.BASE ?? "/",
    plugins: [styles(style), react(), tailwindcss()],
    define: {
      __STYLE__: JSON.stringify(style),
      // Where the vega build lives; the other styles are in subfolders.
      __GALLERY_ROOT__: JSON.stringify(process.env.GALLERY_ROOT ?? "/"),
    },
    resolve: {
      alias: {
        "@": source,
      },
    },
    build: {
      outDir: process.env.OUT_DIR ?? "dist",
      // Each style builds into its own folder; vega, built first, holds the others.
      emptyOutDir: process.env.STYLE === "vega" || !process.env.STYLE,
      // Keep the gallery small enough to scan: one chunk per demo page.
      chunkSizeWarningLimit: 4096,
    },
    // Demos load on demand; scan them all up front so the dev server does
    // not reload the page when it meets a new dependency.
    optimizeDeps: {
      entries: ["index.html", "gallery/**/*.tsx"],
    },
    server: { strictPort: true },
    logLevel: mode === "production" ? "warn" : "info",
  }
})
