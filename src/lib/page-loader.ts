import { existsSync } from "node:fs"
import { glob } from "astro/loaders"
import type { Loader } from "astro/loaders"

export function pageLoader(base = "src/content/pages"): Loader {
  const paths = new Map<string, string>()
  const loader = glob({
    base,
    pattern: "**/[^_]*.{md,mdx}",
    generateId: ({ entry, data, base }) => {
      if ("slug" in data)
        throw new Error(
          `Remove the slug override in "${entry}". Page URLs are determined by file paths.`
        )
      const id = entry.replace(/\.(md|mdx)$/, "").replace(/\/index$/, "")
      if (/[?#%\\\s]/.test(id))
        throw new Error(
          `Invalid page path "${entry}". Use URL-safe file names.`
        )
      const previous = paths.get(id)
      if (
        previous &&
        previous !== entry &&
        existsSync(new URL(encodeURI(previous), base))
      )
        throw new Error(
          `Page route collision: "${previous}" and "${entry}" both map to "${id}".`
        )
      paths.set(id, entry)
      return id
    },
  })
  return {
    ...loader,
    name: "pages",
    async load(context) {
      paths.clear()
      await loader.load(context)
    },
  }
}
