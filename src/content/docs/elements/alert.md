---
title: Alert
---

  The `Alert` element is used to display a message inbetween your text, this can vary from information, warnings, dangers and custom messages.


  ```astro
  ---
  import Icon from './Icon.astro'

  export interface Props {
    icon?: string
    text?: string
  }

  const { icon, text } = Astro.props
  let iconDisplay

  switch (icon) {
    case 'info':
      iconDisplay = 'info-circle'
      break
    case 'warning':
      iconDisplay = 'alert-triangle'
      break
    case 'danger':
      iconDisplay = 'alert-hexagon'
      break
    default:
      iconDisplay = icon
  }
  ---

  <div class={icon}>
    <Icon iconName={iconDisplay} />
    {text}
    <slot />
  </div>
  ```

  :::note
  This element uses the [Icon](/elements/icon) element to display icons.
  :::

  We have implemented a couple default icons with their own background color. These are: `info`, `warning` and `danger`, which you can provide to the `icon` prop.

  The element will automatically turn these into their icons. Alternatively you can pass through your own icons, FullUI uses the [Tabler Icon Pack](https://icones.js.org/collection/tabler). You can pass any of those listed icons through the `icon` prop and it will be used as the icon.

  `Alert` also has default styling for the element and it's default icons that we have implemented:

  ```astro
  <style lang="postcss">
    div {
      background-color: rgb(109, 109, 118);
      color: white;
      display: flex;
      padding: 1rem;
      gap: 0.25rem;
      border-radius: 0.5rem;
      height: 1rem;

      &:where(.info) {
        background-color: rgb(74, 74, 238);
      }

      &:where(.warning) {
        background-color: rgb(247, 124, 24);
      }

      &:where(.danger) {
        background-color: rgb(232, 7, 7);
      }
    }
  </style>
  ```

  Any of these styling choices can easily be overwritten with your own classes from [Tailwind](https://tailwindcss.com/).


