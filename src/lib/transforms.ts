import { type EntrySchema } from "@/lib/schemas"

type ContentEntry = {
  id: string
  data: EntrySchema
}

type Image = {
  id?: string
  src?: string
  title?: string
  alt?: string
  [key: string]: any
}

export function getHrefByEntry({ id, data }: ContentEntry) {
  const todayDate = new Date()
  const publishedDate = data.published
  const isPublished = publishedDate && publishedDate < todayDate
  if (!isPublished) return undefined

  if ("href" in data && data.href) return data.href
  if (id === "index") return "/"
  return `/${id}/`
}

export function getItemByEntry(entry: ContentEntry) {
  return {
    href: getHrefByEntry(entry),
    ...entry.data,
  }
}

export function getItemsByReference(
  paths: string[] | undefined,
  content: ContentEntry[]
) {
  if (!paths) return
  const items = paths
    .map((path) => {
      if (!path) return
      const slug = path.split("/src/content/")[1]?.split(".")[0]
      const id = slug?.replace("/index", "")
      const entry = content.find((entry) => entry.id === id)
      return entry ? getItemByEntry(entry) : undefined
    })
    .filter((item) => item !== undefined)
  return items
}

export function getItemsByGlob(
  glob: string | undefined,
  content: ContentEntry[]
) {
  if (!glob) return
  const entries = content.filter(
    (entry) => entry.id.startsWith(glob) && !entry.id.endsWith(glob)
  )
  const items = entries.map(getItemByEntry)
  return items
}

export function transformImage(image: Image | undefined, images: Image[]) {
  if (!image) return
  const found = images.find((img) => img.id === image.src)
  if (!found) return image
  return {
    ...found.attributes,
    ...image,
    src: found.src,
  }
}

export function transformEntry(
  { image, blocks = [], ...data }: EntrySchema,
  content: ContentEntry[],
  images: Image[]
) {
  return {
    image: transformImage(image, images),
    blocks: blocks?.map(({ image, references, glob, items, ...block }, i) => {
      const referenceItems = getItemsByReference(references, content)
      const globItems = getItemsByGlob(glob, content)
      const mergedItems = [
        ...(referenceItems ?? []),
        ...(globItems ?? []),
        ...(items ?? []),
      ]
      return {
        image: transformImage(image, images),
        items: mergedItems?.map(({ image, ...item }) => ({
          ...item,
          image: transformImage(image, images),
        })),
        ...block,
      }
    }),
    ...data,
  }
}
