import type { CollectionEntry } from "astro:content"

// Find an entry in an array of entries by path
export function findEntryByPath(
  entries: CollectionEntry<"content">[],
  path: string
) {
  const slug = path.split("/src/content/")[1].split(".")[0]
  const id = slug.replace("/index", "")
  const found = entries.find((entry) => entry.id === id)
  return found
}

// Find entries in an array of entries by glob
export function findEntriesByGlob(
  entries: CollectionEntry<"content">[],
  glob: string
) {
  const found = entries.filter((entry) => entry.id.startsWith(glob))
  return found
}

// Get the href for an entry in the content collection
export function getHrefByEntry({ id, data }: CollectionEntry<"content">) {
  const todayDate = new Date()
  const publishedDate = data.published
  const isPublished = publishedDate && publishedDate < todayDate
  if (!isPublished) return undefined
  if (id === "index") return "/"
  return `/${id}`
}
