import * as React from "react"

import type { BlockSchema } from "@/schemas/block"
import { highlightCode } from "@/lib/highlight-code"
import { cn } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code } from "@/components/code"

function Code1({
  className,
  title,
  code,
  children,
  ...props
}: BlockSchema &
  React.ComponentProps<"section"> & {
    code: string
  }) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto w-full max-w-screen-xl px-4 lg:px-8">
        <div className="flex flex-col">
          <Tabs defaultValue="preview" className="w-full not-first:mt-8">
            <div className="flex items-center gap-4">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <Heading as="h2">{title}</Heading>
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
        </div>
      </div>
    </section>
  )
}

export { Code1 }
