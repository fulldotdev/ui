import { imageSchema } from "@/schemas/components/image"
import { priceSchema } from "@/schemas/components/price"
import { z } from "zod"

export const collectionSchema = z
  .object({
    level: z.number().min(1).max(3).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
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

export type CollectionProps = z.infer<typeof collectionSchema>
