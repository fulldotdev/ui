import type { CollectionEntry } from "astro:content"

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

export function getItemsByReference(
  paths: string[] | undefined,
  entries: CollectionEntry<"content">[]
) {
  if (!paths) return
  const items = paths
    .map((path) => {
      if (!path) return
      const slug = path.split("/src/content/")[1]?.split(".")[0]
      const id = slug?.replace("/index", "")
      const entry = entries.find((entry) => entry.id === id)
      return entry ? getItemByEntry(entry) : undefined
    })
    .filter((item) => item !== undefined)
  return items
}

export function getItemsByGlob(
  glob: string | undefined,
  entries: CollectionEntry<"content">[]
) {
  if (!glob) return
  const filteredEntries = entries.filter(
    (entry) => entry.id.startsWith(glob) && !entry.id.endsWith(glob)
  )
  const items = filteredEntries.map(getItemByEntry)
  return items
}

export function transformImage(
  image: CollectionEntry<"content">["data"]["image"] | undefined,
  images: any[]
) {
  if (!image) return
  const found = images.find((img) => img.id === image.src)
  if (!found) return image
  return {
    ...found.attributes,
    ...image,
    src: found.src,
    srcSet: found.srcSet.attribute,
  }
}

export function transformEntry(
  entry: CollectionEntry<"content">,
  entries: CollectionEntry<"content">[],
  images: CollectionEntry<"content">["data"]["image"][]
) {
  return {
    ...entry,
    data: {
      ...entry.data,
      items: getItemsByGlob(entry.collection, entries),
      image: transformImage(entry.data.image, images),
      images: entry.data.images?.map((image) => transformImage(image, images)),
      blocks: entry.data.blocks?.map(
        ({ image, references, glob, items, ...block }, i) => {
          const referenceItems = getItemsByReference(references, entries)
          const globItems = getItemsByGlob(glob, entries)
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
              images: item.images?.map((image) =>
                transformImage(image, images)
              ),
            })),
            ...block,
          }
        }
      ),
    },
  }
}
