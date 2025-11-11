import { z } from "astro:schema"

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
    href: z.string(), // internal: trailing slash; external: full URL
    icon: z.string().optional(),
    target: z.string().optional(), // _blank for external
  })
  .strict()

const media = z
  .object({
    src: z.string(), // local: /image.webp; remote: full URL
    alt: z.string().optional(),
    title: z.string().optional(),
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
          type: z.enum([
            "text",
            "email",
            "textarea",
            "tel",
            "checkbox",
            "radio-group",
            "select",
          ]),
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

const glob = z.string() // glob: "services/"
const reference = z.string() // id: "services/my-service"

// ============================================================
// HIERARCHY: item → tile → block → page
// ============================================================

const item = z
  .object({
    href: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    tagline: z.string().optional(),
    icon: z.string().optional(),
    buttons: link.array().max(2).optional(),
    rating: rating.optional(),
    image: media.optional(),
    images: media.array().optional(),
    avatar: media.optional(),
    avatars: media.array().optional(),
  })
  .strict()

const items = z.union([glob, reference.array(), item.array()])

const tile = item
  .extend({
    list: z.string().array().optional(),
    price: z.string().optional(),
    unit: z.string().optional(),
    video: media.optional(),
    html: z.string().optional(),
    item: item.optional(),
  })
  .strict()

const tiles = z.union([glob, reference.array(), tile.array()])

const block = tile
  .extend({
    block: blockKey,
    id: z.string().optional(),
    logo: media.optional(),
    logos: media.array().optional(),
    menus: menu.array().optional(),
    links: link.array().optional(),
    channels: link.array().optional(),
    policies: link.array().optional(),
    socials: z.string().array().optional(),
    copyright: z.string().optional(),
    form: form.optional(),
    item: item.optional(),
    items: items.optional(),
    tile: tile.optional(),
    tiles: tiles.optional(),
  })
  .strict()

const blocks = z.union([reference, block]).array()

const page = block
  .omit({ block: true })
  .extend({
    block: blockKey.optional(),
    layout: z.string().optional(),
    sections: blocks.optional(),
    seo: z
      .object({
        title: z.string(),
        description: z.string(),
        image: media.optional(),
      })
      .strict()
      .optional(),
  })
  .strict()

const layout = block
  .omit({ block: true })
  .extend({
    block: blockKey.optional(),
    header: block.optional(),
    banner: block.optional(),
    sections: blocks.optional(),
    footer: block.optional(),
    seo: z
      .object({
        title: z.string(),
        description: z.string(),
        image: media.optional(),
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
export type BlockSchema = z.infer<typeof block> | z.infer<typeof page>
