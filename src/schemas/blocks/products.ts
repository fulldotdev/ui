import { z } from "astro:schema"

import { productProps } from "@/schemas/blocks/product"
import { linksSchema } from "@/schemas/fields/links"
import { referencesProps, referencesSchema } from "@/schemas/fields/references"

export const productsSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    size: z.enum(["sm", "default", "lg"]),
    align: z.enum(["start", "center", "end"]),
    html: z.string(),
    links: linksSchema,
    products: referencesSchema,
  })
  .partial()
  .strict()

export const productsProps = productsSchema.extend({
  products: referencesProps.pipe(productProps.array()),
})

export type ProductsSchema = z.infer<typeof productsSchema>
export type ProductsProps = z.infer<typeof productsProps>
