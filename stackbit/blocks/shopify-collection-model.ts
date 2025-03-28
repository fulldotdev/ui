import { type PageModel } from "@stackbit/types"

export const shopifyCollectionModel = {
  name: "shopify-collection",
  type: "page",
  urlPath: "/{slug}",
  filePath: `src/content/pages/{slug}.md`,
  description: "Bewerk deze collectie in Shopify",
  readOnly: true,
  canDelete: false,
  hideContent: true,
  fields: [
    {
      name: "title",
      type: "text",
      required: false,
      readOnly: true,
    },
  ],
} satisfies PageModel
