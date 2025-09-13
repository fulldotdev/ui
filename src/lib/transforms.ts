import { getImage as getImageAstro } from "astro:assets"
import { getCollection, getEntry, z, type CollectionEntry } from "astro:content"
import { title } from "radash"

import {
  globSchema,
  imageSchema,
  itemSchema,
  itemsSchema,
  pathSchema,
} from "@/lib/schemas"

// ------------------------------------------------------------
// Getters
// ------------------------------------------------------------

async function getHrefByPage(page: CollectionEntry<"pages">) {
  let href: string | undefined = undefined
  if ((page.body || page.data.blocks || page.data.block) && !page.data.draft) {
    if (page.id === "index") href = "/"
    else href = `/${page.id}/`
  }
  return href
}

async function getLayout(page: CollectionEntry<"pages">) {
  const indexLayout = await getEntry("layouts", "index")
  const matchingLayouts = await getCollection("layouts", (layout) =>
    page.id.startsWith(layout.id)
  )
  return {
    ...indexLayout?.data,
    ...matchingLayouts.reduce(
      (acc, layout) => ({ ...acc, ...layout.data }),
      {}
    ),
  }
}

// ------------------------------------------------------------
// Transforms
// ------------------------------------------------------------

const transformImage = imageSchema.transform(async (image) => {
  const IMAGES = import.meta.glob("src/assets/**/*.{png,jpg,jpeg,gif,svg}")

  const imageObject =
    typeof image === "string"
      ? {
          src: image,
          alt: title(image.split(".")[0].split("/").pop() || ""),
        }
      : image

  const id = imageObject.src.split("/assets/").pop()
  const found = Object.keys(IMAGES).find((key) => key === `/src/assets/${id}`)
  if (!found) return imageObject

  const file = ((await IMAGES[found as keyof typeof IMAGES]()) as any).default

  if (import.meta.env.DEV) {
    return {
      ...imageObject,
      ...file,
    }
  }

  const generated = await getImageAstro({
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
})

const transformGlob = globSchema.transform(async (glob) => {
  const collection = await getCollection("pages")
  const pages = collection.filter((page) => page.id.startsWith(glob))
  if (pages.length < 1) throw new Error(`No pages found with glob: ${glob}`)

  return await Promise.all(
    pages.map(async (page) => {
      if (!page) throw new Error(`Page not found: ${glob}`)
      const href = await getHrefByPage(page)
      const layout = await getLayout(page)
      const merged = { href, ...layout, ...page.data }
      const { banner, header, footer, legal, blocks, ...destructured } = merged
      return destructured
    })
  )
})

const transformPath = pathSchema.transform(async (path) => {
  const slug = path.replace("/src/content/pages/", "").split(".")[0]
  const id = slug.replace("/index", "")
  const page = await getEntry("pages", id)
  if (!page) throw new Error(`Page not found with path: ${path}`)
  const href = await getHrefByPage(page)
  const layout = await getLayout(page)
  const merged = { href, ...layout, ...page.data }
  const { bubble, banner, header, footer, legal, blocks, ...destructured } =
    merged
  return destructured
})

const transformItem = itemSchema
  .extend({
    image: transformImage,
    images: transformImage.array(),
    avatar: transformImage,
    avatars: transformImage.array(),
  })
  .partial()

const transformItems = z
  .union([transformGlob, transformPath.array(), z.any()])
  .pipe(transformItem.array()) as z.ZodType<z.infer<typeof transformItem>[]>

export const transformBlock = transformItem
  .extend({
    items: transformItems,
  })
  .partial()

export const transformData = transformBlock
  .extend({
    banner: transformBlock,
    header: transformBlock,
    blocks: transformBlock.array(),
    footer: transformBlock,
    legal: transformBlock,
  })
  .partial()

// ------------------------------------------------------------
// Main export (TODO: simplify)
// ------------------------------------------------------------

export const transformPage = z
  .object({
    id: z.string(),
    collection: z.literal("pages"),
    data: z.any(),
  })
  .partial()
  .passthrough()
// .passthrough()
// .transform(async (page) => {
//   const data = await getDataByPage(page as CollectionEntry<"pages">)
//   return {
//     ...page,
//     data,
//   }
// })
// .pipe(
//   z.object({
//     id: z.string(),
//     collection: z.literal("pages"),
//     data: transformData,
//   })
// ) as z.ZodType<CollectionEntry<"pages">>
