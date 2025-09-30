import { z } from "astro:schema"

import { linkSchema } from "@/schemas/fields/link"
import { linksSchema } from "@/schemas/fields/links"

export const pricingsSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linksSchema,
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

export const pricingsProps = pricingsSchema

export type PricingsSchema = z.infer<typeof pricingsSchema>
export type PricingsProps = z.infer<typeof pricingsProps>
