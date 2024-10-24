import { z } from 'astro:content'
import header from '../components/header'
import sidebar from '../components/sidebar'

export default sidebar.merge(header).extend({
  header: z.boolean().optional(),
  sidebar: z.boolean().optional(),
})
