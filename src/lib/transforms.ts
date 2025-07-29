import { getImage } from "astro:assets"
import {
  getCollection,
  getEntries,
  reference,
  z,
  type CollectionEntry,
} from "astro:content"

import { imageSchema, type EntrySchema } from "@/lib/schemas"

const images = import.meta.glob("/src/images/**", { eager: true })

export function getHrefByEntry({ id, data }: CollectionEntry<"content">) {
  const todayDate = new Date()
  const publishedDate = data.published
  const isPublished = publishedDate && publishedDate < todayDate
  if (!isPublished) return undefined

  if ("href" in data && data.href) return data.href
  if (id === "index") return "/"
  return `/${id}/`
}

export function getItemByEntry(entry: CollectionEntry<"content">) {
  return {
    href: getHrefByEntry(entry),
    ...entry.data,
  }
}

export async function getItemsByReference(paths?: string[]) {
  if (!paths) return
  const references = paths?.map((path) => {
    const slug = path.split("/src/content/")[1].split(".")[0]
    const id = slug.replace("/index", "")
    const ref = reference("content").parse(id)
    return ref
  })
  const entries = await getEntries(references)
  const items = entries.map(getItemByEntry)
  return items
}

export async function getItemsByGlob(glob?: string) {
  if (!glob) return
  const entries = await getCollection(
    "content",
    (entry) => entry.id.startsWith(glob) && !entry.id.endsWith(glob)
  )
  const items = entries.map(getItemByEntry)
  return items
}

export async function transformImage(image?: z.infer<typeof imageSchema>) {
  if (!image) return image
  const found = images[`/src/images/${image.src}`] as any
  const metadata = found.default as ImageMetadata
  const generated = await getImage({
    src: metadata,
    format: "webp",
  })
  return {
    ...image,
    ...generated.attributes,
    src: generated.src,
  }
}

export async function transformEntry({
  image,
  blocks = [],
  ...data
}: EntrySchema) {
  return {
    image: await transformImage(image),
    blocks: await Promise.all(
      blocks?.map(async ({ image, references, glob, items, ...block }, i) => {
        const referenceItems = await getItemsByReference(references)
        const globItems = await getItemsByGlob(glob)
        const mergedItems = [
          ...(referenceItems ?? []),
          ...(globItems ?? []),
          ...(items ?? []),
        ]
        return {
          image: await transformImage(image),
          items: await Promise.all(
            mergedItems?.map(async ({ image, ...item }) => ({
              ...item,
              image: await transformImage(image),
            }))
          ),
          ...block,
        }
      })
    ),
    ...data,
  }
}
