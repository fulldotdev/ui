---
title: Select
description: A reference page in my new Starlight docs site.
---

The `Select` element renders a select field with your specified options as well as giving you default values.

```astro
<!-- Select.astro -->
---
export type SelectProps = Props
interface Props {
  label: string
  options: string[]
  required?: boolean
}

const { label, options, required } = Astro.props
---

<div class="gap-size1 flex flex-col">
  <label for={label}>{label}</label>
  <select
    id={label}
    name={label}
    {required}
    class="input"
  >
    <option
      value="Niks geselecteerd"
      disabled
      selected
    >
      Maak een keuze
    </option>
    {options.map((option) => <option value={option}>{option}</option>)}
  </select>
</div>
```

## Props

The `Select` element takes two required props: `label` and `options`. It also takes one optional prop: `required`.

### Label

The `label` prop is set inside of the label tag and put above the `Select` element.

### Options

The `options` prop is an array of strings, all strings inside of the `options` array will be used as options. The string will be used both for the value as well as the label.

### Required

The `required` prop is optional and is used to indicate whether the `Select` element must be required or not. The `Select` element is _not required_ by default, but passing `true` via the `required` prop will make it required.
