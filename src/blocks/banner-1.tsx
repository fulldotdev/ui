import type { BlockProps } from "@/lib/types"
import { Header, HeaderContainer } from "@/components/ui/header"

export default function ({ children }: BlockProps) {
  return (
    <Header className="bg-primary relative z-10 h-8">
      <HeaderContainer className="text-primary-foreground justify-center text-center text-sm font-medium">
        {children}
      </HeaderContainer>
    </Header>
  )
}
