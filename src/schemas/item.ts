import { buttonSchema } from "@/schemas/fields/button"
import { imageSchema } from "@/schemas/fields/image"
import { linkSchema } from "@/schemas/fields/link"
import { priceSchema } from "@/schemas/fields/price"
import { z } from "zod"

export const itemSchema = z
  .object({
    href: z.string().optional(),
    image: imageSchema.optional(),
    rating: z.number().min(1).max(5).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    price: priceSchema.optional(),
    button: buttonSchema.optional(),
    links: linkSchema.array().optional(),
    list: z.string().array().optional(),
  })
  .strict()

export type ItemSchema = z.infer<typeof itemSchema>
