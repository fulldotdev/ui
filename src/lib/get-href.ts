import type { CollectionEntry, CollectionKey } from "astro:content"
import cloudcannon from "cloudcannon.config.json"

export function getHref({
  collection,
  id,
  data,
}: CollectionEntry<CollectionKey>) {
  if (data.draft) return undefined
  const collectionConfig = cloudcannon.collections_config[collection]
  if (!collectionConfig) return undefined
  if (!("url" in collectionConfig)) return undefined

  const url = collectionConfig.url
  const entrySlug = id.split(".")[0]
  if (url === null || url === undefined) return undefined

  const href = url.replace("[full_slug]", entrySlug)
  const hrefWithoutIndex = href.replace("/index/", "/")
  const noDoubleSlashes = hrefWithoutIndex.replace(/\/\//g, "/")

  return noDoubleSlashes
}
