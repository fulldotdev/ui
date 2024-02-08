---
title: Textarea
description: A reference page in my new Starlight docs site.
---

The `Textarea` element renders a standard [`HTML <textarea tag`](https://www.w3schools.com/tags/tag_textarea.asp) inside of a div with a label.

```astro
<!-- Textarea.astro -->
---
export type TextareaProps = Props
import type { HTMLAttributes } from 'astro/types'
interface Props {
  label: string
  required?: boolean
}

const { label, required } = Astro.props
---

<div class="gap-size1 flex flex-col">
  <label for={label}>{label}</label>
  <textarea
    rows="5"
    class="input"
    id={label}
    name={label}
    {required}
  ></textarea>
</div>

```

## Props

The `Textarea` element accepts one required prop: `label`. And one optional prop: `required`.

### Label

The `label` prop will be rendered inside of the `label` tag as text above the `Textarea` element.

### Required

The `required` prop is optional and is used to indicate whether the `Textarea` element must be required or not. The `Textarea` element is _not required_ by default, but passing `true` via the `required` prop will make it required.
