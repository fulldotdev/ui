import { buttonSchema } from "@/schemas/components/button"
import { imageSchema } from "@/schemas/components/image"
import { priceSchema } from "@/schemas/components/price"
import { z } from "zod"

export const productSchema = z
  .object({
    level: z.number().min(1).max(3).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    images: imageSchema.array().optional(),
    price: priceSchema.optional(),
    buttons: buttonSchema.array().optional(),
  })
  .passthrough()

export type ProductProps = z.infer<typeof productSchema>
