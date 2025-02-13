import { z } from 'astro:content'

export const introSchema = z
  .object({
    writeup: z.string().optional(),
  })
  .strict()

export type IntroSchema = z.infer<typeof introSchema>
