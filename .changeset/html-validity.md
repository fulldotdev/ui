---
"fulldev-ui": patch
---

Fix invalid HTML and accessibility problems that html-validate and `astro check` report in sites:

- Brand icons in `footer-1`, `footer-2`, `footer-3`, `doc-1` and `blocks-1` render one `fill` attribute instead of two. The blocks import the SVG files from `simple-icons` instead of the `simple-icons-astro` components, which render `fill` twice, so they now depend on `simple-icons`.
- `footer-2` and `footer-3` take a `navigationLabel` prop (default `Footer navigation`) that names their link navigation, so it no longer clashes with the header navigation.
- `NavigationMenu` defaults its `aria-label` to `Main`, as in shadcn/ui.
- `Pagination` no longer sets the redundant `role="navigation"`, and an `aria-label` you pass replaces the default instead of rendering the attribute twice.
- `BreadcrumbPage` no longer sets `role="link"` and `aria-disabled` on its text. `aria-current="page"` still marks the current page.
- `Carousel` renders a `section` instead of a `div` with `role="region"`.
- `ToggleGroup` renders `role="group"` and `ResizableHandle` renders `role="separator"` in the HTML, so an `aria-label` on them is valid before scripts run. Data Slot only added these roles at runtime.
- `Avatar` and `AvatarFallback` render a `span`, as in shadcn/ui, so an avatar can sit inside a button or link.
- `Input` and `NativeSelect` render `multiple` as a bare attribute. Astro rendered `multiple="true"`, and `multiple={false}` still turned it on.
- The `sidebar-1` breadcrumb menu button has the accessible text "Toggle menu".
- `doc-1` wraps its table of contents in a `div` instead of an unnamed `aside`, so it no longer clashes with other complementary landmarks such as `Banner`.
- `SidebarMenuButton` and `SidebarMenuSubButton` have typed props again. Astro's compiler did not find their `Props` type, so the props were untyped and `astro check --minimumFailingSeverity hint` reported `Props` as unused.
- `Command` tracks IME composition with `compositionstart` and `compositionend` instead of the deprecated `keyCode`, and still ignores the Enter that confirms a composition, including in Safari.
- The Switch, Radio Group, Checkbox and Field docs label controls by wrapping them in `Label` and use only inline content inside labels. `Switch` and `RadioGroupItem` render a `span`, which `Label for` cannot point to.
