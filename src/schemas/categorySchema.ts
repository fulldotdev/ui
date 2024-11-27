import { z } from 'astro:content'
import categories from 'fulldev-ui/schemas/fields/categories'
import description from 'fulldev-ui/schemas/fields/description'
import image from 'fulldev-ui/schemas/fields/image'
import title from 'fulldev-ui/schemas/fields/title'

export const categorySchema = z
  .object({
    title,
    description,
    image,
    categories,
  })
  .strict()

export type CategorySchema = z.infer<typeof categorySchema>
