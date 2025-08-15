import { getImage } from "astro:assets"
import { i18n } from "astro:config/server"
import type { CollectionEntry } from "astro:content"
import { getCollection } from "astro:content"
import { title } from "radash"

import type { BlockSchema, GlobSchema, ItemSchema } from "@/lib/schemas"
import type { PageProps } from "@/lib/types"

// ------------------------------------------------------------
// Data loading
// ------------------------------------------------------------

const pages = await getCollection("pages")
const layouts = await getCollection("layouts")

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

export function getHref(page: CollectionEntry<"pages">) {
  if (!page.body && !page.data.blocks && !page.data.block) return
  if (page.data.draft) return
  if (page.id === "index") return "/"
  return `/${page.id}/`
}

function getEntry(collections: "pages" | "layouts", id: string) {
  return collections === "pages"
    ? pages.find((page) => page.id === id)
    : layouts.find((layout) => layout.id === id)
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
  const i18nPage = page.id !== i18nId ? getEntry("pages", i18nId) : undefined

  const i18nPageDataLocalizedPaths = {
    ...i18nPage?.data,
    paths: i18nPage?.data.paths?.map((path) =>
      path.replace(`/pages/`, `/pages/${currentLocale}/`)
    ),
    blocks: i18nPage?.data.blocks?.map((block) => ({
      ...block,
      paths: block.paths?.map((path) =>
        path.replace(`/pages/`, `pages/${currentLocale}/`)
      ),
    })),
  }

  // Get layout for current locale
  const layout = currentLocale ? getEntry("layouts", currentLocale) : undefined

  // Merge all data
  const mergedData = {
    ...layout?.data,
    ...i18nPageDataLocalizedPaths,
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
  const baseAttributes = {
    src: image.src,
    height: image.height,
    width: image.width,
    fetchPriority: "auto",
    decoding: "async",
    loading: "lazy",
    alt: title(image.src.split(".")[0].split("/").pop() || ""),
  }

  if (import.meta.env.DEV) {
    return baseAttributes
  }

  const generatedResult = await getImage({
    src: image,
    format: "webp",
    sizes: "100vw",
    widths: [320, 480, 768, 1024, 1440, 1920],
    quality: "mid",
  })

  const generatedAttributes = {
    ...baseAttributes,
    height: generatedResult.attributes.height,
    width: generatedResult.attributes.width,
    sizes: generatedResult.attributes.sizes,
    src: generatedResult.src,
    srcSet: generatedResult.srcSet.attribute,
  }

  return generatedAttributes
}

async function transformSeoImage(image: ImageMetadata) {
  const baseAttributes = {
    src: image.src,
    height: image.height,
    width: image.width,
    fetchPriority: "auto",
    decoding: "async",
    loading: "lazy",
    alt: title(image.src.split(".")[0].split("/").pop() || ""),
  }

  if (import.meta.env.DEV) {
    return baseAttributes
  }

  const generatedResult = await getImage({
    src: image,
    format: "png",
    width: 600,
    height: 315,
    fit: "cover",
    position: "center",
    quality: 75,
  })

  const generatedAttributes = {
    ...baseAttributes,
    height: generatedResult.attributes.height,
    width: generatedResult.attributes.width,
    src: generatedResult.src + "?format=png",
  }

  return generatedAttributes
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
  // TODO: support other collections
  const slug = path.split("/pages/").pop()?.split(".")[0]
  const id = slug?.replace("/index", "")
  const page = id && getEntry("pages", id)
  if (!page) return

  const mergedPage = await mergePage(page as CollectionEntry<"pages">)

  const item = {
    href: getHref(mergedPage),
    ...mergedPage.data,
  }

  return await transformItem(item)
}

export async function transformPaths(
  paths: Parameters<typeof transformPath>[0][]
) {
  return (await Promise.all(paths.map((path) => transformPath(path)))).filter(
    (item) => item !== undefined
  )
}

export async function transformGlob(glob: GlobSchema) {
  const entries = pages.filter(
    (page) => page.id.startsWith(glob) && page.id !== glob
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
    blocks,
    banner,
    header,
    footer,
    legal,
    paths,
    items,
    glob = paths ? undefined : page.id,
    seo,
    ...rest
  } = mergedPage.data

  const transformedGlob = glob ? await transformGlob(glob) : []
  const transformedPaths = paths ? await transformPaths(paths) : []
  const transformedItems = items ? await transformItems(items) : []
  const mergedItems = [
    ...transformedItems,
    ...transformedGlob,
    ...transformedPaths,
  ]
  return {
    ...page,
    data: {
      href: getHref(mergedPage),
      image: image ? await transformImage(image) : undefined,
      images: images ? await transformImages(images) : undefined,
      items: mergedItems,
      banner: banner ? await transformBlock(banner) : undefined,
      header: header ? await transformBlock(header) : undefined,
      blocks: blocks ? await transformBlocks(blocks) : undefined,
      footer: footer ? await transformBlock(footer) : undefined,
      legal: legal ? await transformBlock(legal) : undefined,
      seo: {
        ...seo,
        image:
          seo?.image || image
            ? await transformSeoImage(seo?.image || image)
            : undefined,
      },
      ...rest,
    } satisfies PageProps,
  }
}

export async function transformPages(pages: CollectionEntry<"pages">[]) {
  return await Promise.all(pages.map(transformPage))
}
