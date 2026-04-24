export const typographyH1Style =
  "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance"

export const typographyH2Style =
  "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"

export const typographyH3Style =
  "scroll-m-20 text-2xl font-semibold tracking-tight"

export const typographyH4Style =
  "scroll-m-20 text-xl font-semibold tracking-tight"

export const typographyPStyle = "leading-7 [&:not(:first-child)]:mt-6"

export const typographyAStyle =
  "text-foreground underline underline-offset-[0.2em]"

export const typographyBlockquoteStyle = "mt-6 border-l-2 pl-6 italic"

export const typographyLeadStyle = "text-xl text-muted-foreground"

export const typographyLargeStyle = "text-lg font-semibold"

export const typographySmallStyle = "text-sm leading-none font-medium"

export const typographyMutedStyle = "text-sm text-muted-foreground"

export const typographyInlineCodeStyle =
  "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"

export const typographyPreStyle =
  "overflow-x-auto rounded-xl border border-border bg-[color-mix(in_oklab,var(--muted)_68%,var(--background))] p-4 text-sm"

export const typographyListStyle = "ms-6"

export const typographyUnorderedListStyle = "list-disc"

export const typographyOrderedListStyle = "list-decimal"

export const typographyListItemStyle = "mt-2"

export const typographyTableContainerStyle = "w-full overflow-y-auto"

export const typographyTableStyle = "w-full"

export const typographyTableRowStyle = "m-0 border-t p-0 even:bg-muted"

export const typographyTableHeadStyle = "border px-4 py-2 text-start font-bold"

export const typographyTableCellStyle = "border px-4 py-2 text-start"

export const typographyHrStyle = "my-8 border-border"

export function toArbitrarySelectorClass(selector: string, className: string) {
  const structuralVariants: Record<string, string> = {
    first: ":first-child",
    last: ":last-child",
    odd: ":nth-child(odd)",
    even: ":nth-child(even)",
  }

  return className
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => {
      const arbitrarySelectorMatch = token.match(/^\[&([^\]]*)\]:(.+)$/)

      if (arbitrarySelectorMatch) {
        const [, nestedSelector, utility] = arbitrarySelectorMatch

        return `[${selector}${nestedSelector}]:${utility}`
      }

      const structuralVariantMatch = token.match(
        /^(first|last|odd|even):(.*)$/
      )

      if (structuralVariantMatch) {
        const [, variant, utility] = structuralVariantMatch

        return `[${selector}${structuralVariants[variant]}]:${utility}`
      }

      return `[${selector}]:${token}`
    })
    .join(" ")
}
