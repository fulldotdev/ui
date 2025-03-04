import config from "@/data/config.json"

export function getHref(
  collection:
    | "pages"
    | "articles"
    | "products"
    | "collections"
    | "projects"
    | "persons"
    | "reviews",
  slugOrId: string
) {
  if (collection === "reviews") return undefined
  const collectionSlug = collection === "pages" ? "" : config.slugs[collection]
  const entrySlug = slugOrId === "index" ? "" : slugOrId
  const slug = `/${collectionSlug}/${entrySlug}/`.replace(/\/{2,}/g, "/")
  return slug
}
