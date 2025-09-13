import { z } from "astro:schema"

import type { ProductProps } from "@/schemas/blocks/product"
import { linkSchema } from "@/schemas/fields/link"
import { pathSchema } from "@/schemas/fields/path"

export const productsSchema = z.object({
  variant: z.enum(["1"]),
  size: z.enum(["sm", "default", "lg"]),
  align: z.enum(["start", "center", "end"]),
  html: z.string(),
  links: linkSchema.array(),
  collection: pathSchema("collections"),
  products: pathSchema("products").array(),
})

export type ProductsSchema = z.infer<typeof productsSchema>

export type ProductsProps = Omit<
  ProductsSchema,
  "variant" | "html" | "collection" | "products"
> & {
  children?: React.ReactNode
  products?: ProductProps[]
}
