export const shopifySectionSchema = z.object({
  type: z.enum([
    "hero",
    "media",
    "cta",
    "faqs",
    "contact",
    "products",
    "collections",
  ]),
  fields: z
    .object({
      key: z.string(),
      value: z.string(),
      reference: z
        .object({
          image: shopifyImageSchema,
        })
        .nullable(),
      references: z.object({
        nodes: shopifyProductSchema.array(),
      }),
      // references: z
      //   .object({
      //     nodes: z
      //       .discriminatedUnion("type", [
      //         shopifyProductSchema.extend({
      //           type: z.literal("product"),
      //         }),
      //         shopifyCollectionSchema.extend({
      //           type: z.literal("collection"),
      //         }),
      //       ])
      //       .array(),
      //   })
      //   .nullable(),
    })
    .array(),
})
