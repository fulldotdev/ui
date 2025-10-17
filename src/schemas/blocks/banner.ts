import { z } from "astro:schema"

export default z
  .object({
    block: z.enum(["1", "2"]),
    id: z.string(),
    class: z.string().optional(),
    description: z.string(),
  })
  .partial()
  .strict()
