page and section opsplitsen, dus:

- collection-page.tsx
- collection-section.tsx

Reden: ze hebben verschillende schema EN verschillende block. We halen dan de vage config die we nu hebben weg:

```
{
  "collection": {
    "page": {
      "variant": 1
    },
    "section": {
      "variant": 1
    }
  }
}
```

wordt

```
{
  "collection-section": {
    "variant": 1
  },
  "collection-page": {
    "variant": 1
  }
}
```

Ook bestaan pages dan ALLEEN maar uit blocks. Dus product-page gebruikt product-block.

## stakcbit

slug field volledig weghalen, alleen nog maar title field en slug op basis hiervan generaten. Title is dan direct mooi required.
