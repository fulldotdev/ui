import { type FieldList } from "@stackbit/types"
import config from "src/data/config.json"

const allModels = [
  "collection",
  "collections",
  "contact",
  "cta",
  "faqs",
  "features",
  "hero",
  "events",
  "locations",
  "media",
  "pages",
  "person",
  "persons",
  "posts",
  "pricings",
  "products",
  "reviews",
]

const filteredModels = allModels.filter((model) => {
  return (
    config.sections?.[model] &&
    config.sections?.[model as keyof typeof config.sections].variant
  )
})

export const sectionsField: FieldList = {
  name: "sections",
  label: "Secties",
  type: "list",
  items: {
    type: "reference",
    models: filteredModels,
  },
}
