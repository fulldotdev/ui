import { getCollection, type CollectionEntry } from 'astro:content'

// Pages that reference the current page
export const getDeepReferenceChildren = async (
  slug: CollectionEntry<'pages'>['slug']
) =>
  (
    await getCollection('pages', (page) =>
      page.data?.parents?.some((p: any) => p.slug.includes(slug))
    )
  )?.map(({ slug, data }) => ({
    ...data,
    href: `/${slug}/`,
  }))
