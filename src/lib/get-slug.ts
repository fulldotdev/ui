import { type CollectionEntry } from "astro:content"

export function getSlug(page: CollectionEntry<"pages">) {
  if (page.data.slug) return page.data.slug
  if (page.id === "index") return undefined
  if (page.id === "home") return undefined
  return page.id
}
