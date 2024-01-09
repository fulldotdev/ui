---
title: Checkbox
description: A reference page in my new Starlight docs site.
---

The `Checkbox` element is used to easily render an [HTML Checkbox](https://www.w3schools.com/tags/att_input_type_checkbox.asp) that also comes with a required `label` and optional `required` prop.

As the name suggests the `required` prop makes the checkbox required.

```astro
<!-- Checkbox.astro -->
---
export type CheckboxProps = Props
interface Props {
  label: string
  required?: boolean
}

const { label, required } = Astro.props
---

<label
  for={label}
  class="input"
>
  <input
    type="checkbox"
    id={label}
    name={label}
    {required}
  />
  <span>{label}</span>
</label>
```
