import { getEntry, type CollectionKey } from "astro:content"
import { z } from "zod"

import { getHref } from "@/lib/get-href"
import { pathSchema } from "@/lib/schemas"

export async function getItem(path: z.infer<typeof pathSchema>) {
  const collectionAndId = path.split("/src/content/")[1].split(".")[0]
  const collection = collectionAndId.split("/")[0]
  const id = collectionAndId.replace(`${collection}/`, "").split(".")[0]
  const entry = await getEntry(collection as CollectionKey, id)
  if (!entry) return undefined

  return {
    href: getHref(entry),
    ...entry.data,
  }
}
