import { type PageModel } from "@stackbit/types"

export const shopifyProductModel = {
  name: "shopify-product",
  type: "page",
  urlPath: "/{slug}",
  filePath: `src/content/pages/{slug}.md`,
  description: "Bewerk dit product in Shopify",
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
