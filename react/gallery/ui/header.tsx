import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Header,
  HeaderContainer,
  HeaderGroup,
  headerVariants,
} from "@/components/ui/header"
import { Logo, LogoText } from "@/components/ui/logo"

function Example({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

export default function Demo() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <Example title="Default">
        <Header className="border-b">
          <HeaderContainer className="items-center justify-between">
            <HeaderGroup>
              <Logo href="#/ui/header">
                <LogoText>Acme</LogoText>
              </Logo>
            </HeaderGroup>
            <HeaderGroup>
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
              <Button size="sm">Get started</Button>
            </HeaderGroup>
          </HeaderContainer>
        </Header>
      </Example>
      <Example title="Floating">
        <Header variant="floating">
          <HeaderContainer className="items-center justify-between">
            <HeaderGroup>
              <Logo>
                <LogoText>Acme</LogoText>
              </Logo>
            </HeaderGroup>
            <HeaderGroup>
              <Button size="sm">Contact</Button>
            </HeaderGroup>
          </HeaderContainer>
        </Header>
      </Example>
      <Example title="Variant classes">
        <code className="text-xs text-muted-foreground">
          {headerVariants({ variant: "floating" })}
        </code>
      </Example>
    </div>
  )
}
