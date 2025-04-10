import * as React from "react"

import type { BlockSchema } from "@/schemas/block"
import { highlightCode } from "@/lib/highlight-code"
import { cn } from "@/lib/utils"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Buttons } from "@/components/buttons"
import { Code } from "@/components/code"
import { Column } from "@/components/column"
import { Container } from "@/components/container"
import { Description } from "@/components/description"
import { Panel } from "@/components/panel"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

function Code1({
  className,
  id,
  level = 2,
  title,
  code,
  children,
}: BlockSchema & {
  children: React.ReactNode
  code: string
}) {
  return (
    <Section className={className} id={id}>
      <Container className="flex flex-col">
        <Tabs defaultValue="preview" className="w-full not-first:mt-8">
          <div className="flex items-center gap-4">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <Title level={level}>{title}</Title>
          </div>
          <TabsContent value="preview">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel className="bg-background relative rounded-xl border">
                {children}
              </ResizablePanel>
              <ResizableHandle className="after:bg-border relative hidden w-3 bg-transparent p-0 after:absolute after:top-1/2 after:right-0 after:h-8 after:w-[6px] after:translate-x-[-1px] after:-translate-y-1/2 after:rounded-full after:transition-all after:hover:h-10 md:block" />
              <ResizablePanel defaultSize={0} minSize={0} />
            </ResizablePanelGroup>
          </TabsContent>
          <TabsContent value="code">
            <Code code={code} />
          </TabsContent>
        </Tabs>
      </Container>
    </Section>
  )
}

export { Code1 }
