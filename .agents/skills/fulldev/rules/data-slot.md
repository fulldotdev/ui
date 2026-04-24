# Data Slot Patterns

fulldev ui does not branch between `base` and `radix`. The shipped interactive components are Astro wrappers around `@data-slot/*` primitives.

## Contents

- Use the provided Astro wrappers
- Triggers are concrete components, not `asChild`/`render`
- `Button` uses `as` for polymorphism
- `Select` and `Combobox` root props
- `Slider` default value shape
- `Switch` and state props

---

## Use the provided Astro wrappers

Prefer the components in `@/components/ui/*` instead of calling `create()` yourself or reaching for lower-level `@data-slot/*` packages in app code.

**Correct:**

```astro
---
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
---

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogTitle>Edit profile</DialogTitle>
  </DialogContent>
</Dialog>
```

---

## Triggers are concrete components

Do not use `asChild`, `render`, or `nativeButton`. fulldev ui trigger components already render the correct Astro element or forward to `Button`.

**Incorrect:**

```tsx
<DialogTrigger asChild>
  <Button>Open</Button>
</DialogTrigger>
```

**Correct:**

```astro
<DialogTrigger variant="outline">Open</DialogTrigger>
```

This applies to `DialogTrigger`, `SheetTrigger`, and `AlertDialogTrigger`.

---

## `Button` uses `as` for polymorphism

When a button should render as a link, use the `as` prop on `Button`. Do not use `asChild`.

**Correct:**

```astro
<Button as="a" href="/docs" variant="outline">
  Read the docs
</Button>
```

If `href` is present, `Button` already defaults to an anchor tag.

---

## `Select` and `Combobox` root props

`Select` and `Combobox` use root props that are serialized to data attributes. Use the fulldev ui props directly.

**Correct:**

```astro
---
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
---

<Select defaultValue="apple" placeholder="Select a fruit">
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

Use `defaultValue`, `placeholder`, `side`, `align`, `sideOffset`, `alignOffset`, `avoidCollisions`, and related root props. Do not rewrite this as a base-vs-radix API choice.

---

## `Slider` default value shape

`Slider` accepts a single number or a two-value range:

```astro
<Slider defaultValue={50}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb />
</Slider>
```

```astro
<Slider defaultValue={[20, 80]}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb />
  <SliderThumb />
</Slider>
```

---

## `Switch` and state props

`Switch` uses Astro props such as `defaultChecked`, `disabled`, `readOnly`, `required`, `name`, `value`, and `uncheckedValue`.

```astro
<Switch defaultChecked name="newsletter" />
```

Use field-level state styling with `Field data-invalid` / `data-disabled`, and control-level state with `aria-invalid` / `disabled`, as documented in [forms.md](./forms.md).
