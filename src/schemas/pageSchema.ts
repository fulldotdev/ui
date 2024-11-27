import { z } from 'astro:content'
import categoryLayout from 'fulldev-ui/schemas/layouts/categoryLayout'
import docsLayout from 'fulldev-ui/schemas/layouts/docsLayout'
import pageLayout from 'fulldev-ui/schemas/layouts/pageLayout'
import policyLayout from 'fulldev-ui/schemas/layouts/policyLayout'
import postLayout from 'fulldev-ui/schemas/layouts/postLayout'
import productLayout from 'fulldev-ui/schemas/layouts/productLayout'

export default z.union([
  pageLayout,
  postLayout,
  policyLayout,
  docsLayout,
  categoryLayout,
  productLayout,
])
