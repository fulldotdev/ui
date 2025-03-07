import { collectionsLoader } from "@/loaders/collections-loader"
import { locationsLoader } from "@/loaders/locations-loader"
import { pagesLoader } from "@/loaders/pages-loader"
import { personsLoader } from "@/loaders/persons-loader"
import { postsLoader } from "@/loaders/posts-loader"
import { productsLoader } from "@/loaders/products-loader"
import { projectsLoader } from "@/loaders/projects-loader"
import { reviewsLoader } from "@/loaders/reviews-loader"
import { defineCollection } from "astro:content"

export const collections = {
  pages: defineCollection({
    loader: pagesLoader(),
  }),
  locations: defineCollection({
    loader: locationsLoader(),
  }),
  persons: defineCollection({
    loader: personsLoader(),
  }),
  projects: defineCollection({
    loader: projectsLoader(),
  }),
  reviews: defineCollection({
    loader: reviewsLoader(),
  }),
  products: defineCollection({
    loader: productsLoader(),
  }),
  collections: defineCollection({
    loader: collectionsLoader(),
  }),
  posts: defineCollection({
    loader: postsLoader(),
  }),
}
