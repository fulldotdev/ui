import { z } from 'astro:content'
import { categoriesSchema } from 'fulldev-ui/schemas/blocks/categories'
import { ctaSchema } from 'fulldev-ui/schemas/blocks/cta.ts'
import { featureSchema } from 'fulldev-ui/schemas/blocks/feature.ts'
import { heroSchema } from 'fulldev-ui/schemas/blocks/hero.ts'
import { productsSchema } from 'fulldev-ui/schemas/blocks/products'

export const blockSchema = z.union([
  heroSchema,
  ctaSchema,
  featureSchema,
  productsSchema,
  categoriesSchema,
])
