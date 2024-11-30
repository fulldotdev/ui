import { z } from 'astro:content'

export default z.record(z.string(), z.string().array()).optional()
