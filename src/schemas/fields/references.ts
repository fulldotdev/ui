import type { CollectionEntry } from "astro:content"
import { z } from "astro:schema"

export const referencesSchema = z.string().array()

const pages: CollectionEntry<"pages">[] = []

export const referencesProps = referencesSchema.transform((values) => {
  return pages
    .filter((page) =>
      values.some((value) => value && page.id.startsWith(value))
    )
    .map(({ id, data: { sections, ...data } }) => ({
      id,
      href: `/${id}/`,
      ...data,
    }))
})

export type ReferencesProps = z.infer<typeof referencesProps>
