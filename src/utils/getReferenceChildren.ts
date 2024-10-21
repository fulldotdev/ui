import { getCollection, type CollectionEntry } from 'astro:content'

// Pages that reference the current page
export const getReferenceChildren = async (
  slug: CollectionEntry<'pages'>['slug']
) =>
  (
    await getCollection('pages', (page) =>
      page.data?.parents?.some((p: any) => p.slug === slug)
    )
  )?.map((page) => page.data)
