import { z } from 'astro:content'

export const paragraphSchema = z
  .object({
    text: z.string().optional(),
  })
  .strict()

export type ParagraphSchema = z.infer<typeof paragraphSchema>
