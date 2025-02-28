import { buttonSchema } from '@/schemas/components/button'
import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const projectsSchema = z
  .object({
    type: z.literal('Projects').default('Projects'),
    writeup: z.string().nullish(),
    button: buttonSchema.nullish(),
    projects: pathSchema('projects').array().nullish(),
  })
  .strict()
