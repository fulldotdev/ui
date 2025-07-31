import type { GetImageResult } from "astro"
import type { CollectionEntry } from "astro:content"

import type {
  BlockSchema,
  GlobSchema,
  ImageSchema,
  ItemSchema,
  ReferenceSchema,
} from "@/lib/schemas"
import type { BlockProps, ImageProps, ItemProps, PageProps } from "@/lib/types"

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

function isPublished(publishedDate?: Date): boolean {
  if (!publishedDate) return false
  return publishedDate < new Date()
}

function getHrefByEntry({
  id,
  data,
}: CollectionEntry<"content">): string | undefined {
  if (!isPublished(data.published)) return undefined
  if ("href" in data && data.href) return data.href
  if (id === "index") return "/"
  return `/${id}`
}

function getItemByEntry(entry: CollectionEntry<"content">): ItemSchema {
  return {
    href: getHrefByEntry(entry),
    ...entry.data,
  }
}

// ------------------------------------------------------------
// Transform Functions
// ------------------------------------------------------------

function transformImage(image: ImageSchema): ImageProps {
  const found = context.images.find((img) => img.id === image.src)
  if (!found) return image

  return {
    ...found.attributes,
    ...image,
    src: found.src,
    srcSet: found.srcSet.attribute,
  }
}

function transformReference(reference: ReferenceSchema): ItemProps {
  const slug = reference.replace("/src/content/", "").replace(".md", "")
  const id = slug.replace("/index", "")
  const entry = context.entries.find((entry) => entry.id === id)

  if (!entry) {
    throw new Error(`Entry not found: ${reference}`)
  }

  return getItemByEntry(entry)
}

function transformGlob(glob: GlobSchema): ItemProps[] {
  const filteredEntries = context.entries.filter(
    (entry) => entry.id.startsWith(glob) && !entry.id.endsWith(glob)
  )
  return filteredEntries.map(getItemByEntry)
}

function transformItems(
  items: GlobSchema | ReferenceSchema[] | ItemSchema[]
): ItemProps[] {
  let transformedItems: ItemProps[]

  if (typeof items === "string") {
    transformedItems = transformGlob(items)
  } else if (items.every((item) => typeof item === "string")) {
    transformedItems = items.map(transformReference)
  } else {
    transformedItems = items as ItemSchema[]
  }

  return transformedItems.map((item) => ({
    ...item,
    image: item.image && transformImage(item.image),
    images: item.images?.map(transformImage),
  }))
}

function transformBlock(block: BlockSchema): BlockProps {
  const { image, images, items, ...rest } = block
  return {
    image: image ? transformImage(image) : undefined,
    images: images?.map(transformImage),
    items: items ? transformItems(items) : undefined,
    ...rest,
  }
}

// ------------------------------------------------------------
// Context
// ------------------------------------------------------------

export type TransformContext = {
  entries: CollectionEntry<"content">[]
  images: (GetImageResult & { id: string })[]
}

let context: TransformContext

// ------------------------------------------------------------
// Main Export
// ------------------------------------------------------------

export function transformEntry(
  entry: CollectionEntry<"content">,
  ctx: typeof context
): PageProps {
  context = ctx
  const { id, rendered } = entry
  const { image, images, items, blocks, ...rest } = entry.data

  return {
    id,
    href: getHrefByEntry(entry),
    image: image ? transformImage(image) : undefined,
    images: images?.map(transformImage),
    items: items ? transformItems(items) : undefined,
    blocks: blocks?.map(transformBlock),
    html: rendered?.html,
    ...rest,
  }
}
