import { buttonSchema } from '@/schemas/components/button'
import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const collectionsSchema = z
  .object({
    type: z.literal('Collections').default('Collections'),
    variant: z.number().default(1),
    content: z.string(),
    button: buttonSchema,
    collections: pathSchema('collections').array(),
  })
  .partial()
  .strict()
