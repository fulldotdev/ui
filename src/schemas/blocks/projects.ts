import { buttonSchema } from '@/schemas/components/button'
import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const projectsSchema = z
  .object({
    variant: z.number().default(1),
    content: z.string(),
    button: buttonSchema,
    projects: pathSchema('projects').array(),
  })
  .partial()
  .strict()
