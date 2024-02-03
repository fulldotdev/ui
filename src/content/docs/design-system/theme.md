---
title: Theme
description: A reference page in my new Starlight docs site.
---

Our theming system utilizes CSS variables.

## Two layers
The color system is divided into two lateys:

1. **Hue pallettes:** two 12-step color pallettes, one base and 1 accent 
2. **Impact themes:** defines which step is used for what purpose

### Hue pallettes
These define a 12-step color pallette for different hues (inspired by [Radix](https://www.radix-ui.com/colors)). This usually consists of one base pallette (grayscale) and one or two accent pallettes (vibrant). Each palette can have a light and dark variant.

:::note
Currently, we only support 2 palettes: 1 base and 1 accent. We are planning to make this more flexible, allowing you to add as many pallettes as you like.
:::
:::note
Currently, we only support directly picking radix palletes. We are planning to make this more flexible, allowing you to define fully custom pallettes.
:::

Here are the default Radix pallettes (which can of course be overridden):

![Steps header light](/steps-header-light.png)
![Slate light](/slate-light.png)
![Indigo light](/indigo-light.png)

![Steps header dark](/steps-header-dark.png)
![Slate dark](/slate-dark.png)
![Indigo dark](/indigo-dark.png)

#### Defining your pallettes
```ts
// astro.config.ts
fulluiIntegration({
  theme: {
    pallettes: {
      // here you can define your own pallettes
      base: 'slate', // gray, sand, etc. See all options
      accent: 'indigo',
      // here you can define the default scheme beng used
      scheme: 'light',
    },
  }
}),
```
For all possible color palettes, see the [Radix documentation](https://www.radix-ui.com/colors), or the typescript interface.


### Impact themes
Radix has their own rules of which step should be used for what purpose. However, since it is primarely built for applications, we felt like it was lacking for marketing websites. For example, a CTA section with a bright color is not uncommon in marketing websites, but it is not something that is covered by Radix.

This is why we added impact themes. These are a set of rules that define which step should be used for what purpose. We decided to name them not on looks or anything, but in the impact it should have on the page. Currently, we have predefined 5 impact-themes.

:::note
We plan to allow fully custom impact themes, as well as the ability to override the default ones.
:::

Here are the default impact themes:

#### Defining your impact themes
```ts
// astro.config.ts
fulluiIntegration({
  theme: {
    pallettes: {
      base: 'slate',
      accent: 'indigo',
      scheme: 'light',
    },
    impacts: {
      low: {
        // Below are the default values for the 'impact-low' theme
        // All below values can be overridden
        bg: 'base1',
        ring: 'base6',
        text: 'base11',
        heading: 'base12',
        sectionBg: 'base1',
        sectionRing: null,
        sectionText: 'base11',
        sectionHeading: 'base12',
        cardBg: null,
        cardRing: null,
        cardText: 'base11',
        cardHeading: 'base12',
        inputBg: 'base2',
        inputRing: 'base6',
        inputText: 'base11',
        primaryBg: 'accent3',
        primaryBgHover: 'accent4',
        primaryBgActive: 'accent5',
        primaryRing: 'accent7',
        primaryRingHover: 'accent8',
        primaryText: 'accent12',
        secondaryBg: null,
        secondaryBgHover: 'accent3',
        secondaryBgActive: 'accent4',
        secondaryRing: null,
        secondaryRingHover: null,
        secondaryText: 'accent12',
      },
      medium: {
        // For the default values, check the typescript interface
      },
      high: {
        // same...
      },
      solid: {
        // same...
      },
      extreme: {
        // same...
      },
    },
  }
}),
```

## The result
The result is a good looking components, in 4 different impact levels. Below you see an example of a CTA section with impact low till extreme:

![CTA section with low impact](/impact-low.png)
![CTA section with medium impact](/impact-medium.png)
![CTA section with high impact](/impact-high.png)
![CTA section with solid impact](/impact-solid.png)
![CTA section with extreme impact](/impact-extreme.png)


