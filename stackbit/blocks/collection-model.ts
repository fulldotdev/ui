import { type PageModel } from "@stackbit/types"
import { hasShopify } from "src/lib/has-shopify"
import { descriptionField } from "stackbit/components/description-field"
import { imageField } from "stackbit/components/image-field"
import { sectionsField } from "stackbit/components/sections-field"
import { seoField } from "stackbit/components/seo-field"
import { titleField } from "stackbit/components/title-field"

export const collectionModel = {
  name: "collection",
  label: "Collectie",
  type: "page",
  urlPath: "/{slug}",
  filePath: `src/content/pages/{slug}.md`,
  hideContent: hasShopify(),
  readOnly: hasShopify(),
  canDelete: !hasShopify(),
  fields: hasShopify()
    ? [
        {
          name: "title",
          type: "text",
          required: false,
          readOnly: true,
        },
      ]
    : [titleField, descriptionField, imageField, sectionsField, seoField],
} satisfies PageModel
