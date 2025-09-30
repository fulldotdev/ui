import type { CollectionEntry } from "astro:content"
import { z } from "astro:schema"

export const referenceSchema = z.string()

const pages: CollectionEntry<"pages">[] = []

export const referenceProps = referenceSchema.transform((value) => {
  const found = pages.find((page) => page.id.startsWith(value))
  if (!found) return undefined
  const {
    id,
    data: { type, sections, ...data },
  } = found
  return {
    id,
    href: `/${id}/`,
    ...data,
  }
})

export type ReferenceProps = z.infer<typeof referenceProps>
