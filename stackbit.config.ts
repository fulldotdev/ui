import { GitContentSource } from '@stackbit/cms-git'
import { defineStackbitConfig } from '@stackbit/types'
import { CollectionModel } from 'stackbit/models/Collection'
import { CollectionFeedModel } from 'stackbit/models/CollectionFeed'
import { CollectionSelectionModel } from 'stackbit/models/CollectionSelection'
import { ContactModel } from 'stackbit/models/Contact'
import { ContentModel } from 'stackbit/models/Content'
import { CtaModel } from 'stackbit/models/Cta'
import { FaqsModel } from 'stackbit/models/Faqs'
import { FeaturesModel } from 'stackbit/models/Features'
import { HeroModel } from 'stackbit/models/Hero'
import { HomeModel } from 'stackbit/models/Home'
import { IntroModel } from 'stackbit/models/Intro'
import { PageModel } from 'stackbit/models/Page'
import { PostModel } from 'stackbit/models/Post'
import { PostFeedModel } from 'stackbit/models/PostFeed'
import { PostSelectionModel } from 'stackbit/models/PostSelection'
import { ProductModel } from 'stackbit/models/Product'
import { ProductFeedModel } from 'stackbit/models/ProductFeed'
import { ProductSelectionModel } from 'stackbit/models/ProductSelection'
import { ReviewsModel } from 'stackbit/models/Reviews'

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
        CollectionFeedModel,
        CollectionSelectionModel,
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
        PostFeedModel,
        PostSelectionModel,
        ProductModel,
        ProductFeedModel,
        ProductSelectionModel,
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
