import type { CollectionEntry } from "astro:content"

export function getHref({ collection, id }: CollectionEntry<"pages">) {
  switch (collection) {
    case "pages":
      return id === "index" ? "/" : `/${id}/`
    default:
      return undefined
  }
}
