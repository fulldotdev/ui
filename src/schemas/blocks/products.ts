import { buttonSchema } from "@/schemas/components/button"
import { imageSchema } from "@/schemas/components/image"
import { priceSchema } from "@/schemas/components/price"
import { z } from "zod"

export const productsSchema = z
  .object({
    level: z.number().min(1).max(3).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    products: z
      .object({
        href: z.string().optional(),
        title: z.string().optional(),
        image: imageSchema.optional(),
        price: priceSchema.optional(),
      })
      .array()
      .optional(),
  })
  .passthrough()

export type ProductsProps = z.infer<typeof productsSchema>
