import { z } from 'astro:content'
import links from './links'

export default z
  .object({
    links,
  })
  .partial()
  .passthrough()
  .optional()
