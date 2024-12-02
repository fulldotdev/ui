import { z } from 'astro:content'

export const iconSchema = z.preprocess(
  (data: unknown) => (typeof data === 'string' ? { name: data } : data),
  z
    .object({
      name: z.string().optional(),
    })
    .strict()
)

export type IconSchema = z.infer<typeof iconSchema>
