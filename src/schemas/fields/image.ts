import { z } from "zod"

export const imageSchema = z
  .object({
    src: z.string().optional(),
    alt: z.string().optional(),
  })
  .strict()

export type ImageSchema = z.infer<typeof imageSchema>
