import { z } from "astro:schema"

import { linksSchema } from "@/schemas/fields/links"

export const ctaSchema = z
  .object({
    variant: z.enum(["1", "2", "3"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    background: z.any(),
    html: z.string(),
    links: linksSchema,
  })
  .partial()
  .strict()

export const ctaProps = ctaSchema

export type CtaSchema = z.infer<typeof ctaSchema>
export type CtaProps = z.infer<typeof ctaProps>
