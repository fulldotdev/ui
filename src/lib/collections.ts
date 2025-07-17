import { getEntry, type CollectionEntry } from "astro:content"
import config from "collections.json"

// Get the href for an entry
export function getHrefByEntry(entry: CollectionEntry<keyof typeof config>) {
  const { prefix } = config[entry.collection as keyof typeof config]
  if (entry.data.draft) return undefined
  return `/${prefix}/${entry.id}/`.replace("/index/", "/").replace(/\/\//g, "/")
}

// Get an entry by path
export async function getEntryByPath(path: string) {
  const collectionAndId = path.split("/src/content/")[1].split(".")[0]
  const collection = collectionAndId.split("/")[0]
  const id = collectionAndId.replace(`${collection}/`, "")
  return await getEntry(collection as keyof typeof config, id)
}

// Transform an entry to an item
export function getItemByEntry(entry: CollectionEntry<keyof typeof config>) {
  return {
    href: getHrefByEntry(entry),
    ...entry.data,
  }
}
