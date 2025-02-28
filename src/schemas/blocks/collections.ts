import { buttonSchema } from '@/schemas/components/button'
import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const collectionsSchema = z
  .object({
    type: z.literal('Collections').default('Collections'),
    content: z.string(),
    button: buttonSchema,
    collections: pathSchema('collections').array(),
  })
  .partial()
  .strict()
