import { z } from 'astro:content'

export const paragraphSchema = z
  .object({
    text: z.string().optional(),
    size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
    muted: z.boolean().optional(),
  })
  .strict()

export type ParagraphSchema = z.infer<typeof paragraphSchema>