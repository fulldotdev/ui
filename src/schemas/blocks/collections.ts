import { z } from "astro:schema"

import { pathSchema } from "@/schemas/fields/path"

export const collectionsSchema = z.object({
  variant: z.enum(["1", "2"]),
  size: z.enum(["sm", "default", "lg"]),
  align: z.enum(["start", "center", "end"]),
  html: z.string(),
  collections: pathSchema("collections").array(),
})

export type CollectionsSchema = z.infer<typeof collectionsSchema>
