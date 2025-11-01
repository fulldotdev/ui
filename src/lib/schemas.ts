import { z } from "astro:schema"

const link = z
  .object({
    text: z.string(),
    href: z.string(), // Use trailing slash for internal links
    target: z.string(), // Use _blank for external links
  })
  .partial()
  .strict()

const button = link
  .extend({
    variant: z.enum(["default", "outline", "secondary", "ghost", "link"]),
  })
  .partial()
  .strict()

const image = z
  .object({
    src: z.string(), // Local images in /src/assets/ can be referenced as /myimage.webp
    alt: z.string(),
    title: z.string(),
  })
  .partial()
  .strict()

const logo = image
  .extend({
    href: z.string(),
  })
  .partial()
  .strict()

const form = z
  .object({
    inbox: z.string(),
    action: z.string(),
    fields: z.array(
      z
        .object({
          name: z.string(),
          type: z.string(),
          label: z.string(),
          placeholder: z.string(),
          required: z.boolean(),
          options: z.array(z.string()),
          value: z.string(),
        })
        .partial()
        .strict()
    ),
    submit: z.string(),
  })
  .partial()
  .strict()

const menu = link
  .extend({
    links: link.array(),
  })
  .partial()
  .strict()

const rating = z.number().min(0).max(5)

// Item - data structure for inline/referenced content
const item = z
  .object({
    href: z.string(),
    image: image,
    icon: z.string(),
    name: z.string(),
    tagline: z.string(),
    title: z.string(),
    description: z.string(),
    rating: rating,
    list: z.string().array(),
    button: button,
    price: z.string(),
    unit: z.string(),
    avatar: image,
    avatars: image.array(),
  })
  .partial()
  .strict()

// Reference patterns
const glob = z.string() // "services/" - matches all pages starting with path
const reference = z.string() // "services/my-service" - matches single page by id

// Items can be: glob "services/" | references ["id-1", "id-2"] | inline [{ title: "..." }]
const items = z.union([glob, reference.array(), item.array()])

// Section - content blocks (hero, cta, features, reviews, etc.)
const section = z
  .object({
    block: z.string(), // Block variant: "hero-1", "cta-2", "articles-1"
    id: z.string(),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    variant: z.enum(["default", "outline", "muted"]),
    order: z.enum(["default", "reverse"]),
    frame: z.enum(["default", "float", "inset"]),
    html: z.string(),
    buttons: button.array(),
    logos: logo.array(),
    image: image,
    form: form,
    socials: z.string().array(),
    item: item,
    items: items,
  })
  .partial()
  .strict()

// Page - can be simple block OR layout with sections
const page = z
  .object({
    layout: z.string(), // Reference to layout by name
    block: z.string(), // Block variant: "article-1", "person-3", "job-2"
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    variant: z.enum(["default", "outline", "muted"]),
    frame: z.enum(["default", "float", "inset"]),
    href: z.string(),
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    icon: z.string(),
    image: image,
    rating: rating,
    list: z.string().array(),
    price: z.string(),
    unit: z.string(),
    socials: z.string().array(),
    items: items,
    sections: section.array(),
    seo: z
      .object({
        title: z.string(),
        description: z.string(),
        image: image,
      })
      .partial()
      .strict(),
  })
  .partial()
  .strict()

// Layout blocks
const header = z
  .object({
    block: z.string(), // Block variant: "header-1", "header-2", "header-3"
    align: z.enum(["start", "center", "end"]),
    variant: z.enum(["default", "outline", "muted"]),
    logo: logo,
    buttons: button.array(),
    socials: z.string().array(),
    menus: menu.array(),
  })
  .partial()
  .strict()

const footer = z
  .object({
    block: z.string(), // Block variant: "footer-1", "footer-2", "footer-3"
    variant: z.enum(["default", "outline", "muted"]),
    logo: logo,
    description: z.string(),
    channels: link.array(), // Contact channels: email, phone, address
    socials: z.string().array(), // Social media URLs
    links: link.array(), // Links
    menus: menu.array(), // Site navigation menu columns
    policies: link.array(), // Legal policy links
    copyright: z.string(),
  })
  .partial()
  .strict()

const banner = z
  .object({
    block: z.string(), // Block variant: "banner-1", "banner-2", "banner-3"
    align: z.enum(["start", "center", "end"]),
    variant: z.enum(["default", "outline", "muted"]),
    html: z.string(), // HTML content with optional <a>, <b>, <i>, <u>, <s>
  })
  .partial()
  .strict()

// Layout - site-wide layout (referenced by pages via layout field)
const layout = z
  .object({
    title: z.string(), // Default SEO title
    description: z.string(), // Default SEO description
    image: image, // Default SEO image
    header: header,
    banner: banner,
    sections: section.array(),
    footer: footer,
    bubble: button, // Floating action button
    head: z.string(), // Custom <head> HTML
    body: z.string(), // Custom <body> HTML
    css: z.string(), // Custom CSS
  })
  .partial()
  .strict()

// exports are used in astro content collections. See src/content.config.ts
export { page, layout, header, footer, banner, section }

// Export for dynamic block rendering in src/components/block.astro
export type BlockSchema =
  | z.infer<typeof page>
  | z.infer<typeof section>
  | z.infer<typeof header>
  | z.infer<typeof footer>
  | z.infer<typeof banner>
