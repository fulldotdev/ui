import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import config from "fulldev.config.json"
import { mapValues } from "remeda"

import { entrySchema, formSchema } from "@/lib/schemas"

export const collections = {
  forms: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{yml,yaml}",
      base: "src/content/forms",
    }),
    schema: formSchema,
  }),
  ...mapValues(config, (_, collection) =>
    defineCollection({
      loader: glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: `src/content/${collection}`,
      }),
      schema: entrySchema,
    })
  ),
}
