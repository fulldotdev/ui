import { z } from "astro:content"

export const introSchema = z
  .object({
    content: z.string(),
  })
  .partial()
  .strict()
