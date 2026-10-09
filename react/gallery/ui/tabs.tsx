import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  tabsListVariants,
  TabsTrigger,
} from "@/components/ui/tabs"

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
  const [tab, setTab] = React.useState("overview")
  return (
    <div className="flex flex-col gap-10 p-6">
      <Example title="Default">
        <Tabs defaultValue="account" className="w-full max-w-sm">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="tabs-name">Name</Label>
              <Input id="tabs-name" defaultValue="Ada Lovelace" />
            </div>
            <Button className="self-start">Save changes</Button>
          </TabsContent>
          <TabsContent value="password" className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="tabs-password">New password</Label>
              <Input id="tabs-password" type="password" />
            </div>
            <Button className="self-start">Save password</Button>
          </TabsContent>
        </Tabs>
      </Example>
      <Example title="Line variant with a disabled tab">
        <Tabs defaultValue="preview" className="w-full max-w-sm">
          <TabsList variant="line">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="history" disabled>
              History
            </TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="text-sm">
            The rendered component.
          </TabsContent>
          <TabsContent value="code" className="text-sm">
            The source of the component.
          </TabsContent>
          <TabsContent value="history" className="text-sm">
            Earlier versions.
          </TabsContent>
        </Tabs>
      </Example>
      <Example title="Vertical">
        <Tabs
          defaultValue="general"
          orientation="vertical"
          className="w-full max-w-md"
        >
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="text-sm">
            Site name, language and time zone.
          </TabsContent>
          <TabsContent value="billing" className="text-sm">
            Plan, invoices and payment method.
          </TabsContent>
          <TabsContent value="team" className="text-sm">
            People who can edit the site.
          </TabsContent>
        </Tabs>
      </Example>
      <Example title="Controlled">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Tabs value={tab} onValueChange={(value) => setTab(String(value))}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="text-sm">
              Visitors this week.
            </TabsContent>
            <TabsContent value="analytics" className="text-sm">
              Where visitors come from.
            </TabsContent>
            <TabsContent value="reports" className="text-sm">
              Monthly summaries.
            </TabsContent>
          </Tabs>
          <p className="text-sm text-muted-foreground">Active tab: {tab}</p>
          <Button
            variant="outline"
            size="sm"
            className="self-start"
            onClick={() => setTab("reports")}
          >
            Show reports
          </Button>
        </div>
      </Example>
      <Example title="List styling without tabs">
        <div className={tabsListVariants({ variant: "default" })}>
          <span className="px-2 py-1 text-sm">
            Static list with the tabs list styling
          </span>
        </div>
      </Example>
    </div>
  )
}
