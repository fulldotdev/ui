import { GitContentSource } from "@stackbit/cms-git"
import { defineStackbitConfig } from "@stackbit/types"
import { ctaModel } from "stackbit/blocks/Cta"
import { faqsModel } from "stackbit/blocks/Faqs"
import { featuresModel } from "stackbit/blocks/Features"
import { heroModel } from "stackbit/blocks/hero"
import { mediaModel } from "stackbit/blocks/media"
import { pagesModel } from "stackbit/blocks/pages"
import { personsModel } from "stackbit/blocks/persons"
import { postsModel } from "stackbit/blocks/posts"
import { productsModel } from "stackbit/blocks/Products"
import { reviewsModel } from "stackbit/blocks/Reviews"
import { collectionModel } from "stackbit/content/collection"
import { homeModel } from "stackbit/content/home"
import { locationModel } from "stackbit/content/location"
// import { CollectionsModel } from "stackbit/blocks/Collections"
// import { ContactModel } from "stackbit/blocks/Contact"
// import { ContentModel } from "stackbit/blocks/Content"
// import { CtaModel } from "stackbit/blocks/Cta"
// import { FaqsModel } from "stackbit/blocks/Faqs"
// import { FeaturesModel } from "stackbit/blocks/Features"
// import { HeroModel } from "stackbit/blocks/hero"
// import { IntroModel } from "stackbit/blocks/Intro"
// import { ProductsModel } from "stackbit/blocks/Products"
// import { ReviewsModel } from "stackbit/blocks/Reviews"
// import { CollectionModel } from "stackbit/content/collection"
import { pageModel } from "stackbit/content/page"
import { partnerModel, projectModel } from "stackbit/content/partner"
import { personModel } from "stackbit/content/person"
import { postModel } from "stackbit/content/post"
import { productModel } from "stackbit/content/product"

// import { ArticleModel } from "stackbit/content/post"
// import { ProductModel } from "stackbit/content/product"

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
      models: [
        // content
        homeModel,
        locationModel,
        pageModel,
        partnerModel,
        personModel,
        postModel,
        productModel,
        // blocks
        mediaModel,
        ctaModel,
        faqsModel,
        featuresModel,
        heroModel,
        pagesModel,
        postsModel,
        productsModel,
        reviewsModel,
        personsModel,
      ],
      assetsConfig: {
        referenceType: "static",
        staticDir: "public",
        uploadDir: "images",
        publicPath: "/",
      },
    }),
  ],
})
