import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

import { createStyleMaps, transformSource } from "../scripts/styles.mjs"

const source = fileURLToPath(new URL("./src/", import.meta.url))
// The transformed sources of one style. Tailwind reads the files on disk, so
// it only sees the classes the placeholders become through this file, which
// src/styles/globals.css adds with @source.
const classes = new URL(
  "./node_modules/.cache/fulldev-gallery/",
  import.meta.url
)

// Render the cn-* placeholders of the components in one style, the same way
// an install in that style gets them.
function styles(style: string): Plugin {
  const { maps, known } = createStyleMaps((path: string) =>
    readFileSync(new URL(`../registry/styles/${path}`, import.meta.url), "utf8")
  )
  if (!maps[style]) throw new Error(`Unknown style: ${style}`)
  // Translucent menus take these classes in the browser, see gallery/preset.ts.
  const translucent = maps[style]["cn-menu-translucent"] ?? ""
  const writeClasses = () => {
    const transformed = readdirSync(source, { recursive: true })
      .filter((path) => /\.tsx?$/.test(String(path)))
      .sort()
      .map((path) =>
        transformSource(
          readFileSync(source + String(path), "utf8"),
          maps[style],
          known,
          style
        )
      )
    mkdirSync(classes, { recursive: true })
    writeFileSync(
      new URL("classes.txt", classes),
      [...transformed, translucent].join("\n")
    )
  }
  writeClasses()
  return {
    name: "fulldev-styles",
    enforce: "pre",
    config: () => ({
      define: { __MENU_TRANSLUCENT__: JSON.stringify(translucent) },
    }),
    watchChange(id) {
      if (id.startsWith(source) && /\.tsx?$/.test(id)) writeClasses()
    },
    transform(code, id) {
      if (!id.startsWith(source) || !/\.tsx?$/.test(id)) return
      return {
        code: transformSource(code, maps[style], known, style),
        map: null,
      }
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
      entries: ["index.html", "gallery/**/*.tsx"],
    },
    server: { strictPort: true },
    logLevel: mode === "production" ? "warn" : "info",
  }
})
