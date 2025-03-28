import { GitContentSource } from "@stackbit/cms-git"
import { defineStackbitConfig } from "@stackbit/types"
import config from "src/data/config.json"
import { collectionModel } from "stackbit/blocks/collection-model"
import { collectionsModel } from "stackbit/blocks/collections-model"
import { contactModel } from "stackbit/blocks/contact-model"
import { contentModel } from "stackbit/blocks/content-model"
import { ctaModel } from "stackbit/blocks/cta-model"
import { faqsModel } from "stackbit/blocks/faqs-model"
import { featuresModel } from "stackbit/blocks/features-model"
import { heroModel } from "stackbit/blocks/hero-model"
import { locationModel } from "stackbit/blocks/location-model"
import { locationsModel } from "stackbit/blocks/locations-model"
import { mediaModel } from "stackbit/blocks/media-model"
import { pagesModel } from "stackbit/blocks/pages-model"
import { personModel } from "stackbit/blocks/person-model"
import { personsModel } from "stackbit/blocks/persons-model"
import { postModel } from "stackbit/blocks/post-model"
import { postsModel } from "stackbit/blocks/posts-model"
import { pricingsModel } from "stackbit/blocks/pricings-model"
import { productModel } from "stackbit/blocks/product-model"
import { productsModel } from "stackbit/blocks/products-model"
import { reviewsModel } from "stackbit/blocks/reviews-model"

const allModels = [
  collectionModel,
  collectionsModel,
  contactModel,
  contentModel,
  ctaModel,
  faqsModel,
  featuresModel,
  heroModel,
  locationModel,
  locationsModel,
  mediaModel,
  pagesModel,
  personModel,
  personsModel,
  postModel,
  postsModel,
  pricingsModel,
  productModel,
  productsModel,
  reviewsModel,
]

const filteredModels = allModels.filter((model) => {
  return model.name in config.blocks
})

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "custom",
  nodeVersion: "18",
  devCommand: "node_modules/.bin/astro dev --port {PORT} --hostname 127.0.0.1",
  experimental: {
    ssg: {
      name: "Astro",
      logPatterns: {
        up: ["is ready", "astro"],
      },
      directRoutes: {
        "socket.io": "socket.io",
      },
      passthrough: ["/vite-hmr/**"],
    },
  },
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["src/content"],
      models: filteredModels,
      assetsConfig: {
        referenceType: "static",
        staticDir: "public",
        uploadDir: "images",
        publicPath: "/",
      },
    }),
  ],
  presetSource: {
    type: "files",
    presetDirs: ["./stackbit/presets"],
  },
})
