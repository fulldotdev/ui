import type {
  CollectionEntry,
  CollectionKey,
  ReferenceDataEntry,
} from "astro:content"
import { getCollection, getEntries, getEntry } from "astro:content"

import { getHref } from "@/lib/get-href"
import { type BlockSchema, type EntrySchema } from "@/lib/schemas"

function entryToItem(entry: CollectionEntry<CollectionKey>) {
  return {
    href: getHref(entry),
    ...entry.data,
  }
}

function entriesToItems(entries: CollectionEntry<CollectionKey>[]) {
  return entries.map(entryToItem).filter((e) => e !== undefined)
}

async function referenceToItem(
  reference?: ReferenceDataEntry<CollectionKey, string>
) {
  if (!reference) return undefined
  const entry = await getEntry(reference)
  if (!entry) return undefined
  return entryToItem(entry)
}

async function referencesToItems(
  references?: ReferenceDataEntry<CollectionKey, string>[] | null
) {
  if (!references) return []
  const entries = await getEntries(references)
  return entriesToItems(entries)
}

async function globsToItems(collection: CollectionKey, glob?: string | null) {
  if (!glob) return []
  const entries = await getCollection(collection, ({ id }) => {
    if (glob === "*") return true
    const matches = id.startsWith(glob)
    return matches
  })
  return entriesToItems(entries)
}

async function transformReferences({
  articles,
  _articles,
  events,
  _events,
  form,
  jobs,
  _jobs,
  locations,
  _locations,
  pages,
  _pages,
  persons,
  _persons,
  policies,
  _policies,
  reviews,
  _reviews,
  services,
  _services,
  ...object
}: BlockSchema | EntrySchema) {
  return {
    form: await referenceToItem(form),
    items: [
      ...(await referencesToItems(articles)),
      ...(await globsToItems("articles", _articles)),
      ...(await referencesToItems(events)),
      ...(await globsToItems("events", _events)),
      ...(await referencesToItems(jobs)),
      ...(await globsToItems("jobs", _jobs)),
      ...(await referencesToItems(locations)),
      ...(await globsToItems("locations", _locations)),
      ...(await referencesToItems(pages)),
      ...(await globsToItems("pages", _pages)),
      ...(await referencesToItems(persons)),
      ...(await globsToItems("persons", _persons)),
      ...(await referencesToItems(policies)),
      ...(await globsToItems("policies", _policies)),
      ...(await referencesToItems(reviews)),
      ...(await globsToItems("reviews", _reviews)),
      ...(await referencesToItems(services)),
      ...(await globsToItems("services", _services)),
    ],
    ...object,
  }
}

export async function transformBlock(block: BlockSchema) {
  return await transformReferences(block)
}

export async function transformEntry({
  data: { blocks, ...data },
  ...entry
}: CollectionEntry<
  | "articles"
  | "events"
  | "jobs"
  | "locations"
  | "pages"
  | "persons"
  | "policies"
  | "services"
>) {
  return {
    data: {
      ...(await transformReferences(data)),
      blocks: blocks
        ? await Promise.all(blocks.map(transformBlock))
        : undefined,
    },
    ...entry,
  }
}
