import { z } from "astro:schema"

import { linkSchema } from "@/schemas/fields/link"

export const pricingsSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linkSchema.array(),
    pricings: z
      .object({
        icon: z.enum(["check", "cross"]),
        title: z.string(),
        description: z.string(),
        list: z.string().array(),
        link: linkSchema,
        price: z.string(),
        unit: z.string(),
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()

export type PricingsSchema = z.infer<typeof pricingsSchema>
