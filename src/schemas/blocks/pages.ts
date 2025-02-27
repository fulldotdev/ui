import { buttonSchema } from '@/schemas/components/button'
import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const pagesSchema = z
  .object({
    writeup: z.string().nullish(),
    button: buttonSchema.nullish(),
    pages: pathSchema('pages').array().nullish(),
  })
  .strict()

export type PagesSchema = z.infer<typeof pagesSchema>
