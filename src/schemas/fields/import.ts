import { z } from "astro:content"

export const importSchema = z.string().transform(async (path) => {
  const allEntries = import.meta.glob("src/content/**/*.{md,mdx}")

  const foundKey = Object.keys(allEntries).find((key) => key.endsWith(path))
  if (!foundKey) return path

  const foundValue = allEntries[foundKey]
  if (!foundValue) return path

  const loadedFile = await foundValue()
  if (!loadedFile) return path
  if (typeof loadedFile !== "object") return path
  if (!("frontmatter" in loadedFile)) return path
  return loadedFile.frontmatter
})
