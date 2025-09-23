import { z } from "astro:schema"

import { linkSchema } from "@/schemas/fields/link"

export const ctaSchema = z
  .object({
    variant: z.enum(["1", "2", "3"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    background: z.any(),
    html: z.string(),
    links: linkSchema.array(),
  })
  .partial()
  .strict()

export type CtaSchema = z.infer<typeof ctaSchema>
