import { buttonSchema } from '@/schemas/components/button'
import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const projectsSchema = z
  .object({
    writeup: z.string().nullish(),
    button: buttonSchema.nullish(),
    projects: pathSchema('projects').array().nullish(),
  })
  .strict()

export type ProjectsSchema = z.infer<typeof projectsSchema>
