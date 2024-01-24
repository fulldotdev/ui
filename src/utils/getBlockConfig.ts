import { getEntry } from 'astro:content'

export default async (
  bookshopName: string | undefined
): Promise<object | undefined> => {
  const slug: any = bookshopName?.split('/').pop()
  const entry = await getEntry('blocks', slug + '.bookshop')
  const config = entry?.data?.config
  return config
}
