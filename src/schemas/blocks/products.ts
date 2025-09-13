import { z } from "astro:schema"

import { productSchema } from "@/schemas/blocks/product"
import { linkSchema } from "@/schemas/fields/link"

export const productsSchema = z.object({
  size: z.enum(["sm", "default", "lg"]),
  align: z.enum(["start", "center", "end"]),
  html: z.string(),
  links: linkSchema.array(),
  products: productSchema.array(),
})

export type ProductsProps = Omit<z.infer<typeof productsSchema>, "html"> & {
  children?: React.ReactNode
}
