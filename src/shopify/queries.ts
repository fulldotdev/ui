// --------------------------------------------------------------------------
// Shared
// --------------------------------------------------------------------------

const ShopifyImageFragment = `#graphql
  fragment ShopifyImage on Image {
    url
    altText
  }
`

const ShopifyProductPriceRangeFragment = `#graphql
  fragment ShopifyProductPriceRange on ProductPriceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
`

// --------------------------------------------------------------------------
// Products
// --------------------------------------------------------------------------

export const ShopifyProductsQuery = `#graphql
  query ShopifyProducts($endCursor: String) {
    products(first: 250, after: $endCursor) {
      nodes {
        id
        handle
        title
        featuredImage {
          ...ShopifyImage
        }
        images(first: 50) {
          nodes {
            ...ShopifyImage
          }
        }
        priceRange {
          ...ShopifyProductPriceRange
        }
        compareAtPriceRange {
          ...ShopifyProductPriceRange
        }
        variants(first: 250) {
          nodes {
            id
            selectedOptions {
              value
              name
            }
          }
        }
        seo {
          title
          description
        }
        descriptionHtml
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${ShopifyImageFragment}
  ${ShopifyProductPriceRangeFragment}
`

// --------------------------------------------------------------------------
// Collections
// --------------------------------------------------------------------------

export const ShopifyCollectionsQuery = `#graphql
  query ShopifyCollections($endCursor: String) {
    collections(first: 250, after: $endCursor) {
      nodes {
        id
        handle
        title
        image {
          ...ShopifyImage
        }
        products(first: 250) {
          nodes {
            id
            handle
            title
            featuredImage {
              ...ShopifyImage
            }
            priceRange {
              ...ShopifyProductPriceRange
            }
            compareAtPriceRange {
              ...ShopifyProductPriceRange
            }
          }
        }
        seo {
          title
          description
        }
        descriptionHtml
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${ShopifyImageFragment}
  ${ShopifyProductPriceRangeFragment}
`
