import { type FieldList } from "@stackbit/types"

export const sectionsField: FieldList = {
  name: "sections",
  type: "list",
  items: {
    type: "model",
    models: [
      "collections",
      "contact",
      "content",
      "cta",
      "faqs",
      "features",
      "hero",
      "locations",
      "media",
      "pages",
      "persons",
      "posts",
      "pricings",
      "products",
      "reviews",
    ],
  },
}
