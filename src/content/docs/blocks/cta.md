---
title: Cta
description: A reference page in my new Starlight docs site.
---

The `Cta` component is used to render a Call To Action, this is only a `writeup` with `buttons`. 

If you want to use images in your `Cta` considering using the `Spotlight` component. Which is identical to this component, but allows for an image.

## Section

```astro
---
import type { Props as SectionProps } from '../../elements/section/Section.astro'
import Section from '../../elements/section/Section.astro'

interface Props
  extends Pick<
    SectionProps,
    'layout' | 'tagline' | 'heading' | 'text' | 'buttons'
  > {}

const { props } = Astro
---

<Section {...props} />

```