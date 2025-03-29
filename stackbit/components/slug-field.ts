import { type FieldSlug } from "@stackbit/types"

export const slugField: FieldSlug = {
  name: "slug",
  label: "URL  (zonder spaties of hoofdletters)",
  description: "bijvoorbeeld: 'blog/blog-titel'",
  type: "slug",
  required: true,
  hidden: true,
}
