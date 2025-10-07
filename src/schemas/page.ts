import { z } from "astro:schema"

import { article } from "@/schemas/blocks/article"
import { job } from "@/schemas/blocks/job"
import { person } from "@/schemas/blocks/person"
import { product } from "@/schemas/blocks/product"
import { review } from "@/schemas/blocks/review"
import { description } from "@/schemas/fields/description"
import { image } from "@/schemas/fields/image"
import { title } from "@/schemas/fields/title"
import { section } from "@/schemas/section"

export const page = z.discriminatedUnion("type", [
  z
    .object({
      type: z.undefined(),
      title,
      description,
      image,
      sections: section.array(),
    })
    .partial()
    .strict(),
  article
    .merge(
      z.object({
        title,
        description,
        image,
        sections: section.array(),
      })
    )
    .extend({
      type: z.literal("article"),
    })
    .partial()
    .strict(),
  product
    .merge(
      z.object({
        title,
        description,
        image,
        sections: section.array(),
      })
    )
    .extend({
      type: z.literal("product"),
    })
    .partial()
    .strict(),
  person
    .merge(
      z.object({
        title,
        description,
        image,
        sections: section.array(),
      })
    )
    .extend({
      type: z.literal("person"),
    })
    .partial()
    .strict(),
  review
    .merge(
      z.object({
        title,
        description,
        image,
        sections: section.array(),
      })
    )
    .extend({
      type: z.literal("review"),
    })
    .partial()
    .strict(),
  job
    .merge(
      z.object({
        title,
        description,
        image,
        sections: section.array(),
      })
    )
    .extend({
      type: z.literal("job"),
    })
    .partial()
    .strict(),
])
