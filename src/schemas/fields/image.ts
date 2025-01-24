import { z } from 'astro:content'

const image = z
  .object({
    src: z.string().optional(),
    alt: z.string().optional(),
  })
  .strict()

export const imageSchema = z.preprocess(
  (data: unknown) => (typeof data === 'string' ? { src: data } : data),
  image
)
