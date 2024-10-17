import { getCollection, type CollectionEntry } from 'astro:content'

// Records that are in a folder with the current page's slug
export const getChildPages = async (slug: CollectionEntry<'pages'>['slug']) =>
  (
    await getCollection(
      'pages',
      (page) =>
        page.slug.startsWith(slug) &&
        page.slug !== slug &&
        !page.slug.replace(`${slug}/`, '').includes('/')
    )
  )?.map(({ slug, data }) => ({
    ...data,
    href: `/${slug}/`,
  }))
