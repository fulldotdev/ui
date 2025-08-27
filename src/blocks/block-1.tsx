import * as React from "react"
import { Check, Terminal } from "lucide-react"

import type { BlockProps } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Section, SectionContainer } from "@/components/ui/section"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ({
  title,
  preview,
  code,
}: BlockProps & {
  preview?: React.ReactNode
  code?: React.ReactNode
}) {
  const [isCopied, setIsCopied] = React.useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(
      `npx shadcn add https://ui.full.dev/r/${title}`
    )
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Section>
      <SectionContainer className="flex flex-col items-center gap-4">
        <Tabs defaultValue="preview" className="w-full">
          <div className="flex w-full items-center justify-between">
            <TabsList className="flex gap-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <Separator orientation="vertical" />
            <h2 className="mx-4 border-l px-4 font-semibold">{title}</h2>
            <Button
              size="sm"
              variant="outline"
              className="ml-auto"
              onClick={handleCopy}
            >
              {isCopied ? <Check /> : <Terminal />}
              npx shadcn add {title}
            </Button>
          </div>
          <TabsContent value="code" className="w-full">
            {code}
          </TabsContent>
          <TabsContent
            value="preview"
            className="min-h-[180px] w-full overflow-hidden rounded-lg border"
          >
            {preview}
          </TabsContent>
        </Tabs>
      </SectionContainer>
    </Section>
  )
}
