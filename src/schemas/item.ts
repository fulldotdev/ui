import { buttonSchema } from "@/schemas/fields/button"
import { imageSchema } from "@/schemas/fields/image"
import { linkSchema } from "@/schemas/fields/link"
import { priceSchema } from "@/schemas/fields/price"
import { z } from "zod"

export const itemSchema = z
  .object({
    text: z.string(),
    href: z.string(),
    icon: z.string(),
    image: imageSchema,
    rating: z.number(),
    title: z.string(),
    description: z.string(),
    price: priceSchema,
    button: buttonSchema,
    links: linkSchema.array(),
    list: z.string().array(),
  })
  .partial()

export type ItemSchema = z.infer<typeof itemSchema>
