import { z } from 'astro:content'

export default z
  .object({
    id: z.string(),
    src: z.string(),
    alt: z.string().default(''),
    width: z.number(),
    height: z.number(),
    format: z.string(),
  })
  .passthrough()
