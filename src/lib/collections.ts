import { getEntry, type CollectionEntry } from "astro:content"
import { omit } from "remeda"
import collections from "src/data/collections.json"

const filteredCollections = omit(collections, ["index"])

// Get the href for an entry
export function getHrefByEntry(
  entry: CollectionEntry<keyof typeof filteredCollections>
) {
  if (entry.data.draft) return undefined
  return `/${entry.data.prefix || ""}/${entry.id}/`
    .replace("/index/", "/")
    .replace(/\/\//g, "/")
}

// Get an entry by path
export async function getEntryByPath(path: string) {
  const collectionAndId = path.split("/src/content/")[1].split(".")[0]
  const collection = collectionAndId.split("/")[0]
  const id = collectionAndId.replace(`${collection}/`, "")
  return await getEntry(collection as keyof typeof filteredCollections, id)
}

// Transform an entry to an item
export function getItemByEntry(
  entry: CollectionEntry<keyof typeof filteredCollections>
) {
  return {
    href: getHrefByEntry(entry),
    ...entry.data,
  }
}
