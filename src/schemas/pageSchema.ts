import { z } from 'astro:content'
import { blockSchema } from 'fulldev-ui/schemas/components/block.ts'
import { buttonSchema } from 'fulldev-ui/schemas/components/button.ts'
import { headSchema } from 'fulldev-ui/schemas/components/head.ts'
import { imageSchema } from 'fulldev-ui/schemas/components/image.ts'
import { priceSchema } from 'fulldev-ui/schemas/components/price.ts'
import pathSchema from 'fulldev-ui/schemas/utils/pathSchema.ts'

export const pageSchema = z
  .object({
    _layout: z.string().default('Page').optional(),
    _schema: z.string().optional(),
    href: z.string().optional(),
    draft: z.boolean().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    list: z.string().array().optional(),
    image: imageSchema.optional(),
    images: imageSchema.array().optional(),
    price: priceSchema.shape.amount,
    categories: pathSchema('pages').array().optional(),
    blocks: blockSchema.array().optional(),
    order: z.number().optional(),
    variants: z.record(z.string(), z.string().array()).optional(),
    soldout: z.boolean().optional(),
    head: headSchema.optional(),
    button: buttonSchema.optional(),
  })
  .strict()

export type PageSchema = z.infer<typeof pageSchema>
