import { z } from 'astro:content'
import categories from 'fulldev-ui/schemas/fields/categories'
import description from 'fulldev-ui/schemas/fields/description'
import images from 'fulldev-ui/schemas/fields/images'
import title from 'fulldev-ui/schemas/fields/title'
import price from './fields/price'
import soldout from './fields/soldout'

export const productSchema = z.object({
  soldout,
  title,
  description,
  price,
  categories,
  images,
})

export type ProductSchema = z.infer<typeof productSchema>
