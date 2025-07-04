import { slugs } from "@/content.config.ts"
import type { CollectionEntry, CollectionKey } from "astro:content"

export function getHref({
  collection,
  id,
  data,
}: CollectionEntry<CollectionKey>) {
  if (data.draft) return undefined

  const slug = slugs[collection]
  if (slug === undefined) return undefined

  const href = `/${slug}/${id}/`
  const hrefWithoutIndex = href.replace("/index/", "/")
  const hrefWithoutDoubleSlashes = hrefWithoutIndex.replace(/\/\//g, "/")
  return hrefWithoutDoubleSlashes
}
