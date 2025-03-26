import type { BlockSchema } from "@/schemas/block"
import type { ItemSchema } from "@/schemas/item"
import type { PageSchema } from "@/schemas/page"
import { getEntry, type CollectionEntry } from "astro:content"

import {
  astroLayoutSchema,
  astroPageSchema,
  type AstroBlockSchema,
  type AstroItemSchema,
  type AstroLayoutSchema,
  type AstroPageSchema,
} from "./schemas"

// --------------------------------------------------------------------------
// Item
// --------------------------------------------------------------------------

async function transformAstroItem(item: AstroItemSchema): Promise<ItemSchema> {
  if ("collection" in item && "id" in item) {
    const entry = await getEntry(item)
    return entry?.data || {}
  }
  return item
}

// --------------------------------------------------------------------------
// Block
// --------------------------------------------------------------------------

async function transformAstroBlock({
  items,
  ...block
}: AstroBlockSchema): Promise<BlockSchema> {
  return {
    ...block,
    items: items && (await Promise.all(items.map(transformAstroItem))),
  }
}

// --------------------------------------------------------------------------
// Layout
// --------------------------------------------------------------------------

export async function transformAstroLayout({
  banner,
  header,
  footer,
  ...data
}: AstroLayoutSchema): Promise<PageSchema> {
  return {
    ...data,
    banner: banner && (await transformAstroBlock(banner)),
    header: header && (await transformAstroBlock(header)),
    footer: footer && (await transformAstroBlock(footer)),
  }
}

// --------------------------------------------------------------------------
// Page
// --------------------------------------------------------------------------

export async function transformAstroPage({
  id,
  body,
  data: { items, sections, ...data },
}: {
  id: string
  body: string
  data: AstroPageSchema
}): Promise<PageSchema> {
  return {
    id: id,
    slug: id,
    items: items && (await Promise.all(items.map(transformAstroItem))),
    sections:
      sections && (await Promise.all(sections.map(transformAstroBlock))),
    ...data,
    content: 
  }
}
