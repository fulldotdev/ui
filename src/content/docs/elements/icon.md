---
title: Icon
description: A reference page in my new Starlight docs site.
---

The `Icon` element is used, as the name implies, to render a single icon. It may be imported and called from anywhere.

```astro
<!-- Icon.astro -->
---
  import iconsJson from '@iconify-json/tabler/icons.json'

  const icons: any = iconsJson
  const { iconName, className, exclude } = Astro.props
---

{
  !exclude && iconName && (
    <svg
      class:list={[className, 'w-2em h-2em']}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      set:html={icons.icons[iconName].body}
    />
  )
}

```

:::caution
This example uses [iconify/json](https://www.npmjs.com/package/@iconify/json) with the `tabler` icon pack.
:::

## Props

The `Icon` element accepts two props: `iconName` and `className`.

### iconName

`iconName` is the name of the icon that you would like to use. Make sure that this icon exists in the icon pack that you are using.

### className

`className` may be used to assign styling to the icon. You may pass styling through here and it will be added to the `class` attribute of the icon.
