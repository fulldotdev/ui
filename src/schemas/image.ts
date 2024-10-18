import { z } from 'astro:content'

export default z
  .object({
    alt: z.string(),
  })
  .partial()
  .passthrough()
  .optional()
