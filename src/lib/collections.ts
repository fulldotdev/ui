import { getEntry, type CollectionEntry } from "astro:content"

// Get the href for an entry in the content collection
export function getHrefByEntry({ id, data }: CollectionEntry<"content">) {
  // Only return href if published is true and the entry is not in the future
  const todayDate = new Date()
  const publishedDate = data.published
  const isPublished = publishedDate && publishedDate < todayDate
  if (!isPublished) return undefined
  if (id === "index") return "/"
  return id
}

// Get an entry by path
export async function getEntryByPath(path: string) {
  const collectionAndId = path.split("/src/content/")[1].split(".")[0]
  const collection = collectionAndId.split("/")[0]
  const id = collectionAndId.replace(`${collection}/`, "")
  return await getEntry("content", id)
}

// Transform an entry to an item
export function getItemByEntry(entry: CollectionEntry<"content">) {
  return {
    href: getHrefByEntry(entry),
    ...entry.data,
  }
}
