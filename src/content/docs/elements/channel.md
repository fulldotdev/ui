---
title: Channel
description: A reference page in my new Starlight docs site.
---

The `Channel` element is used to display contact/company information. This is currently limited to: `email`, `phone`, `whatsapp` or `address`. These four channels have built-in support for an easier user experience.

:::note[Other contact platforms]
If you want to display other contact platforms (i.e. instagram, facebook etc) use the [`Social`](/elements/social) element instead.
:::

Your `Channel` element may look something like this:

```astro
---
export type ChannelProps = Props
interface Props {
  type: "phone" | "email" | "whatsapp" | "address"
  value: string
}

const { type, value } = Astro.props

const map = {
  email: {
    value: value,
    href: `mailto:${value}`,
    icon: 'icon:mail',
    title: 'Email',
  },
  phone: {
    value: value,
    href: `tel:${value}`,
    icon: 'icon:phone',
    title: 'Telefoon',
  },
  whatsapp: {
    value: value,
    href: `https://wa.me/${value}`,
    icon: 'icon:brand-whatsapp',
    title: 'Whatsapp',
  },
  address: {
    value: value,
    href: `https://www.google.com/maps/search/?api=1&query=${value}`,
    icon: 'icon:location',
    title: 'Adres',
  },
}
---

{
  type && value && (
    <div class="gap-size3 mode-compact size-medium flex items-center">
      <a
        class="button-secondary"
        href={map[type].href}
        target="_blank"
      >
        <i
          class="h-1.4em w-1.4em block"
          class:list={map[type].icon}
        />
      </a>
      <div class="gap-size1 gap-size1 flex flex-col">
        <p class="hue-base text-size2 text-hue12 text-left">{map[type].title}</p>
        <p class="hue-base text-size1 text-left">{map[type].value}</p>
      </div>
    </div>
  )
}
```

## Props

The `Channel` element expects two props: `type` and `value`.

### Type

The `type` prop is used to indicate which channel you would like to use, this is currently limited to the previously mentioned channels (Also shown in the TypeScript type).

### Value

The `value` prop is the contact information itself for example your phone number, address or email. You can pass this prop as a string like this: `example@example.com` and it will automatically generate a `mailto:` link that opens your mailing service when clicked.

## ChannelGroup

The `ChannelGroup` element may be used to render one or more channels. Below is an example of what your `ChannelGroup` element may look like:

```astro
---
import Group, { type GroupProps } from '@components/wrappers/Group.astro'
import Channel from './Channel.astro'

type Props = GroupProps & {
  channels: object
}

const { channels, ...restProps } = Astro.props
---

<Group {...restProps}>
  {channels && Object.entries(channels).map(([key, value]: [string, any]) =>
    value ? <Channel type={key} value={value} /> : null
  )}
</Group>
```

:::caution

This element uses the `Group` wrapper, which you can read more about [here](/wrappers/group).
:::
