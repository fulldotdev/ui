import { z } from 'astro:content'
import title from 'fulldev-ui/schemas/fields/title'
import sections from './components/sections'

export const pageSchema = z
  .object({
    title,
    sections,
  })
  .strict()

export type PageSchema = z.infer<typeof pageSchema>
