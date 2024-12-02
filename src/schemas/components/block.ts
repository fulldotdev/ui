import { z } from 'astro:content'
import { categoriesSchema } from 'fulldev-ui/schemas/blocks/categories'
import { ctaSchema } from 'fulldev-ui/schemas/blocks/cta'
import { featureSchema } from 'fulldev-ui/schemas/blocks/feature'
import { heroSchema } from 'fulldev-ui/schemas/blocks/hero'
import { productsSchema } from 'fulldev-ui/schemas/blocks/products'
import { headerSchema } from './header'

const _block = { _block: z.string() }

export const blockSchema = z.union([
  heroSchema.extend(_block),
  ctaSchema.extend(_block),
  featureSchema.extend(_block),
  productsSchema.extend(_block),
  categoriesSchema.extend(_block),
  headerSchema.extend(_block),
])
