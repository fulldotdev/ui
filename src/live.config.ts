import { githubPagesLoader } from "@/loaders/github-pages-loader"
import { defineLiveCollection } from "astro:content"

import { pageSchema } from "@/schemas/page"

export const collections = {
  "github-pages": defineLiveCollection({
    loader: githubPagesLoader(),
    schema: pageSchema,
  }),
}
