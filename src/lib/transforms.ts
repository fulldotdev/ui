import { getImage } from "astro:assets"
import { i18n } from "astro:config/server"
import type { CollectionEntry } from "astro:content"
import { getCollection, getEntry } from "astro:content"
import { title } from "radash"

import type { BlockSchema, GlobSchema, ItemSchema } from "@/lib/schemas"

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

export function getHref(page: CollectionEntry<"pages">) {
  if (!page.body && !page.data.blocks) return
  if (page.data.draft) return
  if (page.id === "index") return "/"
  return `/${page.id}`
}

async function mergePage(page: CollectionEntry<"pages">) {
  // Get locale strings from i18n config
  const locales = i18n?.locales.map((locale) =>
    typeof locale === "string" ? locale : locale.path
  )

  // Get current locale from page id
  const currentLocale =
    locales?.find(
      (locale) => page.id.startsWith(`${locale}/`) || page.id === locale
    ) || i18n?.defaultLocale

  // Get i18n id from the equivalent page in the default locale
  const i18nId =
    page.id === currentLocale
      ? "index"
      : page.id.replace(`${currentLocale}/`, "")

  // If the i18n id differs from the page id, get it
  const i18nPage =
    page.id !== i18nId ? await getEntry("pages", i18nId) : undefined

  // Get layout for current locale
  const layout = currentLocale
    ? await getEntry("layouts", currentLocale)
    : undefined

  // Merge all data
  const mergedData = {
    ...layout?.data,
    ...i18nPage?.data,
    ...page.data,
  }

  return {
    ...page,
    data: mergedData,
  }
}

// ------------------------------------------------------------
// Transforms level 1
// ------------------------------------------------------------

async function transformImage(image: ImageMetadata) {
  const generated = await getImage({
    src: image,
    format: "webp",
    sizes: "100vw",
    widths: [320, 480, 768, 1024, 1440, 1920],
    quality: "mid",
  })

  return {
    alt: title(image.src.split(".")[0]),
    height: generated.attributes.height,
    width: generated.attributes.width,
    sizes: generated.attributes.sizes,
    src: generated.src,
    srcSet: generated.srcSet.attribute,
    fetchPriority: "auto",
    decoding: "async",
    loading: "lazy",
  }
}

async function transformImages(images: ImageMetadata[]) {
  return await Promise.all(images?.map(transformImage))
}

async function transformItem(item: ItemSchema) {
  const { image, images, ...rest } = item
  return {
    image: image ? await transformImage(image) : undefined,
    images: images ? await transformImages(images) : undefined,
    ...rest,
  }
}

async function transformItems(items: ItemSchema[]) {
  return await Promise.all(items.map(transformItem))
}

// ------------------------------------------------------------
// Transforms level 2
// ------------------------------------------------------------

export async function transformPath(path: string) {
  const pages = await getCollection("pages")
  const page = pages.find(
    (entry) => entry.filePath && path?.endsWith(entry.filePath)
  )

  if (!page) {
    throw new Error(`Entry with path ${path} not found`)
  }

  const mergedPage = await mergePage(page)

  const item = {
    href: getHref(mergedPage),
    ...mergedPage.data,
  }

  return await transformItem(item)
}

export async function transformPaths(
  paths: Parameters<typeof transformPath>[0][]
) {
  return await Promise.all(paths.map((path) => transformPath(path)))
}

export async function transformGlob(glob: GlobSchema) {
  const entries = await getCollection("pages", (page) =>
    page.id.startsWith(glob)
  )

  const items = await Promise.all(
    entries.map(async (entry) => {
      const mergedPage = await mergePage(entry)
      return {
        href: getHref(mergedPage),
        ...mergedPage.data,
      }
    })
  )

  return await transformItems(items)
}

// ------------------------------------------------------------
// Transforms level 3
// ------------------------------------------------------------

async function transformBlock(block: BlockSchema) {
  const { image, images, glob, paths, items, ...rest } = block

  const transformedImage = image ? await transformImage(image) : undefined
  const transformedImages = images ? await transformImages(images) : undefined
  const transformedGlob = glob ? await transformGlob(glob) : []
  const transformedPaths = paths ? await transformPaths(paths) : []
  const transformedItems = items ? await transformItems(items) : []
  const mergedItems = [
    ...transformedItems,
    ...transformedGlob,
    ...transformedPaths,
  ]

  return {
    image: transformedImage,
    images: transformedImages,
    items: mergedItems,
    ...rest,
  }
}

async function transformBlocks(blocks: BlockSchema[]) {
  return await Promise.all(blocks.map(transformBlock))
}

// ------------------------------------------------------------
// Main export
// ------------------------------------------------------------

export async function transformPage(page: CollectionEntry<"pages">) {
  const mergedPage = await mergePage(page)
  const {
    image,
    images,
    items,
    blocks,
    banner,
    header,
    footer,
    legal,
    ...rest
  } = mergedPage.data
  return {
    ...page,
    data: {
      href: getHref(mergedPage),
      image: image ? await transformImage(image) : undefined,
      images: images ? await transformImages(images) : undefined,
      items: items ? await transformItems(items) : undefined,
      banner: banner ? await transformBlock(banner) : undefined,
      header: header ? await transformBlock(header) : undefined,
      blocks: blocks ? await transformBlocks(blocks) : undefined,
      footer: footer ? await transformBlock(footer) : undefined,
      legal: legal ? await transformBlock(legal) : undefined,
      ...rest,
    },
  }
}

export async function transformPages(pages: CollectionEntry<"pages">[]) {
  return await Promise.all(pages.map(transformPage))
}
