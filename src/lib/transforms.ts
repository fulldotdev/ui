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
import type { BlockProps, ImageProps, ItemProps, PageProps } from "@/lib/types"

// ------------------------------------------------------------
// Data loading
// ------------------------------------------------------------

const pages = await getCollection("pages")

const layouts = await getCollection("layouts")

const imagesMeta = import.meta.glob("src/assets/**/*", {
  eager: true,
}) as Record<string, { default: ImageMetadata }>
const images = await Promise.all(
  Object.values(imagesMeta).map(async (image) => {
    const generated = await getImage({
      src: image.default,
      format: "webp",
      sizes: "100vw",
      widths: [320, 480, 768, 1024, 1440, 1920],
      quality: "mid",
    })

    const attributes = {
      inputSrc: (generated.options.src as ImageMetadata).src,
      fetchPriority: "auto",
      decoding: "async",
      loading: "lazy",
      height: generated.attributes.height,
      width: generated.attributes.width,
      sizes: generated.attributes.sizes,
      src: generated.src,
      srcSet: generated.srcSet.attribute,
      alt: title(generated.src.split(".")[0].split("/").pop() || ""),
    }

    return attributes
  })
)

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

function transformImage(image?: ImageSchema): ImageProps | undefined {
  if (!image) return
  const found = images.find((transformed) => image.src === transformed.inputSrc)
  if (!found) return image
  return found
}

function transformImages(images?: ImageSchema[]): ImageProps[] | undefined {
  return images?.map(transformImage).filter((image) => image !== undefined)
}

// ------------------------------------------------------------
// Item transforms
// ------------------------------------------------------------

function transformItem(item?: ItemSchema): ItemProps | undefined {
  if (!item) return
  const { image, images, ...rest } = item
  return {
    image: transformImage(image),
    images: transformImages(images),
    ...rest,
  }
}

function transformItems(items?: ItemSchema[]): ItemProps[] | undefined {
  return items?.map(transformItem).filter((item) => item !== undefined)
}

function transformReferencedPage(
  page?: CollectionEntry<"pages">
): ItemProps | undefined {
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

function transformPath(path?: PathSchema): ItemProps | undefined {
  const page = pages.find((page) => page.id === path)
  const transformed = transformReferencedPage(page)
  return transformed
}

function transformPaths(paths?: PathSchema[]): ItemProps[] | undefined {
  return paths?.map(transformPath).filter((item) => item !== undefined)
}

function transformGlob(glob?: GlobSchema): ItemProps[] | undefined {
  if (!glob) return
  const entries = pages.filter((page) => page.id.startsWith(glob))
  const transformedItems = entries.map(transformReferencedPage)
  const filteredItems = transformedItems.filter((item) => item !== undefined)
  return filteredItems
}

// ------------------------------------------------------------
// Block transforms
// ------------------------------------------------------------

function transformBlock(block?: BlockSchema): BlockProps | undefined {
  if (!block) return
  const { image, images, glob, paths, items, ...rest } = block

  const transformedGlob = transformGlob(glob) || []
  const transformedPaths = transformPaths(paths) || []
  const transformedItems = transformItems(items) || []
  const mergedItems = [
    ...transformedItems,
    ...transformedGlob,
    ...transformedPaths,
  ]

  return {
    image: transformImage(image),
    images: transformImages(images),
    items: mergedItems,
    ...rest,
  }
}

function transformBlocks(blocks?: BlockSchema[]): BlockProps[] | undefined {
  return blocks?.map(transformBlock).filter((block) => block !== undefined)
}

// ------------------------------------------------------------
// Block transforms
// ------------------------------------------------------------

export function transformPage(page: CollectionEntry<"pages">) {
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
    glob = paths ? undefined : page.id,
    seo,
    ...rest
  } = withLayouts.data

  const transformedGlob = transformGlob(glob) || []
  const transformedPaths = transformPaths(paths) || []
  const transformedItems = transformItems(items) || []
  const mergedItems = [
    ...transformedItems,
    ...transformedGlob,
    ...transformedPaths,
  ]

  return {
    ...page,
    data: {
      href: getHref(page),
      image: transformImage(image),
      images: transformImages(images),
      items: mergedItems,
      banner: transformBlock(banner),
      header: transformBlock(header),
      blocks: transformBlocks(blocks),
      footer: transformBlock(footer),
      legal: transformBlock(legal),
      seo: {
        ...seo,
        image: transformImage(seo?.image),
      },
      ...rest,
    } satisfies PageProps,
  }
}

export function transformPages(pages: CollectionEntry<"pages">[]) {
  return pages.map(transformPage)
}
