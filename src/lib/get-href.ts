import config from "@/data/config.json"
import type {
  AnyEntryMap,
  CollectionEntry,
  ContentCollectionKey,
} from "astro:content"

export function getHref(collection: keyof AnyEntryMap, slugOrId: string) {
  if (collection === "reviews") return undefined
  const collectionSlug =
    collection === "pages" ? "" : config.content[collection].slug
  const entrySlug = slugOrId === "index" ? "" : slugOrId
  const href = `/${collectionSlug}/${entrySlug}/`.replace(/\/{2,}/g, "/")
  return href
}
