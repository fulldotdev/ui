import { getEntry } from 'astro:content'

export default async (name: string | undefined): Promise<any | undefined> => {
  if (!name) return {}
  const entry = await getEntry('settings', 'cards')
  const config = entry?.data[name]
  return config
}
