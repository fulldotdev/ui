import { getEntry, type CollectionEntry } from "astro:content"

// Get the href for an entry in the content collection
export function getHrefByEntry({ id, data }: CollectionEntry<"content">) {
  // If draft, it should not be visible
  if (data.draft) return undefined
  // If no /, then it's the index of the collection; return the prefix (or home)
  if (!id.includes("/")) return data.prefix || "/"

  const folder = id.split("/")[0]
  const slug = id.replace(`${folder}/`, `${data.prefix || ""}/`)
  const href = slug.replace("/index/", "/").replace(/\/\//g, "/")
  console.log({ id, folder, slug, href })
  return href
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
