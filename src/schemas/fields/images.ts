import { z } from 'astro:content'
import image from '../components/image'

export default z.array(image).optional()
