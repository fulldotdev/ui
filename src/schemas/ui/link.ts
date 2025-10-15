import { z } from "astro:schema"

export default z
  .object({
    href: z.string(),
    text: z.string(),
    target: z.string(),
  })
  .partial()
  .strict()
