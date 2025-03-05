import { z } from "zod"

export const linkSchema = z
  .object({
    text: z.string(),
    href: z.string(),
  })
  .partial()
  .strict()

export type LinkSchema = z.infer<typeof linkSchema>
