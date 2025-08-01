import { z } from "zod"

export const imageSchema = z
  .object({
    src: z.string(),
    alt: z.string(),
    title: z.string(),
  })
  .partial()
  .strict()

export const linkSchema = z
  .object({
    href: z.string(),
    text: z.string(),
    variant: z.enum(["default", "outline", "secondary", "ghost", "link"]),
  })
  .partial()
  .strict()

export const menuSchema = linkSchema
  .extend({
    links: linkSchema.array(),
  })
  .partial()
  .strict()

export const seoSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    image: z.any(),
  })
  .partial()
  .strict()

export const formSchema = z
  .object({
    inbox: z.string(),
    action: z.string(),
    fields: z.any(),
    submit: z.string(),
  })
  .partial()
  .strict()

export const priceSchema = z.object({
  base: z.number().nullable(),
  compare: z.number().nullable(),
  unit: z.string(),
})

export const itemSchema = z
  .object({
    id: z.string(),
    href: z.string(),
    block: z.string(),
    published: z.date(),
    title: z.string(),
    description: z.string(),
    chip: linkSchema,
    tagline: z.string(),
    link: linkSchema,
    links: linkSchema.array(),
    icon: z.enum(["check", "cross"]),
    rating: z.number().min(0).max(5).step(0.25),
    image: imageSchema,
    images: imageSchema.array(),
    price: priceSchema,
    prices: priceSchema.array(),
    social: z.string(),
    socials: z.string().array(),
    menu: menuSchema,
    menus: menuSchema.array(),
    list: z.string().array(),
    form: formSchema,
    html: z.string(),
    markdown: z.string(),
  })
  .partial()
  .strict()

export const globSchema = z.string()
export const referenceSchema = z.string().startsWith("/src/content/")

export const blockSchema = itemSchema
  .extend({
    items: z.union([itemSchema.array(), referenceSchema.array(), globSchema]),
  })
  .partial()
  .strict()

export const pageSchema = blockSchema
  .extend({
    layout: z.string(),
    banner: blockSchema,
    header: blockSchema,
    blocks: blockSchema.array(),
    footer: blockSchema,
    legal: blockSchema,
    bubble: z.string(),
    seo: seoSchema,
    css: z.string(),
    head: z.string(),
    body: z.string(),
  })
  .partial()
  .strict()

export type SeoSchema = z.infer<typeof seoSchema>
export type ImageSchema = z.infer<typeof imageSchema>
export type GlobSchema = z.infer<typeof globSchema>
export type ReferenceSchema = z.infer<typeof referenceSchema>
export type ItemSchema = z.infer<typeof itemSchema>
export type BlockSchema = z.infer<typeof blockSchema>
export type PageSchema = z.infer<typeof pageSchema>
