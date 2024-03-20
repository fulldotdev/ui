import {
  getCollection,
  type CollectionEntry,
  type CollectionKey,
  type ContentCollectionKey,
} from 'astro:content'

// TODO support data collections
// TODO support id's
// TODO support zod references

export type EntrySlug = CollectionEntry<ContentCollectionKey>['slug']

type Collection = {
  [Key in 'collection' | 'cards' | 'entries']?: ContentCollectionKey
}

type Entries = {
  [Key in CollectionKey]?: EntrySlug[]
}

export type GetReference = Collection & Entry & Entries

type Entry = {
  collection?: ContentCollectionKey
  slug?: EntrySlug
}

const isEntry = (object: GetReference & object): object is Entry => {
  return 'slug' in object && 'collection' in object
}

export const getReference = async (object: GetReference & object) => {
  const strings = [
    ...Object.keys(object),
    ...Object.values(object).filter((value) => typeof value === 'string'),
  ]
  const collections = strings.map((string) => getCollection(string))
  const resolvedCollections = await Promise.all(collections)

  // const collections = keys.filter((key) => key in CollectionKey)
  // collection = reference?.collection ?? collection
  // slug = reference?.slug ?? slug

  // if (!collection || !slug) return
  // return { collection, slug }
}

// export const getReference = ({
//   collection,
//   slug,
//   reference,
// }: GetReference): Return => {
//   collection = reference?.collection ?? collection
//   slug = reference?.slug ?? slug

//   if (!collection || !slug) return
//   return { collection, slug }
// }
