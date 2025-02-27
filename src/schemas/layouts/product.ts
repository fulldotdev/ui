import { buttonSchema } from '@/schemas/components/button'
import { imageSchema } from '@/schemas/components/image'
import { sectionSchema } from '@/schemas/components/section'
import { metaSchema } from '@/schemas/misc/meta'
import { pathSchema } from '@/schemas/misc/path'
import { z } from 'astro:content'

export const productSchema = z
  .object({
    title: z.string().nullish(),
    description: z.string().nullish(),
    image: imageSchema.nullish(),
    sections: sectionSchema.array().nullish(),
    meta: metaSchema.nullish(),
    list: z.string().array().nullish(),
    images: imageSchema.array().nullish(),
    price: z.number().nullish(),
    compare_price: z.number().nullish(),
    collections: pathSchema('collections').array().nullish(),
    button: buttonSchema.nullish(),
  })
  .strict()

export type ProductSchema = z.infer<typeof productSchema>
