import { buttonSchema } from '@/schemas/components/button'
import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const collectionsSchema = z
  .object({
    type: z.literal('Collections').default('Collections'),
    writeup: z.string().nullish(),
    button: buttonSchema.nullish(),
    collections: pathSchema('collections').array().nullish(),
  })
  .strict()
