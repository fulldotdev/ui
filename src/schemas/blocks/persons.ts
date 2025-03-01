import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const personsSchema = z
  .object({
    type: z.literal('Persons').default('Persons'),
    variant: z.number().default(1),
    content: z.string(),
    persons: pathSchema('persons').array(),
  })
  .partial()
  .strict()
