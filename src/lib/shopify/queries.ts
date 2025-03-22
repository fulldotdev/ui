export const PAGE_QUERY = `#graphql
  query GetPage($handle: String!) {
    page(handle: $handle) {
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
                      url
                      altText
                    }
                  }
                  ... on Metaobject {
                    id
                  }
                }
                references(first: 10) {
                  nodes {
                    ... on Collection {
                      title
                      image {
                        url
                        altText
                      }
                    }
                    ... on Product {
                      handle
                      title
                      featuredImage {
                        url
                        altText
                      }
                      priceRange {
                        minVariantPrice {
                          amount
                          currencyCode
                        }
                      }
                      compareAtPriceRange {
                        minVariantPrice {
                          amount
                        }
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
        title
        description
      }
      body
    }
  }
`

export const PRODUCT_QUERY = `#graphql
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      images(first: 50) {
        nodes {
          url
          altText
        }
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
            name
            value
          }
        }
      }
      seo {
        title
        description
      }
      descriptionHtml
    }
  }
`

export const COLLECTION_QUERY = `#graphql
  query GetCollection($handle: String!) {
    collection(handle: $handle) {
      title
      image {
        url
        altText
      }
      products(first: 250) {
        nodes {
          handle
          title
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
            }
          }
          featuredImage {
            url
            altText
          }
        }
      }
      seo {
        title
        description
      }
      descriptionHtml
    }
  }
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
    metaobject(handle: {handle: "base", type: "layout"}) {
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
