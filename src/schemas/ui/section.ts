import { z } from "astro:schema"

export default z
  .object({
    class: z.string(),
    id: z.string(),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
  })
  .partial()
  .strict()
