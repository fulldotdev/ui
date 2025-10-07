import * as React from "react"

import { cn } from "@/lib/utils"
import Container from "@/components/elements/container"
import Header from "@/components/elements/header"

interface Props extends React.ComponentProps<typeof Header> {}

export default function ({ className, children, ...props }: Props) {
  return (
    <Header className={cn("bg-primary", className)} {...props}>
      <Container className="text-primary-foreground justify-center text-center text-sm font-medium">
        {children}
      </Container>
    </Header>
  )
}
