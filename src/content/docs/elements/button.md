---
title: Button
description: A reference page in my new Starlight docs site.
---

The `Button` element is self explanatory, it is a button that receives props from where the element is being called. Your `Button` element may look something like this:

```astro
---
import type { HTMLAttributes } from 'astro/types'

export type ButtonProps = Props
interface Props {
  label: string | null
  href: HTMLAttributes<'a'>['href']
  importance?: 'primary' | 'secondary' | 'tertiary'
}

const { label, href, importance } = Astro.props
---

<a
  href={href}
  class:list={[
    { 'button-primary': importance === 'primary' },
    { 'button-secondary': importance === 'secondary' },
    { 'button-tertiary': importance === 'tertiary' },
  ]}
>
  {label}
</a>
```

:::caution
You may ignore or delete the `importance` prop if you are not using the Fulldev design system.
:::

You may import the button element anywhere and provide it's props in one of two ways:

**Assigning props beforehand**

```astro
---
  import Button from '@components/elements/Button.astro'
  const button = {
  label: "Example",
  href: "https://example.com"
  }
---

<Button {button} />
```

**Providing props directly**

```astro
---
  import Button from '@components/elements/Button.astro'
---

<Button label={"Example"} href={"https://example.com"} />
```

## ButtonGroup

The `ButtonGroup` element may be used to render one or more buttons. Below is an example of what your `ButtonGroup` element may look like:

```astro
---
import Group, { type GroupProps } from '@components/wrappers/Group.astro'
import type { ButtonProps } from './Button.astro'
import Button from './Button.astro'

type Props = GroupProps & {
  buttons?: ButtonProps[] | null
  importance?: 'primary' | 'secondary' | 'tertiary' | null
}

let { buttons, importance = 'primary', ...restProps } = Astro.props

const getImportance = (i: number) => {
  if (!importance) importance = 'primary'
  if (i === 0) return importance
  if (i === 1 && importance === 'primary') return 'secondary'
  if (i === 1 && importance === 'secondary') return 'tertiary'
  if (i === 1 && importance === 'tertiary') return 'tertiary'
  if (i === 2) return 'tertiary'
  else return 'tertiary'
}
---

<Group {...restProps}>
  {
    buttons?.map((button, i) => (
      <Button
        {...button}
        importance={getImportance(i)}
      />
    ))
  }
</Group>
```

:::caution

- You may ignore or delete the `importance` prop if you are not using the Fulldev design system.

- This element uses the `Group` wrapper, which you can read more about [here](/wrappers/group).
  :::

Again, you may provide the `ButtonGroup` props in more than one way:

**Assigning props beforehand**

```astro
---
  import ButtonGroup from '@components/elements/ButtonGroup.astro'
  const buttons = {
    {
      label: "Example",
      href: "https://example.com",
    },
    {
      label: "Second example",
      href: "https://example.com",
      importance: 'secondary'
    },
  }
---

<ButtonGroup {buttons} />
```

**Providing props directly**

```astro
---
import Button from '@components/elements/Button.astro'
---

<ButtonGroup buttons={{
    {
      label: "Example",
      href: "https://example.com",
    },
    {
      label: "Second example",
      href: "https://example.com",
      importance: 'secondary'
    }
  }} />
```

If buttons are not/incorrectly provided the component will not render anything.
