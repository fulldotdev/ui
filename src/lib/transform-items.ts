import { getCollection, type CollectionEntry } from "astro:content"

import { transformHref } from "@/lib/transform-href"
import { transformLayouts } from "@/lib/transform-layouts"

// ------------------------------------------------------------
// Data loading
// ------------------------------------------------------------

const PAGES = await getCollection("pages")

// ------------------------------------------------------------
// Field transforms
// ------------------------------------------------------------

function transformPaths(paths: CollectionEntry<"pages">["data"]["paths"]) {
  if (!paths) return
  const transformedPaths = paths?.map((path) => {
    if (!path) return
    const page = PAGES.find((page) => page.id === path)
    if (!page) return
    const withLayouts = transformLayouts(page)
    const withHref = transformHref(withLayouts)
    return withHref.data
  })
  return transformedPaths.filter((path) => path !== undefined)
}

function transformGlob(glob: CollectionEntry<"pages">["data"]["glob"]) {
  if (!glob) return
  const entries = PAGES.filter((page) => page.id.startsWith(glob))
  const transformedItems = entries.map((entry) => {
    const withLayouts = transformLayouts(entry)
    const withHref = transformHref(withLayouts)
    return withHref.data
  })
  return transformedItems.filter((item) => item !== undefined)
}

// ------------------------------------------------------------
// Block transforms
// ------------------------------------------------------------

function transformBlock(block: CollectionEntry<"pages">["data"]["header"]) {
  if (!block) return

  const transformedGlob = transformGlob(block.glob)
  const transformedPaths = transformPaths(block.paths)

  return {
    ...block,
    items: [
      ...(block.items || []),
      ...(transformedGlob || []),
      ...(transformedPaths || []),
    ],
  }
}

// ------------------------------------------------------------
// Page transforms
// ------------------------------------------------------------

export function transformItems<T extends CollectionEntry<"pages">>(page: T): T {
  const transformedGlob = transformGlob(page.data.glob)
  const transformedPaths = transformPaths(page.data.paths)

  return {
    ...page,
    data: {
      ...page.data,
      banner: transformBlock(page.data.banner),
      header: transformBlock(page.data.header),
      blocks: page.data.blocks?.map(transformBlock),
      footer: transformBlock(page.data.footer),
      legal: transformBlock(page.data.legal),
      items: [
        ...(page.data.items || []),
        ...(transformedGlob || []),
        ...(transformedPaths || []),
      ],
    },
  }
}
