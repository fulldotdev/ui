import { z } from 'astro:content'
import heading from './heading'
import icon from './icon'
import text from './text'

export default z
  .object({
    heading,
    text,
    icon,
    href: z.string(),
  })
  .partial()
