import { buttonSchema } from '@/schemas/components/button'
import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const projectsSchema = z
  .object({
    content: z.string(),
    button: buttonSchema,
    projects: pathSchema('projects').array(),
  })
  .partial()
  .strict()
