import { getEntry } from 'astro:content'

export default async (name: string): Promise<any | undefined> => {
  if (!name) return {}
  const entry = await getEntry('settings', 'elements')
  const config = entry?.data[name]
  return config
}
