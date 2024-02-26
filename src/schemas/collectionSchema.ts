import { z } from 'zod'

export const collectionSchema = z.object({
  scheme: z.string().nullish(),
  title: z.string().nullish(),
  description: z.string().nullish(),
  sections: z.array(z.any()).nullish(),
  image: z
    .object({
      src: z.string().nullish(),
      alt: z.string().nullish(),
    })
    .nullish(),
})

export type CollectionSchema = z.infer<typeof collectionSchema>

const shape = collectionSchema.shape
export const collectionSchemaWithDefaults = (
  defaults: Partial<CollectionSchema> = {}
) =>
  collectionSchema.extend({
    scheme: shape.scheme.default(defaults.scheme ?? null),
    title: shape.title.default(defaults.title ?? null),
    description: shape.description.default(defaults.description ?? null),
    sections: shape.sections.default(defaults.sections ?? null),
    image: shape.image.default(defaults.image ?? null),
  })
