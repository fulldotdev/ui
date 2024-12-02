import { z } from 'astro:content'

export const headingSchema = z.preprocess(
  (data: unknown) => (typeof data === 'string' ? { text: data } : data),
  z
    .object({
      text: z.string().optional(),
    })
    .strict()
)

export type HeadingSchema = z.infer<typeof headingSchema>
