import { z } from 'astro:content'

export const taglineSchema = z.preprocess(
  (data: unknown) => (typeof data === 'string' ? { text: data } : data),
  z
    .object({
      text: z.string().optional(),
    })
    .strict()
)

export type TaglineSchema = z.infer<typeof taglineSchema>
