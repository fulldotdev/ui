---
title: Contact
description: A reference page in my new Starlight docs site.
---

The `Contact` component is used to render your contact information. 


(Waar is socials etc..???)


## Section

```astro
---
import type { Props as SectionProps } from '../../elements/section/Section.astro'
import Section from '../../elements/section/Section.astro'

export interface Props
  extends Pick<
    SectionProps,
    'level' | 'tagline' | 'heading' | 'text' | 'image'
  > {}

const { props } = Astro
---

<Section {...props} />

```