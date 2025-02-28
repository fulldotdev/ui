import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const personsSchema = z
  .object({
    type: z.literal('Persons').default('Persons'),
    content: z.string(),
    persons: pathSchema('persons').array(),
  })
  .partial()
  .strict()
