import { z } from "astro:schema"

export const quoteSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    size: z.enum(["sm", "default", "lg"]),
    align: z.enum(["start", "center", "end"]),
    background: z.any(),
    title: z.string(),
    description: z.string(),
  })
  .partial()
  .strict()

export type QuoteSchema = z.infer<typeof quoteSchema>

export type QuoteProps = Omit<QuoteSchema, "variant">
