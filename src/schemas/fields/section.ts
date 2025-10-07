import { z } from "astro:schema"

export default z.object({
  variant: z.enum(["1", "2", "3"]),
  align: z.enum(["start", "center", "end"]),
  size: z.enum(["sm", "default", "lg"]),
})
