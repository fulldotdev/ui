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
  SquareDashed,
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
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
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
  const getStoredData = () => {
    if (typeof window === "undefined" || !filePath) return null
    const stored = sessionStorage.getItem(filePath)
    if (!stored) return null
    const parsed = JSON.parse(stored)
    return parsed.digest === digest ? parsed.data : null
  }

  const myData = getStoredData() ?? data

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
    if (!filePath || !hasChanges) return

    setIsSaving(true)
    try {
      const { data: result, error } = await actions.savePage({
        filePath,
        data: formValues.data,
        body: formValues.body,
      })
      if (error) throw error

      sessionStorage.setItem(
        filePath,
        JSON.stringify({
          digest,
          data: formValues.data,
          body: formValues.body,
        })
      )
      return result
    } finally {
      setIsSaving(false)
    }
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
  const [activeSection, setActiveSection] = React.useState<number | null>(null)

  React.useEffect(() => {
    setHasChanges(
      JSON.stringify({ data: formValues.data, body: formValues.body }) !==
        JSON.stringify({ data: myData, body })
    )
  }, [formValues.data, formValues.body, myData, body])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <SidebarProvider
          style={
            {
              "--sidebar-width": "40rem",
            } as React.CSSProperties
          }
        >
          <Sidebar variant="inset">
            <SidebarHeader className="flex flex-row justify-end gap-2">
              <SidebarTrigger className="fixed top-4 left-4" />
              <Button type="submit" disabled={!hasChanges || isSaving}>
                Save
              </Button>
            </SidebarHeader>
            <SidebarContent className="grid grid-cols-3 gap-4">
              <SidebarGroup>
                {/* <SidebarGroupLabel>Pages</SidebarGroupLabel> */}
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeSection === null}
                        onClick={() => setActiveSection(null)}
                      >
                        {id === "index" ? <HomeIcon /> : <StickyNoteIcon />}
                        {id === "index" ? "home" : id}
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        {data.sections?.map((section, sectionIndex) => (
                          <SidebarMenuSubItem key={sectionIndex}>
                            <SidebarMenuSubButton
                              isActive={activeSection === sectionIndex}
                              onClick={() => setActiveSection(sectionIndex)}
                            >
                              <SquareDashed />
                              {"title" in section
                                ? section.title
                                : `section ${sectionIndex + 1}`}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup className="col-span-2">
                {/* <SidebarGroupLabel>
                  {activeSection === null ? "Home" : "Section"}
                </SidebarGroupLabel> */}
                <SidebarGroupContent className="flex flex-col gap-6">
                  {activeSection === null ? (
                    <>
                      {"title" in formValues.data && (
                        <AutoFormInput
                          control={form.control}
                          name="data.title"
                          label="Title"
                          className="bg-background"
                        />
                      )}
                      {"description" in formValues.data && (
                        <AutoFormTextarea
                          control={form.control}
                          name="data.description"
                          label="Description"
                          className="bg-background"
                        />
                      )}
                      {"image" in formValues.data && (
                        <AutoFormImage
                          control={form.control}
                          name="data.image.src"
                          label="Image"
                          upload={handleUpload}
                          className="bg-background"
                        />
                      )}
                    </>
                  ) : (
                    formValues.data.sections?.[activeSection] && (
                      <>
                        {"html" in formValues.data.sections[activeSection] && (
                          <AutoFormWriteup
                            control={form.control}
                            name={`data.sections.${activeSection}.html`}
                          />
                        )}
                        {"image" in formValues.data.sections[activeSection] && (
                          <AutoFormImage
                            control={form.control}
                            name={`data.sections.${activeSection}.image.src`}
                            label="Image"
                            upload={handleUpload}
                            className="bg-background"
                          />
                        )}
                      </>
                    )
                  )}
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <Page {...(formValues.data as any)}>
              <AutoFormProse control={form.control} name="body" />
            </Page>
          </SidebarInset>
          {/* <Sidebar variant="inset" side="right">
            <SidebarHeader className="flex flex-row justify-end gap-2">
              <Button type="submit" disabled={!hasChanges || isSaving}>
                Save
              </Button>
            </SidebarHeader>
            <SidebarContent className="gap-6 p-2">
              {activeSection === null ? (
                <>
                  {"title" in formValues.data && (
                    <AutoFormInput
                      control={form.control}
                      name="data.title"
                      label="Title"
                      className="bg-background"
                    />
                  )}
                  {"description" in formValues.data && (
                    <AutoFormTextarea
                      control={form.control}
                      name="data.description"
                      label="Description"
                      className="bg-background"
                    />
                  )}
                  {"image" in formValues.data && (
                    <AutoFormImage
                      control={form.control}
                      name="data.image.src"
                      label="Image"
                      upload={handleUpload}
                      className="bg-background"
                    />
                  )}
                </>
              ) : (
                formValues.data.sections?.[activeSection] && (
                  <>
                    {"html" in formValues.data.sections[activeSection] && (
                      <AutoFormWriteup
                        control={form.control}
                        name={`data.sections.${activeSection}.html`}
                      />
                    )}
                    {"image" in formValues.data.sections[activeSection] && (
                      <AutoFormImage
                        control={form.control}
                        name={`data.sections.${activeSection}.image.src`}
                        label="Image"
                        upload={handleUpload}
                        className="bg-background"
                      />
                    )}
                  </>
                )
              )}
            </SidebarContent>
          </Sidebar> */}
        </SidebarProvider>
      </form>
    </Form>
  )
}
