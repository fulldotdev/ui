import type { FieldList } from "@stackbit/types"

export const sectionsField: FieldList = {
  name: "sections",
  type: "list",
  items: {
    type: "model",
    models: [
      "hero",
      "media",
      "cta",
      "faqs",
      "features",
      "pages",
      "posts",
      "products",
      "reviews",
      "persons",
    ],
  },
}
