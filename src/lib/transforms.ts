import { getImage } from "astro:assets"
import { i18n } from "astro:config/server"
import type { CollectionEntry } from "astro:content"
import { getCollection } from "astro:content"
import { title } from "radash"

import type {
  BlockSchema,
  GlobSchema,
  ImageSchema,
  ItemSchema,
  PathSchema,
} from "@/lib/schemas"

// ------------------------------------------------------------
// Data loading
// ------------------------------------------------------------

const pages = await getCollection("pages")
const layouts = await getCollection("layouts")

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

function getHref(page: CollectionEntry<"pages">) {
  if (!page.body && !page.data.blocks && !page.data.block) return
  if (page.data.draft) return
  if (page.id === "index") return "/"
  return `/${page.id}/`
}

// ------------------------------------------------------------
// Translations transforms
// ------------------------------------------------------------

export function transformTranslations({
  id,
  data,
  ...page
}: CollectionEntry<"pages">): CollectionEntry<"pages"> {
  // Get locale strings from i18n config
  const locales = i18n?.locales.map((locale) =>
    typeof locale === "string" ? locale : locale.path
  )
  // Get current locale from page id
  const currentLocale =
    locales?.find((locale) => id.startsWith(`${locale}/`) || id === locale) ||
    i18n?.defaultLocale

  // Get i18n id from the equivalent page in the default locale
  const i18nId =
    id === currentLocale ? "index" : id.replace(`${currentLocale}/`, "")

  // If the i18n id differs from the page id, get it
  const i18nPage =
    id !== i18nId ? pages.find((page) => page.id === i18nId) : undefined

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

  return {
    id,
    ...page,
    data: {
      ...i18nPageDataLocalizedPaths,
      ...data,
    },
  }
}

// ------------------------------------------------------------
// Layouts transforms
// ------------------------------------------------------------

export function transformLayouts({
  id,
  data,
  ...page
}: CollectionEntry<"pages">) {
  const indexLayout = layouts.find((layout) => layout.id === "index")
  const matchingLayouts = layouts.filter((layout) => id.startsWith(layout.id))
  return {
    id,
    ...page,
    data: {
      ...indexLayout?.data,
      ...matchingLayouts.map((layout) => layout.data),
      ...data,
    },
  } as CollectionEntry<"pages">
}

// ------------------------------------------------------------
// Image transforms
// ------------------------------------------------------------

async function transformImage(image?: ImageSchema) {
  if (!image) return

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
    height: generatedResult.attributes.height,
    width: generatedResult.attributes.width,
    src: generatedResult.src + "?format=png",
  }

  return generatedAttributes
}

async function transformImages(images?: ImageSchema[]) {
  if (!images) return
  const transformedImages = await Promise.all(images.map(transformImage))
  return transformedImages.filter((image) => image !== undefined)
}

// ------------------------------------------------------------
// Item transforms
// ------------------------------------------------------------

async function transformItem(item?: ItemSchema) {
  if (!item) return
  const { image, images, ...rest } = item
  return {
    image: await transformImage(image),
    images: await transformImages(images),
    ...rest,
  }
}

async function transformItems(items?: ItemSchema[]) {
  if (!items) return
  const transformedItems = await Promise.all(items?.map(transformItem))
  return transformedItems.filter((item) => item !== undefined)
}

async function transformReferencedPage(page?: CollectionEntry<"pages">) {
  if (!page) return
  const withTranslations = transformTranslations(page)
  const withLayouts = transformLayouts(withTranslations)
  const item = {
    href: getHref(page),
    ...withLayouts.data,
  }
  const transformedItem = transformItem(item)
  return transformedItem
}

async function transformPath(path?: PathSchema) {
  if (!path) return
  const page = pages.find((page) => page.id === path)
  const transformed = await transformReferencedPage(page)
  return transformed
}

async function transformPaths(paths?: PathSchema[]) {
  if (!paths) return
  const transformedPaths = await Promise.all(paths?.map(transformPath))
  return transformedPaths.filter((path) => path !== undefined)
}

async function transformGlob(glob?: GlobSchema) {
  if (!glob) return
  const entries = pages.filter((page) => page.id.startsWith(glob))
  const transformedItems = await Promise.all(
    entries.map(transformReferencedPage)
  )
  return transformedItems.filter((item) => item !== undefined)
}

// ------------------------------------------------------------
// Block transforms
// ------------------------------------------------------------

async function transformBlock(block?: BlockSchema) {
  if (!block) return
  const { image, images, glob, paths, items, ...rest } = block

  const transformedGlob = (await transformGlob(glob)) || []
  const transformedPaths = (await transformPaths(paths)) || []
  const transformedItems = (await transformItems(items)) || []
  const mergedItems = [
    ...transformedItems,
    ...transformedGlob,
    ...transformedPaths,
  ]

  return {
    image: await transformImage(image),
    images: await transformImages(images),
    items: mergedItems,
    ...rest,
  }
}

async function transformBlocks(blocks?: BlockSchema[]) {
  if (!blocks) return
  const transformedBlocks = await Promise.all(blocks?.map(transformBlock))
  return transformedBlocks.filter((block) => block !== undefined)
}

// ------------------------------------------------------------
// Block transforms
// ------------------------------------------------------------

async function transformPage(page: CollectionEntry<"pages">) {
  const withTranslations = transformTranslations(page)
  const withLayouts = transformLayouts(withTranslations)

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
    seo,
    glob = paths ? undefined : page.id,
    ...data
  } = withLayouts.data

  const transformedGlob = (await transformGlob(glob)) || []
  const transformedPaths = (await transformPaths(paths)) || []
  const transformedItems = (await transformItems(items)) || []
  const mergedItems = [
    ...transformedItems,
    ...transformedGlob,
    ...transformedPaths,
  ]

  return {
    ...page,
    data: {
      href: getHref(page),
      image: await transformImage(image),
      images: await transformImages(images),
      items: mergedItems,
      banner: await transformBlock(banner),
      header: await transformBlock(header),
      blocks: await transformBlocks(blocks),
      footer: await transformBlock(footer),
      legal: await transformBlock(legal),
      seo: {
        title: seo?.title || data.title,
        description: seo?.description || data.description,
        image: await transformImage(
          seo?.image || image || images?.[0] || blocks?.[0]?.image
        ),
      },
      ...data,
    },
  }
}

export async function transformPages(pages: CollectionEntry<"pages">[]) {
  return await Promise.all(pages.map(transformPage))
}

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------

export type BlockProps = Awaited<ReturnType<typeof transformBlock>> & {
  children?: React.ReactNode
  index?: number
}

export type PageProps = Awaited<ReturnType<typeof transformPage>>["data"]
