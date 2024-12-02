import { z } from 'astro:content'

export const paragraphSchema = z.preprocess(
  (data: unknown) => (typeof data === 'string' ? { text: data } : data),
  z
    .object({
      text: z.string().optional(),
    })
    .strict()
)

export type ParagraphSchema = z.infer<typeof paragraphSchema>
