import { z } from "zod"

export const introSchema = z
  .object({
    content: z.string(),
  })
  .partial()
  .strict()
