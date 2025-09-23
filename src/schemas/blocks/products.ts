import { z } from "astro:schema"

import { linkSchema } from "@/schemas/fields/link"
import { pathSchema } from "@/schemas/fields/path"

export const productsSchema = z.object({
  variant: z.enum(["1", "2"]),
  size: z.enum(["sm", "default", "lg"]),
  align: z.enum(["start", "center", "end"]),
  html: z.string(),
  links: linkSchema.array(),
  products: pathSchema("products").array(),
  collection: pathSchema("collections"),
})

export type ProductsSchema = z.infer<typeof productsSchema>
