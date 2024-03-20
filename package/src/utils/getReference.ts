import {
  getCollection,
  type CollectionEntry,
  type CollectionKey,
  type ContentCollectionKey,
} from 'astro:content'

// TODO support data collections, support id's, support zod references

type Entry = {
  collection?: ContentCollectionKey
  slug?: CollectionEntry<ContentCollectionKey>['slug']
}
type Collection = {
  [Key in 'collection' | 'cards' | 'entries']?: ContentCollectionKey
}
type Entries = {
  [Key in CollectionKey]?: CollectionEntry<ContentCollectionKey>['slug'][]
}

const isEntry = (object: GetReference & object): object is Entry =>
  object['collection'] && object['slug'] ? true : false

const isCollection = (object: GetReference & object): object is Entry =>
  object['collection'] || object['cards'] || object['entries'] ? true : false

const isEntries = (object: GetReference & object): object is Entries =>
  Object.keys(object).some((key) => key in CollectionKey)

export type GetReference = Collection & Entry & Entries
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
