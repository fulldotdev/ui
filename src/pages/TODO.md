- add product-page
- add collection-page
- add blog-post-page
- add blog-list-page
- add cart-page
- add checkout-page

this way pages can consist of only blocks. product page can not only consist of product block, but also reviews block for example.

page (bestaat ALLEEN uit blocks):

- type: page | content | post | person | job | service (sommige hebben bijv contact fields, waardoor contact block aan t eind komt)
- layout: base (mag later, voo rnu doen we 1 layout)
- title
- sections:
- seo:

Block:

- type: hero | product-list | contact | etc
- items:
- title
- description
- image
- link
- button
- text

Item (dit is alleen data. De component code zit in de blocks):

- type: product | review | etc

SAMENGEVAT: pages & blocks opspliten. We hebben een product block, maar ook een product page. In eerste instantie is t verschil duidelijk met astro vs tsx, later zal de namng langer moeten.
