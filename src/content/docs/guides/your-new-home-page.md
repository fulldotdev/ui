---
title: Your new home page
description: A guide in my new Starlight docs site.
---

This is a step-by-step guide on how to make your new home page with FullUI.

:::caution
This guide assumes you are using [CloudCannon bookshop](https://github.com/CloudCannon/bookshop)
:::

### Home page layout

Below is a list of components that we will need to make our home page. Almost all home pages use these very basic components:

- Hero
- Call To Action (CTA)
- Spotlight
- Reviews
- Content
- Images

This does not include the header and footer as those should be rendered inside of your Astro Layout.

### Hero component

A hero component is made up of three components: `writeup`, `buttons` & `image`. Meaning that your YAML file (`/content/hero.bookshop.yml`) should look something like this:

```
_schema: hero

blueprint:
  writeup:
  buttons:
  image:

preview:
  writeup: |
    <h1>Lorem ipsum dolor sit</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, numquam!</p>
  buttons:
    - label: Lorem ipsum
      href: '#'
    - label: Lorem ipsum
      href: '#'
  image:
    src: https://picsum.photos/seed/picsum/1600/900
    alt: Lorem ipsum dolor sit
```

:::tip[Did you know?]
You can also copy and paste the code above into your schema.
:::
