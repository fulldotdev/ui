export function TypographyBlockquote({
  children,
}: {
  children: React.ReactNode
}) {
  return <blockquote className="border-l-2 pl-6 italic">{children}</blockquote>
}
