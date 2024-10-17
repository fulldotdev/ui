import { z } from 'astro:content'
import pathSchema from '../utils/pathSchema'

export default pathSchema('pages').or(
  z
    .object({
      text: z.string(),
      href: z.string(),
      icon: z.string(),
    })
    .partial()
    .passthrough()
)
