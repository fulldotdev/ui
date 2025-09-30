import * as React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "astro:schema"
import { Code, StretchHorizontal, TextAlignStart } from "lucide-react"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import CmsEditor from "@/components/cms/cms-editor"

const formSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  body: z.string().optional(),
})

export default function CmsLayout({
  children,
  entry,
}: {
  children: React.ReactNode
  entry: any
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: entry.data.title || "",
      description: entry.data.description || "",
      body: entry.rendered?.html || "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form data:", data)
  }

  const [tabs, setTabs] = useState("details")

  console.log(entry)

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "24rem",
          "--sidebar-width-mobile": "100%",
        } as React.CSSProperties
      }
    >
      <Sidebar>
        <SidebarContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input type="file" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <img
                className="bg-muted rounded-md"
                src={entry.data.image?.src}
                alt={entry.data.image?.alt}
              />
            </form>
          </Form>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="mx-auto px-4">
          <CmsEditor
            content={entry.rendered?.html}
            onUpdate={(content) => form.setValue("body", content)}
          />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
