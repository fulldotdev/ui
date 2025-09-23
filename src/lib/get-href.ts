import type { CollectionEntry } from "astro:content"

export function getHref({
  collection,
  id,
}: CollectionEntry<
  | "pages"
  | "articles"
  | "blogs"
  | "products"
  | "collections"
  | "persons"
  | "reviews"
  | "blocks"
  | "jobs"
  | "services"
>) {
  switch (collection) {
    case "pages":
      return id === "index" ? "/" : `/${id}/`
    case "articles":
      return `/articles/${id}/`
    case "blogs":
      return `/blogs/${id}/`
    case "products":
      return `/products/${id}/`
    case "collections":
      return `/collections/${id}/`
    case "persons":
      return `/persons/${id}/`
    case "reviews":
      return `/reviews/${id}/`
    case "blocks":
      return `/blocks/${id}/`
    case "jobs":
      return `/jobs/${id}/`
    case "services":
      return `/services/${id}/`
    default:
      return undefined
  }
}
