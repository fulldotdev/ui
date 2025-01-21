import { z } from 'astro:content'
import { blockSchema } from 'fulldev-ui/schemas/block.ts'
import { buttonSchema } from 'fulldev-ui/schemas/button.ts'
import { formSchema } from 'fulldev-ui/schemas/form.ts'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'
import { pathSchema } from 'fulldev-ui/schemas/path.ts'
import { seoSchema } from 'fulldev-ui/schemas/seo.ts'

export const pageSchema = z
  .object({
    _schema: z.string().optional(),
    block: z.string().optional(),
    variant: z.number().optional(),
    slug: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    list: z.string().array().optional(),
    image: imageSchema.optional(),
    images: imageSchema.array().optional(),
    button: buttonSchema.optional(),
    buttons: buttonSchema.array().optional(),
    price: z.number().optional(),
    soldout: z.boolean().optional(),
    variants: z.record(z.string(), z.string().array()).optional(),
    categories: pathSchema('pages').array().optional(),
    form: formSchema.optional(),
    sections: blockSchema.array().optional(),
    seo: seoSchema.optional(),
    code: z.string().optional(),
  })
  .strict()

export type PageSchema = z.infer<typeof pageSchema>
