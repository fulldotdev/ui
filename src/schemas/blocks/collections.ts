import { z } from "astro:schema"

import type { CollectionProps } from "@/schemas/blocks/collection"
import { pathSchema } from "@/schemas/fields/path"

export const collectionsSchema = z.object({
  variant: z.enum(["1"]),
  size: z.enum(["sm", "default", "lg"]),
  align: z.enum(["start", "center", "end"]),
  html: z.string(),
  collections: pathSchema("collections").array(),
})

export type CollectionsSchema = z.infer<typeof collectionsSchema>

export type CollectionsProps = Omit<CollectionsSchema, "variant" | "html"> & {
  children?: React.ReactNode
  collections?: CollectionProps[]
}
