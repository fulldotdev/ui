import { z } from "astro:schema"

export default z
  .object({
    variant: z.enum(["1", "2"]),
    description: z.string(),
  })
  .partial()
  .strict()
