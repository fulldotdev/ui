import { GitContentSource } from "@stackbit/cms-git"
import { defineStackbitConfig } from "@stackbit/types"
import { CollectionsModel } from "stackbit/blocks/Collections"
import { ContactModel } from "stackbit/blocks/Contact"
import { ContentModel } from "stackbit/blocks/Content"
import { CtaModel } from "stackbit/blocks/Cta"
import { FaqsModel } from "stackbit/blocks/Faqs"
import { FeaturesModel } from "stackbit/blocks/Features"
import { HeroModel } from "stackbit/blocks/Hero"
import { IntroModel } from "stackbit/blocks/Intro"
import { PageModel } from "stackbit/blocks/Page"
import { ProductsModel } from "stackbit/blocks/Products"
import { ReviewsModel } from "stackbit/blocks/Reviews"
import { ArticleModel } from "stackbit/layouts/Article"
import { CollectionModel } from "stackbit/layouts/Collection"
import { HomeModel } from "stackbit/layouts/Home"
import { ProductModel } from "stackbit/layouts/Product"

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
        CollectionModel,
        CollectionsModel,
        ContactModel,
        ContentModel,
        CtaModel,
        FaqsModel,
        FeaturesModel,
        // FooterModel,
        // HeaderModel,
        HomeModel,
        HeroModel,
        IntroModel,
        PageModel,
        ArticleModel,
        ProductModel,
        ProductsModel,
        ReviewsModel,
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
