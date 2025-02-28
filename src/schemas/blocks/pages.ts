import { buttonSchema } from '@/schemas/components/button'
import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const pagesSchema = z
  .object({
    type: z.literal('Pages').default('Pages'),
    writeup: z.string().nullish(),
    button: buttonSchema.nullish(),
    pages: pathSchema('pages').array().nullish(),
  })
  .strict()
