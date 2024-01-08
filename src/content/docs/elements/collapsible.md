---
title: Collapsible
description: A reference page in my new Starlight docs site.
---

The `Collapsible` is used to make a collapsible that shows content upon clicking on the text/icon.

## Props

The `Collapsible` element comes with a couple of props that you may use depending on your needs. This is what your TypeScript type may look like:

```ts
// my-test-file.js
interface Props {
  collapsible?: {
    heading: string;
    text: string;
  };
  class?: string;
}
```

### Collapsible

The `collapsible` prop includes two sub-variables, these are `heading` and `text`.

The `heading` will be shown on the collapsible both when the collapsible is closed as well as open.

The `text` prop is hidden by default. Upon clicking on the collapsible it will make the `text` visible.

### Class

The `class` prop is used to provide any styling classes that you want to add to the collapsible. This prop is optional and may include multiple classes like the default Tailwind or UnoCSS format.

## Code example

Your `Collapsible` element may look something like this:

```astro
---
interface Props {
  collapsible?: {
    heading: string
    text: string
  }
  class?: string
}

const { collapsible, class: className } = Astro.props

const id = 'collapsible' + collapsible?.heading
---

{
  typeof collapsible === 'object' && (
    <div
      class="mode-compact size-medium flex flex-col"
      class:list={className}
    >
      <input
        id={id}
        type="checkbox"
        class="peer"
      />
      <label
        for={id}
        class="mr-size5 peer-checked:[&>i]:icon:minus flex items-center justify-between"
      >
        <h3 class="heading-secondary">{collapsible.heading}</h3>
        <i class="plus icon:plus" />
      </label>
      <p class="pt-size2 text-primary hidden peer-checked:flex">
        {collapsible.text}
      </p>
    </div>
  )
}
```
