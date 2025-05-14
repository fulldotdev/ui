import { z } from "zod"

export const linkSchema = z.object({
  text: z.string(),
  href: z.string(),
})
