import { z } from 'astro:content'
import { createTypeAlias, printNode, zodToTs } from 'zod-to-ts'
import { base } from './base'
import { block } from './block'
import { navigation } from './navigation'
import { pathSchema } from './utils'

export const layout = base
  .extend({
    i18n: pathSchema('pages'),
    _preset: pathSchema('presets'),
    seo: z
      .object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
      })
      .partial()
      .passthrough(),
    code: z
      .object({
        head: z.string(),
        body: z.string(),
      })
      .partial()
      .passthrough(),
    pages: pathSchema('pages').array(),
    records: pathSchema('records').array(),
    title: z.string(),
    description: z.string(),
    header: block.or(z.literal(false)),
    headers: block.array().or(z.literal(false)),
    hero: block.or(z.literal(false)),
    block: block.or(z.literal(false)),
    section: block.or(z.literal(false)),
    blocks: block.array().or(z.object({}).catchall(block)),
    sections: block.array().or(z.object({}).catchall(block)),
    cta: block.or(z.literal(false)),
    footer: block.or(z.literal(false)),
    footers: block.array().or(z.literal(false)),
    navigation: navigation.or(z.literal(false)),
  })
  .partial()
  .passthrough()
  .optional()

const identifier = 'preset'
const { node } = zodToTs(layout, identifier)
const typeAlias = createTypeAlias(node, identifier)
export const nodeString = printNode(typeAlias)
  .replace(/\| undefined\)/g, ')')
  .replace(/(\(string \| |\?: \()/g, (match) => match.slice(0, -1))
  .replace(/\)(?=;)/g, '')
  .replace(/(\w+\?: \w+) \) \| undefined;/g, '$1 | undefined;')
  .replace(/string\[\] \)/g, 'string[]')
