"use client"

import type { CollectionEntry } from "astro:content"
import { ChevronDown, Section } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Form from "@/components/cms/form"

export default function CmsEntry(entry: CollectionEntry<"pages">) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mt-4 mb-8 grid w-full grid-cols-2">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Form {...entry.data} />
        </TabsContent>

        <TabsContent value="sections" className="space-y-4">
          {entry.data.sections?.map((section, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto w-full justify-between p-4"
                >
                  <div className="flex items-center gap-2">
                    <Section className="h-4 w-4" />
                    <span>{section.type || `Section ${index + 1}`}</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <div className="space-y-4">
                  <pre className="bg-muted rounded p-4 text-sm">
                    {JSON.stringify(section, null, 2)}
                  </pre>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </TabsContent>
      </Tabs>
    </form>
  )
}
