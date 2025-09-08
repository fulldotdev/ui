import type { BlockProps } from "@/lib/types"
import { Header, HeaderContainer } from "@/components/elements/header"

export default function ({ children }: BlockProps) {
  return (
    <Header className="bg-primary relative z-10 h-auto py-1.5">
      <HeaderContainer className="text-primary-foreground justify-center text-center text-sm font-medium">
        {children}
      </HeaderContainer>
    </Header>
  )
}
