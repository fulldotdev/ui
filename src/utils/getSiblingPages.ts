import { getCollection, type CollectionEntry } from 'astro:content'

// Pages that are in the same folder as the current page
export const getSiblingPages = async (slug: CollectionEntry<'pages'>['slug']) =>
  (
    await getCollection('pages', (page) => {
      const currentPageFolder = slug.split('/').slice(0, -1).join('/')
      const pageFolder = page.slug.split('/').slice(0, -1).join('/')
      return page.slug !== slug && pageFolder === currentPageFolder
    })
  )?.map(({ slug, data }) => ({
    ...data,
    href: `/${slug}/`,
  }))
