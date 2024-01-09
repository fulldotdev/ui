---
title: Logo
description: A reference page in my new Starlight docs site.
---

Bla bla `Logo`

:::caution
This element uses `company` global.
:::

```astro
<!-- Logo.astro -->
---
import { getEntry } from 'astro:content'
const company = await getEntry('globals', 'company').then(({ data }) => data)
---

{
  company.logo && (
    <a
      href="/"
      class:list={[Astro.props.class, 'flex']}
    >
      <img
        class="text-primary h-2em block w-auto object-contain"
        src={company.logo}
        alt={'Logo ' + company.company}
        loading="lazy"
        decoding="async"
      />
    </a>
  )
}

```
