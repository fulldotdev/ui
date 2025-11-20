import { z, type SchemaContext } from "astro:content"

const link = z
  .object({
    text: z.string(),
    href: z.string(), // internal: trailing slash; external: full URL
    icon: z.string(),
    target: z.string(), // _blank for external
  })
  .partial()
  .strict()

const image = ({ image }: SchemaContext) =>
  z
    .object({
      src: image(), // local relative: ../../assets/image.webp; remote: full URL
      alt: z.string(),
    })
    .partial()
    .strict()

const seo = (ctx: SchemaContext) =>
  z
    .object({
      title: z.string(),
      description: z.string(),
      image: image(ctx),
      noindex: z.boolean(),
      nofollow: z.boolean(),
      canonical: z.string(),
    })
    .partial()
    .strict()

const form = z
  .object({
    action: z.string(),
    submit: z.string(), // submit button label
    inbox: z.string(), // CloudCannon inbox key
    fields: z.array(
      z
        .object({
          type: z
            .enum([
              "text",
              "email",
              "textarea",
              "tel",
              "checkbox",
              "radio-group",
              "select",
            ])
            .default("text"),
          name: z.string(),
          label: z.string(),
          placeholder: z.string(),
          required: z.boolean(),
          value: z.string(),
          options: z.array(z.string()),
        })
        .partial()
        .strict()
    ),
  })
  .partial()
  .strict()

const menu = z
  .object({
    text: z.string(),
    href: z.string(),
    target: z.string(),
    links: link.array(),
  })
  .partial()
  .strict()

const rating = z.number().min(0).max(5)

// References
const ref = z.string() // path: "/src/content/pages/services/my-service.md"
const glob = z.string() // page folder: "services/"

const item = (ctx: SchemaContext) =>
  z
    .object({
      href: z.string(),
      html: z.string(),
      name: z.string(),
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
      tagline: z.string(),
      icon: z.string(),
      image: image(ctx),
      images: image(ctx).array(),
      links: link.array(),
      rating: rating,
      price: z.string().or(z.number()),
      unit: z.string(),
      socials: z.string().array(),
      list: z.string().array(),
      video: z.string(),
    })
    .partial()
    .strict()

const block = (ctx: SchemaContext) =>
  item(ctx)
    .extend({
      block: z.string(),
      id: z.string(),
      class: z.string(),
      menus: menu.array(),
      form: form,
      item: item(ctx),
      ref: ref,
      items: item(ctx)
        .extend({
          item: item(ctx),
          ref: ref,
          items: item(ctx).array(),
          refs: ref.array(),
          glob: glob,
        })
        .partial()
        .strict()
        .array(),
      refs: ref.array(),
      glob: glob,
    })
    .partial()
    .strict()

const page = (ctx: SchemaContext) =>
  block(ctx)
    .extend({
      block: z.string(),
      layout: z.string(),
      headers: block(ctx).array(),
      sections: block(ctx).array(),
      footers: block(ctx).array(),
      seo: seo(ctx),
    })
    .partial()
    .strict()

// exports are used in astro content collections. See src/content.config.ts
export { block, page }

// Export for dynamic block rendering in src/components/block.astro
export type BlockSchema = z.infer<ReturnType<typeof block>>
export type PageSchema = z.infer<ReturnType<typeof page>>
