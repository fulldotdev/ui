import * as React from "react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

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

function Pane({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">{children}</span>
    </div>
  )
}

export default function Demo() {
  const [sizes, setSizes] = React.useState<Record<string, number>>({})

  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Horizontal with nested vertical group">
        <ResizablePanelGroup
          orientation="horizontal"
          className="max-w-md rounded-lg border"
        >
          <ResizablePanel defaultSize="50%">
            <div className="flex h-[200px] items-center justify-center p-6">
              <span className="font-semibold">One</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="50%">
            <ResizablePanelGroup orientation="vertical">
              <ResizablePanel defaultSize="25%">
                <Pane>Two</Pane>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize="75%">
                <Pane>Three</Pane>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Example>

      <Example title="Vertical with a visible handle">
        <ResizablePanelGroup
          orientation="vertical"
          className="min-h-[200px] max-w-md rounded-lg border"
        >
          <ResizablePanel defaultSize="25%">
            <Pane>Header</Pane>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="75%">
            <Pane>Content</Pane>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Example>

      <Example title="Limits, collapsing and layout events">
        <div className="flex w-full max-w-md flex-col gap-2">
          <ResizablePanelGroup
            orientation="horizontal"
            className="min-h-[160px] rounded-lg border"
            onLayoutChanged={(layout) => setSizes(layout)}
          >
            <ResizablePanel
              id="sidebar"
              defaultSize="30%"
              minSize="20%"
              maxSize="50%"
              collapsible
              collapsedSize="0%"
            >
              <Pane>Sidebar</Pane>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel id="main" defaultSize="70%">
              <Pane>Main</Pane>
            </ResizablePanel>
          </ResizablePanelGroup>
          <p className="text-sm text-muted-foreground">
            {Object.entries(sizes)
              .map(([id, size]) => `${id} ${Math.round(size)}%`)
              .join(", ") || "Drag the handle to resize"}
          </p>
        </div>
      </Example>

      <Example title="Disabled">
        <ResizablePanelGroup
          orientation="horizontal"
          disabled
          className="min-h-[120px] max-w-md rounded-lg border"
        >
          <ResizablePanel defaultSize="50%">
            <Pane>Fixed</Pane>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="50%">
            <Pane>Fixed</Pane>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Example>
    </div>
  )
}
