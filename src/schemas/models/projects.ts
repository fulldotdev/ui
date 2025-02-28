import { buttonSchema } from '@/schemas/fields/button'
import { pathSchema } from '@/schemas/fields/path'
import { z } from 'astro:content'

export const projectsSchema = z
  .object({
    writeup: z.string().nullish(),
    button: buttonSchema.nullish(),
    projects: pathSchema('projects').array().nullish(),
  })
  .strict()

export type ProjectsSchema = z.infer<typeof projectsSchema>
