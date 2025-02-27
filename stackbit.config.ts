import { GitContentSource } from '@stackbit/cms-git'
import { defineStackbitConfig } from '@stackbit/types'
import { CollectionModel } from 'stackbit/layouts/Collection'
import { CollectionsModel } from 'stackbit/blocks/Collections'
import { ContactModel } from 'stackbit/blocks/Contact'
import { ContentModel } from 'stackbit/blocks/Content'
import { CtaModel } from 'stackbit/blocks/Cta'
import { FaqsModel } from 'stackbit/blocks/Faqs'
import { FeaturesModel } from 'stackbit/blocks/Features'
import { HeroModel } from 'stackbit/blocks/Hero'
import { HomeModel } from 'stackbit/layouts/Home'
import { IntroModel } from 'stackbit/blocks/Intro'
import { PageModel } from 'stackbit/blocks/Page'
import { PostModel } from 'stackbit/layouts/Post'
import { PostsModel } from 'stackbit/blocks/Posts'
import { ProductModel } from 'stackbit/layouts/Product'
import { ProductsModel } from 'stackbit/blocks/Products'
import { ReviewsModel } from 'stackbit/blocks/Reviews'

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'custom',
  nodeVersion: '18',
  devCommand: 'node_modules/.bin/astro dev --port {PORT} --hostname 127.0.0.1',
  experimental: {
    ssg: {
      name: 'Astro',
      logPatterns: {
        up: ['is ready', 'astro'],
      },
      directRoutes: {
        'socket.io': 'socket.io',
      },
      passthrough: ['/vite-hmr/**'],
    },
  },
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['src/content'],
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
        PostModel,
        PostsModel,
        ProductModel,
        ProductsModel,
        ReviewsModel,
      ],
      assetsConfig: {
        referenceType: 'static',
        staticDir: 'public',
        uploadDir: 'images',
        publicPath: '/',
      },
    }),
  ],
})
