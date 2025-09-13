import { z } from "astro:schema"

export const imageSchema = z
  .object({
    src: z.string(),
    alt: z.string(),
    title: z.string(),
  })
  .partial()
  .strict()
