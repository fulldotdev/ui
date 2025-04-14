import { z } from "zod"

import { buttonSchema } from "@/schemas/fields/button"
import { imageSchema } from "@/schemas/fields/image"
import { linkSchema } from "@/schemas/fields/link"
import { priceSchema } from "@/schemas/fields/price"

export const itemSchema = z
  .object({
    text: z.string(),
    href: z.string(),
    icon: z.string(),
    image: imageSchema,
    images: imageSchema.array(),
    rating: z.number(),
    title: z.string(),
    description: z.string(),
    price: priceSchema,
    priceString: z.string(),
    button: buttonSchema,
    links: linkSchema.array(),
    list: z.string().array(),
  })
  .partial()

export type ItemSchema = z.infer<typeof itemSchema>
