import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const personsSchema = z
  .object({
    type: z.literal('Persons').default('Persons'),
    writeup: z.string().nullish(),
    persons: pathSchema('persons').array().nullish(),
  })
  .strict()
