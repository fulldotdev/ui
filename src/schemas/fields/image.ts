import { z } from "zod"

export const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
})
