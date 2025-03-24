// --------------------------------------------------------------------------
// Shared
// --------------------------------------------------------------------------

const IMAGE_FRAGMENT = `#graphql
  fragment ImageFragment on Image {
    url
    altText
  }
`

const PRICE_RANGE_FRAGMENT = `#graphql
  fragment PriceFragment on ProductPriceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
`

const SEO_FRAGMENT = `#graphql
  fragment SeoFragment on SEO {
    title
    description
  }
`

// --------------------------------------------------------------------------
// Product
// --------------------------------------------------------------------------

const PRODUCT_FRAGMENT = `#graphql
  fragment ProductFragment on Product {
    id
    title
    handle
    featuredImage {
      ...ImageFragment
    }
    images(first: 50) {
      nodes {
        ...ImageFragment
      }
    }
    priceRange {
      ...PriceFragment
    }
    compareAtPriceRange {
      ...PriceFragment
    }
    variants(first: 250) {
      nodes {
        id
        title
      }
    }
    seo {
      ...SeoFragment
    }
    descriptionHtml
  }
  ${IMAGE_FRAGMENT}
  ${PRICE_RANGE_FRAGMENT}
  ${SEO_FRAGMENT}
`

export const PRODUCT_QUERY = `#graphql
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`

export const PRODUCTS_QUERY = `#graphql
  query GetProducts($endCursor: String) {
    products(first: 250, after: $endCursor) {
      nodes {
        ...ProductFragment
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`

// --------------------------------------------------------------------------
// Collection
// --------------------------------------------------------------------------

const COLLECTION_FRAGMENT = `#graphql
  fragment CollectionFragment on Collection {
    id
    handle
    title
    image {
      ...ImageFragment
    }
    products(first: 250) {
      nodes {
        id
        handle
        title
        featuredImage {
          ...ImageFragment
        }
        priceRange {
          ...PriceFragment
        }
        compareAtPriceRange {
          ...PriceFragment
        }
      }
    }
    seo {
      ...SeoFragment
    }
    descriptionHtml
  }
  ${IMAGE_FRAGMENT}
  ${PRICE_RANGE_FRAGMENT}
  ${SEO_FRAGMENT}
`

export const COLLECTION_QUERY = `#graphql
  query GetCollection($handle: String!) {
    collection(handle: $handle) {
      ...CollectionFragment
    }
  }
  ${COLLECTION_FRAGMENT}
`

export const COLLECTIONS_QUERY = `#graphql
  query GetCollections($endCursor: String) {
    collections(first: 250, after: $endCursor) {
      nodes {
        ...CollectionFragment
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${COLLECTION_FRAGMENT}
`

// --------------------------------------------------------------------------
// Page
// --------------------------------------------------------------------------

export const PAGE_FRAGMENT = `#graphql
  fragment PageFragment on Page {
    id
    handle
    title
    metafield(namespace: "custom", key: "sections") {
      references(first: 250) {
        nodes {
          ... on Metaobject {
            type
            fields {
              key
              value
              reference {
                ... on MediaImage {
                  image {
                    ...ImageFragment
                  }
                }
              }
              references(first: 10) {
                nodes {
                  ... on Collection {
                    id
                    handle
                    title
                    image {
                      ...ImageFragment
                    }
                  }
                  ... on Product {
                    id
                    handle
                    title
                    featuredImage {
                      ...ImageFragment
                    }
                    priceRange {
                      ...PriceFragment
                    }
                    compareAtPriceRange {
                      ...PriceFragment
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    seo {
      ...SeoFragment
    }
    body
  }
  ${IMAGE_FRAGMENT}
  ${PRICE_RANGE_FRAGMENT}
  ${SEO_FRAGMENT}
`

export const PAGE_QUERY = `#graphql
  query GetPage($handle: String!) {
    page(handle: $handle) {
      ...PageFragment
    }
  }
  ${PAGE_FRAGMENT}
`

export const PAGES_QUERY = `#graphql
  query GetPages($endCursor: String) {
    pages(first: 250, after: $endCursor) {
      nodes {
        ...PageFragment
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${PAGE_FRAGMENT}
`

// --------------------------------------------------------------------------
// Layout
// --------------------------------------------------------------------------

export const LAYOUT_QUERY = `#graphql
  query {
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
