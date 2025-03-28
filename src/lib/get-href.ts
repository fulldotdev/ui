import { type CollectionEntry } from "astro:content"

import { getSlug } from "./get-slug"

export function getHref(page: CollectionEntry<"pages">) {
  const slug = getSlug(page)
  return slug ? `/${slug}/` : `/`
}
