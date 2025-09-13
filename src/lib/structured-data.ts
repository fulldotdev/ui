import {
  reference,
  z,
  type CollectionEntry,
  type CollectionKey,
} from "astro:content"

// ------------------------------------------------------------
// Fields
// ------------------------------------------------------------

const pathSchema = <T extends CollectionKey = CollectionKey>(collection: T) =>
  z.preprocess((value) => {
    if (typeof value === "string") {
      const folder = value.split(`/${collection}/`)[0]
      const path = folder.replace(`${folder}/${collection}/`, "")
      const slug = path.split(".")[0]
      const id = slug?.replace("/index", "")
      return id
    }
    return value
  }, reference(collection))

const imageSchema = z
  .object({
    src: z.string(),
    alt: z.string(),
    title: z.string(),
  })
  .partial()
  .strict()

const linkSchema = z
  .object({
    href: z.string(),
    text: z.string(),
    variant: z.string(),
    target: z.string(),
  })
  .partial()
  .strict()

const formSchema = z
  .object({
    inbox: z.string(),
    action: z.string(),
    fields: z.any(),
    submit: z.string(),
  })
  .partial()
  .strict()

const itemSchema = z
  .object({
    image: imageSchema,
    icon: z.enum(["check", "cross"]),
    title: z.string(),
    description: z.string(),
    links: linkSchema.array(),
  })
  .partial()
  .strict()

// ------------------------------------------------------------
// Blocks
// ------------------------------------------------------------

export const heroSchema = z
  .object({
    size: z.enum(["sm", "default", "lg"]),
    background: z.string(),
    chip: linkSchema,
    reviews: pathSchema("reviews"),
    html: z.string(),
    links: linkSchema.array(),
    image: imageSchema,
    images: imageSchema,
    items: itemSchema.array(),
  })
  .partial()
  .strict()

export const contactSchema = z
  .object({
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linkSchema.array(),
    image: imageSchema,
    images: imageSchema.array(),
    form: formSchema,
    email: z.string().email(),
    phone: z.number(),
    address: z.string(),
    socials: z.string().array(),
  })
  .partial()
  .strict()

export const contentSchema = z
  .object({
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linkSchema.array(),
    image: imageSchema,
  })
  .partial()
  .strict()

export const ctaSchema = z
  .object({
    size: z.enum(["sm", "default", "lg"]),
    background: z.string(),
    reviews: pathSchema("reviews"),
    html: z.string(),
    links: linkSchema.array(),
    image: imageSchema,
  })
  .partial()
  .strict()

export const reviewsSchema = z
  .object({
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linkSchema.array(),
    reviews: pathSchema("reviews").array(),
  })
  .partial()
  .strict()

export const collectionsSchema = z
  .object({
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linkSchema.array(),
    collections: reference("collections").array(),
  })
  .partial()
  .strict()

export const productsSchema = z
  .object({
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linkSchema.array(),
    products: reference("products").array(),
    collection: reference("collections"),
  })
  .partial()
  .strict()

export const articlesSchema = z
  .object({
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linkSchema.array(),
    articles: pathSchema("articles").array(),
    blog: pathSchema("blogs"),
  })
  .partial()
  .strict()

export const personsSchema = z
  .object({
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linkSchema.array(),
    persons: pathSchema("persons").array(),
  })
  .partial()
  .strict()

export const faqsSchema = z
  .object({
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linkSchema.array(),
    faqs: z
      .object({
        question: z.string(),
        answer: z.string(),
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()

export const itemsSchema = z
  .object({
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linkSchema.array(),
    items: itemSchema.array(),
  })
  .partial()
  .strict()

export const blockSchema = z.discriminatedUnion("type", [
  heroSchema.extend({ type: z.literal("hero") }),
  contactSchema.extend({ type: z.literal("contact") }),
  contentSchema.extend({ type: z.literal("content") }),
  ctaSchema.extend({ type: z.literal("cta") }),
  reviewsSchema.extend({ type: z.literal("reviews") }),
  collectionsSchema.extend({ type: z.literal("collections") }),
  productsSchema.extend({ type: z.literal("products") }),
  articlesSchema.extend({ type: z.literal("articles") }),
  personsSchema.extend({ type: z.literal("persons") }),
  faqsSchema.extend({ type: z.literal("faqs") }),
  itemsSchema.extend({ type: z.literal("items") }),
])

// ------------------------------------------------------------
// Pages
// ------------------------------------------------------------

export const reviewSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    tagline: z.string(),
    rating: z.number().min(1).max(5),
    image: imageSchema,
  })
  .partial()
  .strict()

export const pageSchema = z
  .object({
    draft: z.boolean(),
    slug: z.string(),
    dateCreated: z.date(),
    datePublished: z.date(),
    dateModified: z.date(),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    blocks: blockSchema.array(),
    seo: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .partial()
      .strict(),
  })
  .partial()
  .strict()

export const personSchema = pageSchema
  .extend({
    email: z.string().email(),
    phone: z.number(),
    address: z.string(),
  })
  .partial()
  .strict()

export const collectionSchema = pageSchema.extend({
  products: reference("products").array(),
})

export const blogSchema = pageSchema.extend({
  articles: pathSchema("articles").array(),
})

export const productSchema = pageSchema
  .extend({
    category: z.string(),
    offers: z
      .object({
        price: z.union([z.number(), z.string()]),
        priceCurrency: z.string(),
      })
      .partial()
      .strict(),
    variants: z.any(),
  })
  .partial()
  .strict()

export const articleSchema = pageSchema
  .extend({
    author: pathSchema("persons"),
  })
  .partial()
  .strict()

// ------------------------------------------------------------
// Layouts
// ------------------------------------------------------------

export const layoutSchema = z
  .object({
    banner: z.any(),
    header: z.any(),
    blocks: blockSchema.array(),
    footer: z.any(),
    bubble: linkSchema,
  })
  .partial()
  .strict()
