import type { CollectionEntry, CollectionKey } from "astro:content"
import config from "fulldev.config.json"

export function getHref({
  collection,
  id,
  data,
}: CollectionEntry<CollectionKey>) {
  if ("draft" in data && data.draft) return undefined

  const slug =
    collection in config && config[collection as keyof typeof config].slug
  if (slug === undefined) return undefined

  const href = `/${slug}/${id}/`
  const hrefWithoutIndex = href.replace("/index/", "/")
  const hrefWithoutDoubleSlashes = hrefWithoutIndex.replace(/\/\//g, "/")
  return hrefWithoutDoubleSlashes
}
