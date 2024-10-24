// import Stripe from 'stripe'

// const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY)

const slugify = (input: string): string => {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const generateProductId = (
  slug: string,
  variants?: string[] | undefined
): string => {
  const slugified = slugify(slug)

  if (variants && variants.length > 0)
    return `${slugified}--${variants.map((variant) => slugify(variant)).join('--')}`

  return slugified
}

export const generateProductName = (
  title: string,
  variants?: string[] | undefined
): string => {
  if (variants && variants.length > 0)
    return `${title} / ${variants.join(' / ')}`

  return title
}

export const formatPrice = (price: number): string => {
  return `€${price?.toFixed(2).replace('.', ',')}`
}
