import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { actions } from "astro:actions"
import { z } from "astro:schema"
import {
  ChevronDown,
  ChevronRight,
  CopyPlusIcon,
  Heading1,
  HomeIcon,
  ImagePlus,
  InfoIcon,
  Redo2Icon,
  SaveIcon,
  StickyNote,
  StickyNoteIcon,
  TextAlignStart,
  TrashIcon,
  Undo2Icon,
} from "lucide-react"
import { useForm } from "react-hook-form"

import { pageSchema, type PageSchema } from "@/schemas/page"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Form } from "@/components/ui/form"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Block } from "@/components/block"
import AutoFormImage from "@/components/elements/auto-form/auto-form-image"
import AutoFormInput from "@/components/elements/auto-form/auto-form-input"
import AutoFormProse from "@/components/elements/auto-form/auto-form-prose"
import AutoFormTextarea from "@/components/elements/auto-form/auto-form-textarea"
import AutoFormWriteup from "@/components/elements/auto-form/auto-form-writeup"
import { Page } from "@/components/page"

export default function CmsLayout({
  filePath,
  id,
  digest,
  data,
  body,
}: {
  filePath?: string
  id?: string
  digest?: string
  data: PageSchema
  body?: string
}) {
  const stored =
    typeof window !== "undefined" && sessionStorage.getItem(filePath || "")
  const storedData = stored ? JSON.parse(stored) : undefined
  const myData = storedData?.digest === digest ? storedData.data : data

  const form = useForm({
    resolver: zodResolver(
      z.object({
        id: z.string(),
        data: pageSchema,
        body: z.string().optional(),
      })
    ),
    defaultValues: {
      id,
      data: myData,
      body,
    },
  })

  const formValues = form.watch()

  async function handleSubmit() {
    if (!filePath) return
    if (!hasChanges) return
    setIsSaving(true)
    const { data: result, error } = await actions.savePage({
      filePath,
      data: formValues.data,
      body: formValues.body,
    })
    if (error) throw error
    if (window !== undefined) {
      sessionStorage.setItem(
        filePath,
        JSON.stringify({
          digest: digest,
          data: formValues.data,
          body: formValues.body,
        })
      )
    }
    setIsSaving(false)
    return result
  }

  async function handleUpload(file: File) {
    const formData = new FormData()
    formData.append("file", file)
    const { data, error } = await actions.uploadImage(formData)
    if (error) throw error
    return data
  }

  const [hasChanges, setHasChanges] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  const [isCopied, setIsCopied] = React.useState(false)

  React.useEffect(() => {
    setHasChanges(
      JSON.stringify({ data: formValues.data, body: formValues.body }) !==
        JSON.stringify({ data: myData, body })
    )
    window.addEventListener("beforeunload", handleSubmit)
    return () => window.removeEventListener("beforeunload", handleSubmit)
  }, [formValues.data, formValues.body, myData, body])

  const [activeSection, setActivePage] = React.useState<number | null>(null)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <SidebarProvider
          style={
            {
              "--sidebar-width": "24rem",
            } as React.CSSProperties
          }
        >
          <Sidebar variant="inset">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Pages</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeSection === null}
                        onClick={() => setActivePage(null)}
                      >
                        {id === "index" ? <HomeIcon /> : <StickyNoteIcon />}
                        {id === "index" ? "home" : id}
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        {data.sections?.map((section, sectionIndex) => (
                          <SidebarMenuSubItem key={sectionIndex}>
                            <SidebarMenuSubButton
                              isActive={activeSection === sectionIndex}
                              onClick={() => setActivePage(sectionIndex)}
                            >
                              {"title" in section
                                ? section.title
                                : "section " + (sectionIndex + 1)}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <Page {...(formValues.data as any)}>
              <AutoFormProse control={form.control} name="body" />
            </Page>
          </SidebarInset>
          <Sidebar variant="inset" side="right">
            <SidebarHeader className="flex flex-row justify-end gap-2">
              <Button variant="secondary" size="icon">
                <CopyPlusIcon />
              </Button>
              <Button>Save</Button>
            </SidebarHeader>
            <SidebarContent>
              {activeSection === null ? (
                <SidebarGroup>
                  <SidebarGroupContent className="flex flex-col gap-4">
                    {formValues.data && "title" in formValues.data && (
                      <AutoFormInput
                        control={form.control}
                        name="id"
                        label="New page slug"
                        description="The slug of the new page"
                      />
                    )}
                    {formValues.data && "title" in formValues.data && (
                      <AutoFormInput
                        control={form.control}
                        name="data.title"
                        label="Title"
                        className="bg-background"
                      />
                    )}
                    {formValues.data && "description" in formValues.data && (
                      <AutoFormTextarea
                        control={form.control}
                        name="data.description"
                        label="Description"
                        className="bg-background"
                      />
                    )}
                    {formValues.data && "image" in formValues.data && (
                      <AutoFormImage
                        control={form.control}
                        name="data.image.src"
                        label="Image"
                        upload={handleUpload}
                        className="bg-background"
                      />
                    )}
                  </SidebarGroupContent>
                </SidebarGroup>
              ) : (
                <SidebarGroup>
                  <SidebarGroupContent className="flex flex-col gap-2 p-2">
                    {formValues.data.sections?.[activeSection] &&
                      "html" in formValues.data.sections[activeSection] && (
                        <AutoFormWriteup
                          control={form.control}
                          name={`data.sections.${activeSection}.html`}
                        />
                      )}
                    {formValues.data.sections?.[activeSection] &&
                      "image" in formValues.data.sections[activeSection] && (
                        <AutoFormImage
                          control={form.control}
                          name={`data.sections.${activeSection}.image.src`}
                          label="Image"
                          upload={handleUpload}
                          className="bg-background"
                        />
                      )}
                  </SidebarGroupContent>
                </SidebarGroup>
              )}
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </form>
    </Form>
  )
}
