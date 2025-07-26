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
  const found = entries.filter(
    (entry) => entry.id.startsWith(glob) && !entry.id.endsWith(glob)
  )
  return found
}

// Get the href for an entry in the content collection
export function getHrefByEntry({ id, data }: CollectionEntry<"content">) {
  // Check if the entry is published
  const todayDate = new Date()
  const publishedDate = data.published
  const isPublished = publishedDate && publishedDate < todayDate
  if (!isPublished) return undefined

  // If the href is overriden, return the href
  if ("href" in data && data.href) return data.href

  // If the id is the index, return the home page href
  if (id === "index") return "/"

  // Else return the id
  return `/${id}/`
}
