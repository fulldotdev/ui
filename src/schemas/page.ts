import { z } from "astro:schema"

import article from "@/schemas/blocks/article"
import job from "@/schemas/blocks/job"
import person from "@/schemas/blocks/person"
import product from "@/schemas/blocks/product"
import review from "@/schemas/blocks/review"
import section from "@/schemas/section"

export default z.discriminatedUnion("type", [
  z.object({
    type: z.literal(undefined),
    sections: section.array().optional(),
  }),
  z.object({
    type: z.literal("article"),
    sections: section.array().optional(),
    ...article.shape,
  }),
  z.object({
    type: z.literal("job"),
    sections: section.array().optional(),
    ...job.shape,
  }),
  z.object({
    type: z.literal("person"),
    sections: section.array().optional(),
    ...person.shape,
  }),
  z.object({
    type: z.literal("product"),
    sections: section.array().optional(),
    ...product.shape,
  }),
  z.object({
    type: z.literal("review"),
    sections: section.array().optional(),
    ...review.shape,
  }),
])
