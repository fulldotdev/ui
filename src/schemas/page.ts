import { z } from "astro:schema"

import article from "@/schemas/blocks/article"
import job from "@/schemas/blocks/job"
import person from "@/schemas/blocks/person"
import product from "@/schemas/blocks/product"
import review from "@/schemas/blocks/review"
import section from "@/schemas/section"
import image from "@/schemas/ui/image"

export default z.discriminatedUnion("type", [
  z.object({
    layout: z.string().optional(),
    type: z.literal(undefined),
    block: z.string().optional(),
    id: z.string().optional(),
    class: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: image.optional(),
    sections: section.array().optional(),
  }),
  z.object({
    layout: z.string().optional(),
    type: z.literal("article"),
    ...article.shape,
    sections: section.array().optional(),
  }),
  z.object({
    layout: z.string().optional(),
    type: z.literal("job"),
    ...job.shape,
    sections: section.array().optional(),
  }),
  z.object({
    layout: z.string().optional(),
    type: z.literal("person"),
    ...person.shape,
    sections: section.array().optional(),
  }),
  z.object({
    layout: z.string().optional(),
    type: z.literal("product"),
    ...product.shape,
    sections: section.array().optional(),
  }),
  z.object({
    layout: z.string().optional(),
    type: z.literal("review"),
    ...review.shape,
    sections: section.array().optional(),
  }),
])
