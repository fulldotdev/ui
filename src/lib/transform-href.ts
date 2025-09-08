import type { CollectionEntry } from "astro:content"

export function transformHref<T extends CollectionEntry<"pages">>(page: T): T {
  if (!page.body && !page.data.blocks && !page.data.block) return page
  if (page.data.draft) return page
  if (page.id === "index") return { ...page, data: { href: "/", ...page.data } }
  return { ...page, data: { href: `/${page.id}/`, ...page.data } }
}
