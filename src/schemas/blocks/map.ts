import { z } from "astro:schema"

import { linkSchema } from "@/schemas/fields/link"

export const mapSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linkSchema.array(),
    src: z.string(),
  })
  .partial()
  .strict()

export type MapSchema = z.infer<typeof mapSchema>
