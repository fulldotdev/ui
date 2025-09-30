import type { PageProps } from "@/schemas/page"
import { Block } from "@/components/block"

function Page({
  sections,
  children,
  ...props
}: PageProps & { children?: React.ReactNode }) {
  return (
    <>
      <Block {...props}>{children}</Block>
      {sections?.map((section, index) => (
        <Block key={index} {...section} />
      ))}
    </>
  )
}

export { Page }
