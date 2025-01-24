import { type CollectionEntry } from 'astro:content'
import { getHref } from './getHref.ts'

export function getMenus(docs: CollectionEntry<'docs'>[]) {
  const sortedDocs = docs.sort((a, b) => a.id.localeCompare(b.id))

  const links = sortedDocs.map((doc) => ({
    id: doc.id,
    href: getHref(doc),
    text: doc.data.title,
  }))

  const flatLinks = links.filter(({ id }) => id.split('/').length === 1)
  const folders = links.map(({ id }) => id.split('/')[0])
  const uniqueFolders = [...new Set(folders)].filter(Boolean) as string[]

  let menus = uniqueFolders.map((folder) => ({
    heading: folder.charAt(0).toUpperCase() + folder.slice(1),
    links: links.filter(({ id }) => id.startsWith(`${folder}/`)),
  }))

  return [
    {
      heading: 'Get Started',
      links: flatLinks,
    },
    ...menus,
  ]
}
