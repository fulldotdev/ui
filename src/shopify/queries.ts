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
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              value
              name
            }
            availableForSale
            quantityAvailable
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

// --------------------------------------------------------------------------
// Articles
// --------------------------------------------------------------------------

export const ShopifyArticlesQuery = `#graphql
  query ShopifyArticles($endCursor: String) {
    articles(first: 250, after: $endCursor) {
      nodes {
        id
        handle
        title
        image {
          ...ShopifyImage
        }
        blog {
          handle
        }
        seo {
          title
          description
        }
        contentHtml
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${ShopifyImageFragment}
`

// --------------------------------------------------------------------------
// Blogs
// --------------------------------------------------------------------------

export const ShopifyBlogsQuery = `#graphql
  query ShopifyBlogs($endCursor: String) {
    blogs(first: 250, after: $endCursor) {
      nodes {
        id
        handle
        title
        articles(first: 250) {
          nodes {
            id
            handle
            title
            excerptHtml
            image {
              ...ShopifyImage
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${ShopifyImageFragment}
`

// --------------------------------------------------------------------------
// Policies
// --------------------------------------------------------------------------

export const ShopifyShopQuery = `#graphql
  query ShopifyShop {
    shop {
      privacyPolicy {
        id
        handle
        title
        body
      }
      refundPolicy {
        id
        handle
        title
        body
      }
      shippingPolicy {
        id
        handle
        title
        body
      }
      subscriptionPolicy {
        id
        handle
        title
        body
      }
      termsOfService {
        id
        handle
        title
        body
      }
    }
  }
`
