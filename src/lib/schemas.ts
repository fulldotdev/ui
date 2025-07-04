import { reference, z, type CollectionKey } from "astro:content"

const noNull = <T>(value: T) => {
  if (value === null) return undefined
  return value
}

const pathSchema = <C extends CollectionKey>(collection: C) => {
  return z.preprocess((value) => {
    if (typeof value !== "string") return value
    const path = value.split(`/${collection}/`)[1]
    if (!path) return value
    const id = path.split(".")[0]
    return id
  }, reference(collection))
}

const imageSchema = z
  .object({
    src: z.string().nullish().transform(noNull),
    alt: z.string().nullish().transform(noNull),
    title: z.string().nullish().transform(noNull),
  })
  .strict()

const linkSchema = z
  .object({
    href: z.string().nullish().transform(noNull),
    text: z.string().nullish().transform(noNull),
    variant: z
      .enum(["default", "outline", "secondary", "ghost", "link"])
      .nullish()
      .transform(noNull),
    size: z
      .enum(["default", "sm", "lg", "xl", "icon"])
      .nullish()
      .transform(noNull),
  })
  .strict()

export const menuSchema = linkSchema
  .extend({
    links: linkSchema.array().nullish().transform(noNull),
  })
  .strict()

const seoSchema = z
  .object({
    title: z.string().nullish().transform(noNull),
    description: z.string().nullish().transform(noNull),
    image: z.any(),
    code: z.string().nullish().transform(noNull),
    head: z.string().nullish().transform(noNull),
    body: z.string().nullish().transform(noNull),
    css: z.string().nullish().transform(noNull),
  })
  .strict()

export const hoursSchema = z.object({
  title: z.string().nullish().transform(noNull),
  description: z.string().nullish().transform(noNull),
  ma: z.string().nullish().transform(noNull),
  di: z.string().nullish().transform(noNull),
  wo: z.string().nullish().transform(noNull),
  do: z.string().nullish().transform(noNull),
  vr: z.string().nullish().transform(noNull),
  za: z.string().nullish().transform(noNull),
  zo: z.string().nullish().transform(noNull),
})

export const formSchema = z.object({
  inbox: z.string().nullish().transform(noNull),
  action: z.string().nullish().transform(noNull),
  fields: z.any().nullish().transform(noNull),
  submit: z.string().nullish().transform(noNull),
  description: z.string().nullish().transform(noNull),
})

export const itemSchema = z
  .object({
    _schema: z.string().nullish().transform(noNull),
    href: z.string().nullish().transform(noNull),
    children: z.any().nullish().transform(noNull),
    title: z.string().nullish().transform(noNull),
    description: z.string().nullish().transform(noNull),
    image: imageSchema.nullish().transform(noNull),
    images: imageSchema.array().nullish().transform(noNull),
    avatar: imageSchema.nullish().transform(noNull),
    avatars: imageSchema.array().nullish().transform(noNull),
    logo: imageSchema.nullish().transform(noNull),
    logos: imageSchema.array().nullish().transform(noNull),
    published: z.date().nullish().transform(noNull),
    link: linkSchema.nullish().transform(noNull),
    links: linkSchema.array().nullish().transform(noNull),
    menu: menuSchema.nullish().transform(noNull),
    menus: menuSchema.array().nullish().transform(noNull),
    channels: z.any().nullish().transform(noNull),
    socials: z.string().array().nullish().transform(noNull),
    reverse: z.boolean().nullish().transform(noNull),
    rating: z.number().min(0).max(5).step(0.25).nullish().transform(noNull),
    when: z.string().nullish().transform(noNull),
    where: z.string().nullish().transform(noNull),
    copyright: z.string().nullish().transform(noNull),
    tagline: z.string().nullish().transform(noNull),
    list: z.string().array().nullish().transform(noNull),
    tags: z.string().array().nullish().transform(noNull),
    unit: z.string().nullish().transform(noNull),
    price: z.number().nullish().transform(noNull),
    prices: z
      .object({
        month: z.number().nullish().transform(noNull),
        year: z.number().nullish().transform(noNull),
        twoyears: z.number().nullish().transform(noNull),
      })
      .nullish()
      .transform(noNull),
    icon: z.enum(["check", "cross"]).nullish().transform(noNull),
    toc: z.any().nullish().transform(noNull),
  })
  .strict()

export const blockSchema = itemSchema.extend({
  block: z.string().nullish().transform(noNull),
  items: itemSchema.array().nullish().transform(noNull),
  hours: hoursSchema.nullish().transform(noNull),
  // Collection references
  articles: pathSchema("articles").array().nullish(),
  _articles: z.string().nullish(),
  events: pathSchema("events").array().nullish(),
  _events: z.string().nullish(),
  form: pathSchema("forms").nullish().transform(noNull),
  jobs: pathSchema("jobs").array().nullish(),
  _jobs: z.string().nullish(),
  locations: pathSchema("locations").array().nullish(),
  _locations: z.string().nullish(),
  pages: pathSchema("pages").array().nullish(),
  _pages: z.string().nullish(),
  persons: pathSchema("persons").array().nullish(),
  _persons: z.string().nullish(),
  policies: pathSchema("policies").array().nullish(),
  _policies: z.string().nullish(),
  reviews: pathSchema("reviews").array().nullish(),
  _reviews: z.string().nullish(),
  services: pathSchema("services").array().nullish(),
  _services: z.string().nullish(),
})

export const entrySchema = blockSchema.extend({
  draft: z.boolean().optional(),
  blocks: blockSchema.array().nullish().transform(noNull),
  seo: seoSchema.nullish().transform(noNull),
})

export type ItemSchema = z.infer<typeof itemSchema>
export type BlockSchema = z.infer<typeof blockSchema>
export type EntrySchema = z.infer<typeof entrySchema>
