export const typographyH1Style =
  "scroll-m-20 text-4xl font-semibold tracking-tight text-balance"

export const typographyH2Style =
  "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"

export const typographyH3Style =
  "scroll-m-20 text-2xl font-semibold tracking-tight"

export const typographyH4Style =
  "scroll-m-20 text-xl font-semibold tracking-tight"

export const typographyPStyle = "leading-7 [&:not(:first-child)]:mt-6"

export const typographyAStyle = "text-primary underline underline-offset-4"

export const typographyBlockquoteStyle = "mt-6 border-l-2 pl-6 italic"

export const typographyLeadStyle = "text-xl text-muted-foreground"

export const typographyLargeStyle = "text-lg font-semibold"

export const typographySmallStyle = "text-sm leading-none font-medium"

export const typographyMutedStyle = "text-sm text-muted-foreground"

export const typographyInlineCodeStyle =
  "relative rounded bg-muted px-1.5 py-0.5 font-mono text-sm font-semibold"

export const typographyPreStyle =
  "overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm"

export const typographyListStyle = "ms-6"

export const typographyUnorderedListStyle = "list-disc"

export const typographyOrderedListStyle = "list-decimal"

export const typographyListItemStyle = "mt-2"

export const typographyTableContainerStyle = "my-6 w-full overflow-x-auto"

export const typographyTableStyle = "w-full border-collapse caption-bottom text-sm"

export const typographyTableRowStyle = "border-b border-border transition-colors"

export const typographyTableHeadStyle =
  "text-foreground px-3 py-2 text-left align-middle font-medium"

export const typographyTableCellStyle = "px-3 py-2 align-top text-left"

export const typographyHrStyle = "my-8 border-border"

export function toArbitrarySelectorClass(selector: string, className: string) {
  const normalizedSelector = selector.replaceAll(" ", "_")
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

        return `[${normalizedSelector}${nestedSelector}]:${utility}`
      }

      const structuralVariantMatch = token.match(
        /^(first|last|odd|even):(.*)$/
      )

      if (structuralVariantMatch) {
        const [, variant, utility] = structuralVariantMatch

        return `[${normalizedSelector}${structuralVariants[variant]}]:${utility}`
      }

      return `[${normalizedSelector}]:${token}`
    })
    .join(" ")
}
