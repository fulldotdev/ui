import { z } from 'astro:content'
import categories from 'fulldev-ui/schemas/fields/categories'
import description from 'fulldev-ui/schemas/fields/description'
import images from 'fulldev-ui/schemas/fields/images'
import title from 'fulldev-ui/schemas/fields/title'
import order from './fields/order'
import price from './fields/price'
import soldout from './fields/soldout'
import variants from './fields/variants'

export const productSchema = z.object({
  soldout,
  order,
  title,
  description,
  price,
  categories,
  images,
  variants,
})

export type ProductSchema = z.infer<typeof productSchema>
