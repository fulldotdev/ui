---
title: Form
description: A reference page in my new Starlight docs site.
---

The `Form` element is used to generate forms.

```astro
<!-- Form.astro -->
---
  import Input, { type InputProps } from './input/Input.astro'
  import Select, {
    type SelectProps,
  } from './select/Select.astro'
  import Textarea, {
    type TextareaProps,
  } from './textarea/Textarea.astro'
  import type { HTMLAttributes } from 'astro/types'
  import { getEntry } from 'astro:content'
  import type { ButtonProps } from './button/Button.astro'
  import Checkbox, { type CheckboxProps } from './checkbox/Checkbox.astro'

  export type FormProps = Props
  export interface Props {
    form?: string | null
    title?: HTMLAttributes<'input'>['value'] | null
    key?: HTMLAttributes<'input'>['value'] | null
    inputs?: (InputProps | SelectProps | CheckboxProps | TextareaProps)[] | null
    button?: ButtonProps | null
  }

  const components: any = {
    input: Input,
    textarea: Textarea,
    select: Select,
    checkbox: Checkbox,
  }

  let {
    form,
    title,
    key,
    inputs,
    button = {
      label: 'Verstuur',
      href: '/bedankt',
    },
  } = Astro.props

  const formName = form?.split('/').pop()?.replace('.md', '') || 'myplaceholder'
  const formEntry = await getEntry('forms', formName)
  const formData = formEntry ? formEntry.data : Astro.props
---

{
  formData.inputs && (
    <form
      action={formData.href}
      class="gap-size2 flex w-full max-w-full flex-col text-left"
    >
      {formData.inputs?.map((input: any) => {
        const key = input._bookshop_name.split('/').pop()
        const Component = components[key]
        return <Component {...input} />
      })}
      <slot />
      <input
        type="hidden"
        name="_subject"
        value={title}
      />
      <input
        type="hidden"
        name="inbox_key"
        value={key || formData.slug}
      />
      <input
        type="text"
        name="_gotcha"
        style="display: none;"
      />
      <button
        class="button-primary hue-brand mt-size2"
        type="submit"
      >
        {formData.button.label}
      </button>
    </form>
  )
}

```
