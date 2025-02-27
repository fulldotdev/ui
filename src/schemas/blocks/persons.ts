import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const personsSchema = z
  .object({
    writeup: z.string().nullish(),
    persons: pathSchema('persons').array().nullish(),
  })
  .strict()

export type PersonsSchema = z.infer<typeof personsSchema>
