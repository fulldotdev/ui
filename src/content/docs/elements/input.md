---
title: Input
description: A reference page in my new Starlight docs site.
---

The `Input` element is used to render a single input. This element is usually used inside of a [Form](/elements/form).

```astro
<!-- Input.astro -->
---
export type InputProps = Props
interface Props {
  label: string
  required?: boolean
  type?: 'text' | 'email' | 'tel' | 'url' | 'number'
}

const { label, required, type = 'text' } = Astro.props
---

<div class="gap-size1 flex flex-col">
  <label for={label}>{label}</label>
  <input
    class="input"
    id={label}z
    name={label}
    {type}
    {required}
  />
</div>

```

## Props

The `Input` element has one required prop: `label`. And two optional props: `required` and `type`.

### Label

`label` will be displayed as text above the input field.

### Required

The `required` prop is used to make the input field required. You can achieve this by passing `true`. Input fields are _not required_ by default.

### Type

The `type` prop is used to indicate what kind of input field you want to use. These are limited to: `text`, `email`, `tel`, `url` and `number`. The type of an input field is `text` by default.
