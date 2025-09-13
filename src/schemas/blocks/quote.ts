import { z } from "astro:schema"

export const quoteSchema = z
  .object({
    size: z.enum(["sm", "default", "lg"]),
    align: z.enum(["start", "center", "end"]),
    background: z.any(),
    title: z.string(),
    description: z.string(),
  })
  .partial()
  .strict()

export type QuoteSchema = z.infer<typeof quoteSchema>
