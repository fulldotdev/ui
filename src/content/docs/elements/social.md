---
title: Social
description: A reference page in my new Starlight docs site.
---

The `Social` element is used to render an icon of a social media platform that links directly to your desired destination.

## Limitations

Currently this element is limited to the social media platforms shown in the TypeScript type. New social media platforms may be added in a later date or you may add them yourself.

Although, make sure you also add the social media platform to the `map` with it's corresponding data, otherwise it will not work.

```ts
// Social.astro
export interface Props {
  type:
    | "facebook"
    | "instagram"
    | "twitter"
    | "pinterest"
    | "linkedin"
    | "youtube"
    | "tiktok"
    | "snapchat";
  value: string;
}
```

## Code example

```astro
<!-- Social.astro -->
---
export interface Props {
  type: "facebook" | "instagram" | "twitter" | "pinterest" | "linkedin" | "youtube" | "tiktok" | "snapchat"
  value: string
}

const { type, value } = Astro.props

const map = {
  facebook: {
    href: "https://www.facebook.com/" + value,
    icon: 'icon:brand-facebook',
  },
  instagram: {
    href: "https://www.instagram.com/" + value,
    icon: 'icon:brand-instagram',
  },
  twitter: {
    href: "https://www.twitter.com/" + value,
    icon: 'icon:brand-twitter',
  },
  pinterest: {
    href: "https://www.pinterest.com/" + value,
    icon: 'icon:brand-pinterest',
  },
  linkedin: {
    href: "https://www.linkedin.com/" + value,
    icon: 'icon:brand-linkedin',
  },
  youtube: {
    href: "https://www.youtube.com/" + value,
    icon: 'icon:brand-youtube',
  },
  tiktok: {
    href: "https://www.tiktok.com/" + value,
    icon: 'icon:brand-tiktok',
  },
  snapchat: {
    href: "https://www.snapchat.com/" + value,
    icon: 'icon:brand-snapchat',
  },
}
---

{
  type && value && (
    <a
      class="button-secondary mode-compact !size-small !hue-base"
      href={map[type].href}
      target="_blank"
    >
      <i
        class="h-1.4em w-1.4em relative block text-inherit"
        class:list={map[type].icon}
      />
    </a>
  )
}

```

## Props

The `Social` element accepts two required props: `type` and `value`.

### Type

The `type` prop is used to indicate what social media platform you want to showcase. This can be any of the platforms shown inside of the TypeScript type.

:::caution
If you are adding new types yourself, make sure to also add them to the `map` with their corresponding href and icon from your icon pack.
:::

### Value

The `value` prop is your username on that specific social media platform. Before publishing make sure that the link works as intended.

:::caution
Make sure not to provide the full link of a social media platform. Only it's username as the `map` will generate the link.
:::

## SocialGroup

If you want to render more than one social media link, then you may use the `SocialGroup` element. It is used to render one or more social media platforms using the `Social` element.

```astro
<!-- SocialGroup.astro -->
---
import Group from '@components/wrappers/Group.astro'
import Social from './Social.astro'

export interface Props {
  socials: object
}

const { socials, ...restProps } = Astro.props
---

<Group {...restProps}>
  {socials && Object.entries(socials).map(([key, value]: [string, any]) =>
    value ? <Social type={key} value={value} /> : null
  )}
</Group>

```

:::caution
This element uses the `Group` wrapper, which you can read more about [here](/wrappers/group).
:::
