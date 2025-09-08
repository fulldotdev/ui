import { getImage } from "astro:assets"
import type { CollectionEntry } from "astro:content"
import { title } from "radash"

// ------------------------------------------------------------
// Data loading
// ------------------------------------------------------------

const IMAGES = import.meta.glob("src/assets/**/*.{png,jpg,jpeg,gif,svg}")

// ------------------------------------------------------------
// Field transforms
// ------------------------------------------------------------

async function transformImageField(
  image: CollectionEntry<"pages">["data"]["image"]
) {
  if (!image) return

  const imageObject =
    typeof image === "string"
      ? {
          src: image,
          alt: title(image.split(".")[0].split("/").pop() || ""),
        }
      : image

  const found = Object.keys(IMAGES).find((key) => key.endsWith(imageObject.src))
  if (!found) return imageObject

  const file = ((await IMAGES[found as keyof typeof IMAGES]()) as any).default

  if (import.meta.env.DEV) {
    return {
      ...imageObject,
      ...file,
    }
  }

  const generated = await getImage({
    src: file,
    format: "webp",
    widths: [320, 768, 1024, 1280, 1536, 1920],
    quality: "mid",
    sizes: "100vw",
  })

  return {
    sizes: "100vw",
    loading: "lazy",
    decoding: "async",
    fetchpriority: "auto",
    ...imageObject,
    height: generated.attributes.height,
    width: generated.attributes.width,
    src: generated.src,
    srcset: generated.srcSet.attribute,
  }
}

async function transformImagesField(
  images: CollectionEntry<"pages">["data"]["images"]
) {
  if (!images) return
  return await Promise.all(
    images.map(async (image) => await transformImageField(image))
  )
}

// ------------------------------------------------------------
// Item transforms
// ------------------------------------------------------------

async function transformItems(
  items: CollectionEntry<"pages">["data"]["items"]
) {
  if (!items) return

  return await Promise.all(
    items.map(async (item) => ({
      ...item,
      image: await transformImageField(item.image),
      images: await transformImagesField(item.images),
    }))
  )
}

// ------------------------------------------------------------
// Block transforms
// ------------------------------------------------------------

async function transformBlock(
  block: CollectionEntry<"pages">["data"]["header"]
) {
  if (!block) return

  return {
    ...block,
    image: await transformImageField(block.image),
    images: await transformImagesField(block.images),
    items: await transformItems(block.items),
  }
}

async function transformBlocks(
  blocks: CollectionEntry<"pages">["data"]["blocks"]
) {
  if (!blocks) return
  return await Promise.all(
    blocks.map(async (block) => await transformBlock(block))
  )
}

// ------------------------------------------------------------
// Page transforms
// ------------------------------------------------------------

export async function transformImages<T extends CollectionEntry<"pages">>(
  page: T
): Promise<T> {
  return {
    ...page,
    data: {
      ...page.data,
      banner: await transformBlock(page.data.banner),
      header: await transformBlock(page.data.header),
      blocks: await transformBlocks(page.data.blocks),
      footer: await transformBlock(page.data.footer),
      legal: await transformBlock(page.data.legal),
      items: await transformItems(page.data.items),
    },
  }
}
