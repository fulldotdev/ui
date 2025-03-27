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

const ShopifySeoFragment = `#graphql
  fragment SeoFragment on SEO {
    title
    description
  }
`

const ShopifyPageInfoFragment = `#graphql
  fragment ShopifyPageInfo on PageInfo {
    hasNextPage
    endCursor
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
          ...SeoFragment
        }
        descriptionHtml
      }
      pageInfo {
        ...ShopifyPageInfo
      }
    }
  }
  ${ShopifyImageFragment}
  ${ShopifyProductPriceRangeFragment}
  ${ShopifySeoFragment}
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
          ...SeoFragment
        }
        descriptionHtml
      }
      pageInfo {
        ...ShopifyPageInfo
      }
    }
  }
  ${ShopifyImageFragment}
  ${ShopifyProductPriceRangeFragment}
  ${ShopifySeoFragment}
`

// --------------------------------------------------------------------------
// Sections
// --------------------------------------------------------------------------

export const ShopifySectionFragment = `#graphql
  fragment ShopifySection on Metaobject {
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
              ...ShopifySection
            }
          }
        }
        seo {
          ...SeoFragment
        }
        body
      }
      pageInfo {
        ...ShopifyPageInfo
      }
    }
  }
  ${ShopifySectionFragment}
  ${ShopifySeoFragment}
`
