import { z, type SchemaContext } from "astro:content"

const BLOCK_IDS = Object.keys(
  import.meta.glob("src/components/blocks/**/*.astro")
)
  .map((path) => path.split("/").pop()?.split(".")[0])
  .filter((id) => id !== "index")

const blockKey = z.string().refine(
  (id) => BLOCK_IDS.includes(id),
  (id) => ({ message: `Block ${id} not found` })
)

const link = z
  .object({
    text: z.string().optional(),
    href: z.string().optional(), // internal: trailing slash; external: full URL
    icon: z.string().optional(),
    target: z.string().optional(), // _blank for external
  })
  .strict()

const media = ({ image }: SchemaContext) =>
  z
    .object({
      src: image(), // local relative: ../../assets/image.webp; remote: full URL
      alt: z.string().optional(),
    })
    .strict()

const form = z
  .object({
    action: z.string(),
    submit: z.string(), // submit button label
    inbox: z.string().optional(), // CloudCannon inbox key
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
          label: z.string().optional(),
          placeholder: z.string().optional(),
          required: z.boolean().optional(),
          value: z.string().optional(),
          options: z.array(z.string()).optional(),
        })
        .strict()
    ),
  })
  .strict()

const menu = z
  .object({
    text: z.string(),
    href: z.string().optional(),
    target: z.string().optional(),
    links: link.array().optional(),
  })
  .strict()

const rating = z.number().min(0).max(5)

const ref = z.string() // id: "services/my-service"
const glob = z.string() // glob: "services/"

// ============================================================
// HIERARCHY: item → tile → block → page
// ============================================================

const item = (ctx: SchemaContext) =>
  z
    .object({
      href: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      tagline: z.string().optional(),
      icon: z.string().optional(),
      buttons: link.array().max(2).optional(),
      rating: rating.optional(),
      image: media(ctx).optional(),
      images: media(ctx).array().optional(),
      avatar: media(ctx).optional(),
      avatars: media(ctx).array().optional(),
    })
    .strict()

const tile = (ctx: SchemaContext) =>
  item(ctx)
    .extend({
      list: z.string().array().optional(),
      price: z.string().optional(),
      unit: z.string().optional(),
      video: media(ctx).optional(),
      html: z.string().optional(),
      item: item(ctx).optional(),
      itemRef: ref.optional(),
    })
    .strict()

const block = (ctx: SchemaContext) =>
  tile(ctx)
    .extend({
      block: blockKey,
      id: z.string().optional(),
      logo: media(ctx).optional(),
      logos: media(ctx).array().optional(),
      menus: menu.array().optional(),
      links: link.array().optional(),
      channels: link.array().optional(),
      policies: link.array().optional(),
      socials: z.string().array().optional(),
      copyright: z.string().optional(),
      form: form.optional(),
      items: item(ctx).array().optional(),
      itemsGlob: glob.optional(),
      itemsRefs: ref.array().optional(),
      tile: tile(ctx).optional(),
      tileRef: ref.optional(),
      tiles: tile(ctx).array().optional(),
      tilesGlob: glob.optional(),
      tilesRefs: ref.array().optional(),
    })
    .strict()

const page = (ctx: SchemaContext) =>
  block(ctx)
    .omit({ block: true })
    .extend({
      block: blockKey.optional(),
      layout: z.string().optional(),
      sections: block(ctx).array().optional(),
      seo: z
        .object({
          title: z.string(),
          description: z.string(),
          image: media(ctx).optional(),
        })
        .strict()
        .optional(),
    })
    .strict()

const layout = (ctx: SchemaContext) =>
  block(ctx)
    .omit({ block: true })
    .extend({
      block: blockKey.optional(),
      header: block(ctx).optional(),
      banner: block(ctx).optional(),
      sections: block(ctx).array().optional(),
      footer: block(ctx).optional(),
      seo: z
        .object({
          title: z.string(),
          description: z.string(),
          image: media(ctx).optional(),
        })
        .strict()
        .optional(),
      bubble: link.optional(),
      head: z.string().optional(),
      body: z.string().optional(),
    })
    .strict()

// exports are used in astro content collections. See src/content.config.ts
export { block, page, layout }

// Export for dynamic block rendering in src/components/block.astro
export type BlockSchema = z.infer<ReturnType<typeof block>>
export type PageSchema = z.infer<ReturnType<typeof page>>
export type LayoutSchema = z.infer<ReturnType<typeof layout>>
