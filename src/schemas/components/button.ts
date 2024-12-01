import { z } from 'astro:content'
import href from '../fields/href'
import icon from './icon'
import text from './text'

export const buttonSchema = z.object({
  text: text,
  href: href,
  icon: icon,
  size: z.enum(['sm', 'md', 'lg']).optional(),
  variant: z.enum(['primary', 'secondary', 'outline', 'ghost']).optional(),
})

export type ButtonSchema = z.infer<typeof buttonSchema>

export default buttonSchema
