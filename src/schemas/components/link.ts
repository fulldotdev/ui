import { z } from 'astro:content'
import href from '../fields/href'
import icon from './icon'
import text from './text'

export const linkSchema = z
  .object({
    text: text,
    href: href,
    icon: icon,
    size: z.enum(['sm', 'md', 'lg']).optional(),
    variant: z.enum(['primary', 'underline', 'muted']).optional(),
  })
  .strict()

export type LinkSchema = z.infer<typeof linkSchema>

export default linkSchema
