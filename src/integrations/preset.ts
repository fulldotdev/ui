import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import fulldev from 'fulldev-ui/integration'

export default function preset() {
  return [mdx(), sitemap(), robotsTxt(), fulldev({})]
}
