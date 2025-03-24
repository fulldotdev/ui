import { z } from "zod"

export const linkSchema = z
  .object({
    text: z.string().optional(),
    href: z.string().optional(),
  })
  .strict()

export type LinkSchema = z.infer<typeof linkSchema>
