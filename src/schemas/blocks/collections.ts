import { z } from "astro:schema"

import { collectionSchema } from "@/schemas/blocks/collection"

export const collectionsSchema = z.object({
  size: z.enum(["sm", "default", "lg"]),
  align: z.enum(["start", "center", "end"]),
  html: z.string(),
  collections: collectionSchema.array(),
})

export type CollectionsProps = Omit<
  z.infer<typeof collectionsSchema>,
  "html"
> & {
  children?: React.ReactNode
}
