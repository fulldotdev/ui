import { existsSync } from "node:fs"
import { glob } from "astro/loaders"

// Files are URLs. `services.md` and `services/index.md` would both become
// /services/, which Astro's glob loader only warns about, so reject it here.
export const pageLoader = (base = "src/content/pages") => {
  const files = new Map<string, string>()
  return glob({
    base,
    pattern: "**/[^_]*.{md,mdx}",
    generateId: ({ entry, base }) => {
      const id = entry.replace(/\.mdx?$/, "").replace(/\/index$/, "")
      const other = files.get(id)
      if (
        other &&
        other !== entry &&
        existsSync(new URL(encodeURI(other), base))
      )
        throw new Error(
          `Page route collision: "${other}" and "${entry}" both map to "/${id}/".`
        )
      files.set(id, entry)
      return id
    },
  })
}
