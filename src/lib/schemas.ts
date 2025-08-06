import { z, type SchemaContext } from "astro:content"

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

export const seoSchema = ({ image }: SchemaContext) =>
  z
    .object({
      title: z.string(),
      description: z.string(),
      image: image(),
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

export const itemSchema = ({ image }: SchemaContext) =>
  z
    .object({
      slug: z.string(),
      image: image(),
      images: image().array(),
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
export const pathSchema = z.string()

export const blockSchema = (ctx: SchemaContext) =>
  itemSchema(ctx)
    .extend({
      items: itemSchema(ctx).array(),
      paths: pathSchema.array(),
      glob: globSchema,
    })
    .partial()
    .strict()

export const pageSchema = (ctx: SchemaContext) =>
  blockSchema(ctx)
    .extend({
      draft: z.boolean(),
      banner: blockSchema(ctx),
      header: blockSchema(ctx),
      blocks: blockSchema(ctx).array(),
      footer: blockSchema(ctx),
      legal: blockSchema(ctx),
      bubble: z.string(),
      css: z.string(),
      head: z.string(),
      body: z.string(),
      seo: seoSchema(ctx),
    })
    .partial()
    .strict()

export type GlobSchema = z.infer<typeof globSchema>
export type ItemSchema = z.infer<ReturnType<typeof itemSchema>>
export type BlockSchema = z.infer<ReturnType<typeof blockSchema>>
export type PageSchema = z.infer<ReturnType<typeof pageSchema>>
