import { getCollection, type CollectionEntry } from "astro:content"

// ------------------------------------------------------------
// Data loading
// ------------------------------------------------------------

const LAYOUTS = await getCollection("layouts")

// ------------------------------------------------------------
// Page transforms
// ------------------------------------------------------------

export function transformLayouts<T extends CollectionEntry<"pages">>(
  page: T
): T {
  const indexLayout = LAYOUTS.find((layout) => layout.id === "index")
  const matchingLayouts = LAYOUTS.filter((layout) =>
    page.id.startsWith(layout.id)
  )
  return {
    ...page,
    data: {
      ...indexLayout?.data,
      ...matchingLayouts.map((layout) => layout.data),
      ...page.data,
    },
  }
}
