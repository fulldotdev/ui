import { z } from "astro:schema"

import { linksSchema } from "@/schemas/fields/links"

export const mapSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linksSchema,
    src: z.string(),
  })
  .partial()
  .strict()

export const mapProps = mapSchema

export type MapSchema = z.infer<typeof mapSchema>
export type MapProps = z.infer<typeof mapProps>
