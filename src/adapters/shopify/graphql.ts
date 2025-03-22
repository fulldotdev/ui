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
`

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
        ...ProductFragment
      }
    }
    seo {
      ...SeoFragment
    }
    descriptionHtml
  }
`

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
                    ...CollectionFragment
                  }
                  ... on Product {
                    ...ProductFragment
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
`

export const PRODUCT_QUERY = `#graphql
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
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
  ${PRODUCT_FRAGMENT}
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
  ${IMAGE_FRAGMENT}
  ${PRICE_RANGE_FRAGMENT}
  ${SEO_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  ${COLLECTION_FRAGMENT}
`

export const SEARCH_QUERY = `#graphql
  query GetSearch($endCursor: String) {
    search(query: " ", first: 100, after: $endCursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ... on Article {
          id
          handle
          title
        }
        ... on Page {
          id
          handle
          title
        }
        ... on Product {
          id
          handle
          title
        }
      }
    }
  }
`

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
