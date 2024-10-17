import { getCollection, type CollectionEntry } from 'astro:content'

// Pages that reference the current page
export const getReferencingPages = async (
  slug: CollectionEntry<'pages'>['slug']
) =>
  (
    await getCollection('pages', (page) =>
      page.data?.pages?.some((p: any) => p.slug === slug)
    )
  )?.map((page) => page.data)
