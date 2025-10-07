# fulldev-ui Architecture

## Folder Structure

```
/src/
  /components/
    /ui/            ← shadcn components (button, input, card...)
    /elements/      ← fulldev building blocks (logo, container, grid...)
    /blocks/        ← fulldev page sections (hero-1, cta-1, footer-1...)
    /cms/           ← CMS components (editor, fields...)

  /schemas/
    /blocks/        ← Zod schemas for blocks (hero.ts, cta.ts...)
    /fields/        ← Zod schemas for CMS fields (text.ts, image.ts...)
```

**File naming:** Both `.tsx` and `.astro` side-by-side  
Example: `button.tsx` + `button.astro` in same folder

---

## Component Categories

| Folder       | What Goes Here              | Export                             |
| ------------ | --------------------------- | ---------------------------------- |
| `/ui/`       | shadcn components           | Named: `export { Button }`         |
| `/elements/` | fulldev building blocks     | Default: `export default function` |
| `/blocks/`   | Full-width page sections    | Default: `export default function` |
| `/cms/`      | CMS components (React only) | Default: `export default function` |

**Why default exports for elements/blocks?**  
Enables dynamic loading with `<Block>` component (`blockImport?.default`). Avoids complex name transformations.

**Why named exports for /ui/?**  
Matches shadcn convention. Allows exporting variants like `buttonVariants`.

---

## Registries

Three separate registries (shadcn CLI doesn't support framework detection):

```
registry-react.json     → ui.full.dev/r/react/{name}.json
registry-astro.json     → ui.full.dev/r/astro/{name}.json
registry-cms.json       → ui.full.dev/r/cms/{name}.json
```

---

## Framework Strategy

### Launch: Both React + Astro

- React: Your agency needs + larger market
- Astro: Respect 500-star community

### CMS: React Only

- Live editing requires React reactivity
- Works in Astro via `client:load`

### Build Order: React First

- Faster to develop in React
- Port to Astro after (usually straightforward)
- Agency needs React + CMS immediately

---

## Key Decisions & Why

### Side-by-Side Files

**Decision:** `button.tsx` + `button.astro` in same folder  
**Why:** Matches user's final structure. Easier to compare implementations.  
**Challenge:** Could get messy with 50+ components. Revisit if needed.

### Small Launch

**Decision:** Start with essential blocks only  
**Why:** Focus on quality over quantity. Ship fast. Validate demand before building more.

**Core blocks needed:**

- hero (landing page)
- cta (call to action)
- features (showcase)
- footer (site footer)
- header (navigation)
- contact (form)

**CMS essentials:**

- editor, field-text, field-image

### No Separate Packages

**Decision:** Everything in one repo, no monorepo  
**Why:** Components copied via CLI, not installed as packages. No need for complex monorepo setup.

### CMS in Same Repo

**Decision:** CMS lives in this repo, not separate  
**Why:** CMS components can reference UI components. Installed via registry like everything else.

---

## Decision Framework

When facing a choice, ask:

> **"Does this help someone ship a beautiful marketing site faster?"**

Target users: Solo devs, small agencies, indie hackers building content/marketing sites.

---

## Schemas

Zod schemas define block data structures for the CMS.

**Naming:** Block variants share one schema

- `hero-1.tsx`, `hero-2.tsx` → `schemas/blocks/hero.ts`

---

## Styling

- Direct Tailwind (no abstraction layers)
- Use shadcn color variables (`primary`, `secondary`)
- Don't modify shadcn components

**Why no abstractions?**  
Users can see exactly what's happening. Easy to customize. Matches shadcn philosophy.
