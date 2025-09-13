import { z } from "astro:schema"

import type { ProductProps } from "@/schemas/blocks/product"
import { imageSchema } from "@/schemas/fields/image"
import { pathSchema } from "@/schemas/fields/path"

export const collectionSchema = z.object({
  variant: z.enum(["1"]),
  id: z.string(),
  size: z.enum(["sm", "default", "lg"]),
  align: z.enum(["start", "center", "end"]),
  title: z.string(),
  description: z.string(),
  image: imageSchema,
  products: pathSchema("products").array(),
})

export type CollectionSchema = z.infer<typeof collectionSchema>

export type CollectionProps = Omit<CollectionSchema, "variant" | "products"> & {
  children?: React.ReactNode
  products?: ProductProps[]
}
