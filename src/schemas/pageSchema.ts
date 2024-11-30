import { z } from 'astro:content'
import title from 'fulldev-ui/schemas/fields/title'
import sections from './components/sections'
import description from './fields/description'
import href from './fields/href'
import image from './fields/image'
import seo from './fields/seo'

export const pageSchema = z
  .object({
    seo,
    title,
    description,
    image,
    sections,
    href,
  })
  .strict()

export type PageSchema = z.infer<typeof pageSchema>
