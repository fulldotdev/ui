import { z } from "astro:schema"

import { linkSchema } from "@/schemas/fields/link"

export const ctaSchema = z
  .object({
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    background: z.any(),
    html: z.string(),
    links: linkSchema.array(),
  })
  .partial()
  .strict()

export type CtaProps = Omit<z.infer<typeof ctaSchema>, "html"> & {
  children?: React.ReactNode
}
