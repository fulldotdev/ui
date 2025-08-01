import { getImage } from "astro:assets"
import { i18n } from "astro:config/server"
import type { CollectionEntry } from "astro:content"
import { getCollection } from "astro:content"

import type {
  BlockSchema,
  GlobSchema,
  ImageSchema,
  ItemSchema,
  ReferenceSchema,
} from "@/lib/schemas"
import type { BlockProps, PageProps } from "@/lib/types"

// ------------------------------------------------------------
// Data Loading
// ------------------------------------------------------------
const content = await getCollection("content")
const imageImports = import.meta.glob("/src/images/**", { eager: true })
const images = await Promise.all(
  Object.entries(imageImports).map(async ([key, image]: any) => {
    const metadata = image.default
    const generated = await getImage({
      src: metadata,
      format: "webp",
      sizes: "100vw",
      widths: [320, 480, 768, 1024, 1440, 1920],
      quality: "mid",
    })
    return {
      id: key.replace("/src/images", ""),
      ...generated,
    }
  })
)

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

function getHrefById(id: string) {
  if (id === "index") return "/"
  return `/${id}`
}

function getEntryByReference(reference: ReferenceSchema) {
  const entry = content.find((entry) => {
    if (!entry.filePath) throw new Error(`Entry not found: ${reference}`)
    return reference.endsWith(entry.filePath)
  })

  if (!entry) {
    throw new Error(`Entry not found: ${reference}`)
  }

  return entry
}

function getEntriesByGlob(glob: GlobSchema) {
  const entries = content.filter(
    (entry) => entry.id.startsWith(glob) && !entry.id.endsWith(glob)
  )

  return entries
}

function getItemByEntry(entry: CollectionEntry<"content">) {
  return {
    href: getHrefById(entry.id),
    ...entry.data,
  }
}

// ------------------------------------------------------------
// Transform Functions
// ------------------------------------------------------------

function transformImage(image: ImageSchema) {
  const found = images.find((img) => img.id === image.src)

  return {
    fetchPriority: "auto",
    decoding: "async",
    loading: "lazy",
    height: found?.attributes.height,
    width: found?.attributes.width,
    sizes: found?.attributes.sizes,
    alt: image.alt,
    title: image.title,
    src: found?.src || image.src,
    srcSet: found?.srcSet.attribute,
  }
}

function transformItems(items: GlobSchema | ReferenceSchema[] | ItemSchema[]) {
  let transformedItems

  // glob: string
  if (typeof items === "string") {
    const entries = getEntriesByGlob(items)
    return entries.map(getItemByEntry)
  }

  // references: string[]
  if (items.every((item) => typeof item === "string")) {
    transformedItems = items.map((item) => {
      const entry = getEntryByReference(item)
      return getItemByEntry(entry)
    })
  }

  // items: object[]
  else {
    transformedItems = items
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
// Main Export
// ------------------------------------------------------------

export function transformPage(page: CollectionEntry<"pages">): PageProps {
  const { id, filePath, rendered } = page

  const layout = page.data.layout
    ? getEntryByReference(page.data.layout)
    : undefined

  const currentLocale = i18n?.locales.find(
    (locale) =>
      typeof locale === "string" &&
      (page.id === locale || page.id.startsWith(`${locale}/`))
  ) as string | undefined

  const baseLocaleReference = currentLocale && id.replace(currentLocale, "")
  const baseLocalePage = content.find(
    (entry) => entry.id === baseLocaleReference
  )

  console.log({
    id,
    currentLocale,
    baseLocaleReference,
    baseLocalePage,
  })

  const mergedData = {
    ...layout?.data,
    ...baseLocalePage?.data,
    ...page.data,
  }

  const {
    image,
    images,
    items,
    banner,
    header,
    blocks,
    footer,
    legal,
    ...rest
  } = mergedData

  return {
    id,
    href: id === "index" ? "/" : `/${id}`,
    html: rendered?.html,
    image: image ? transformImage(image) : undefined,
    images: images?.map(transformImage),
    items: items ? transformItems(items) : undefined,
    banner: banner ? transformBlock(banner) : undefined,
    header: header ? transformBlock(header) : undefined,
    footer: footer ? transformBlock(footer) : undefined,
    legal: legal ? transformBlock(legal) : undefined,
    blocks: blocks?.map(transformBlock),
    ...rest,
  }
}
