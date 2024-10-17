import { getCollection, type CollectionEntry } from 'astro:content'

// Records that are in a folder with the current page's slug
export const getChildRecords = async (slug: CollectionEntry<'pages'>['slug']) =>
  (
    await getCollection(
      'records',
      (record) =>
        record.id.startsWith(slug) &&
        !record.id.replace(`${slug}/`, '').includes('/')
    )
  )?.map((record) => record.data)
