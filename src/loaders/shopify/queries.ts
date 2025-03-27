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
// Blocks
// --------------------------------------------------------------------------

export const ShopifyBlockFragment = `#graphql
  fragment ShopifyBlock on Metaobject {
    type
    fields {
      key
      value
      reference {
        ... on MediaImage {
          image {
            ...ShopifyImage
          }
        }
      }
      references {
        nodes {
          ... on Collection {
            id
            handle
            title
            image {
              ...ShopifyImage
            }
          }
          ... on Product {
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
      }
    }
  }
  ${ShopifyImageFragment}
  ${ShopifyProductPriceRangeFragment}
`

// --------------------------------------------------------------------------
// Pages
// --------------------------------------------------------------------------

export const ShopifyPagesQuery = `#graphql
  query ShopifyPages($endCursor: String) {
    pages(first: 250, after: $endCursor) {
      nodes {
        id
        handle
        title
        metafield(namespace: "custom", key: "sections") {
          id
          value
          references(first: 250) {
            nodes {
              ...ShopifyBlock
            }
          }
        }
        seo {
          title
          description
        }
        body
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${ShopifyBlockFragment}
`

// --------------------------------------------------------------------------
// Layout
// --------------------------------------------------------------------------

export const ShopifyLayoutQuery = `#graphql
  query ShopifyLayout {
    metaobject(handle: {type: "layout", handle: "base" }) {
      fields {
        key
        value
        references(first: 50) {
          nodes {
            ... on Metaobject {
              fields {
                key
                value
              }
            }
          }
        }
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
`
