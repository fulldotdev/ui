import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { actions } from "astro:actions"
import { z } from "astro:schema"
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  CopyPlusIcon,
  Dot,
  Heading1,
  HomeIcon,
  ImagePlus,
  InfoIcon,
  Link,
  Redo2Icon,
  SaveIcon,
  SquareDashed,
  StickyNote,
  StickyNoteIcon,
  TextAlignStart,
  TrashIcon,
  Undo2,
  Undo2Icon,
} from "lucide-react"
import { useForm } from "react-hook-form"
import type { FieldValues } from "react-hook-form"

import { pageSchema, type PageSchema } from "@/schemas/page"
import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
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
import AutoFormLink from "@/components/elements/auto-form/auto-form-link"
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
  const [activeSection, setActiveSection] = React.useState<number>(-1)

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
              "--sidebar-width": "36rem",
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
            <SidebarContent>
              {activeSection === -1 ? (
                <>
                  <SidebarGroup>
                    <SidebarGroupLabel>Page</SidebarGroupLabel>
                    <SidebarGroupContent className="flex flex-col gap-6 p-2">
                      {"title" in data && (
                        <AutoFormInput
                          control={form.control}
                          name={`data.title`}
                          label="Title"
                        />
                      )}
                      {"description" in data && (
                        <AutoFormTextarea
                          control={form.control}
                          name={`data.description`}
                          label="Description"
                        />
                      )}
                      {"image" in data && (
                        <AutoFormImage
                          control={form.control}
                          name={`data.image`}
                          label="Image"
                          upload={handleUpload}
                        />
                      )}
                    </SidebarGroupContent>
                  </SidebarGroup>
                  {"sections" in data && (
                    <SidebarGroup>
                      <SidebarGroupLabel>Sections</SidebarGroupLabel>
                      <SidebarGroupContent className="flex flex-col gap-2 p-2">
                        {data.sections?.map((_, sectionIndex) => (
                          <Button
                            key={sectionIndex}
                            variant="secondary"
                            className="flex justify-between"
                            onClick={() => setActiveSection(sectionIndex)}
                          >
                            Section {sectionIndex + 1}
                            <ChevronRight />
                          </Button>
                        ))}
                      </SidebarGroupContent>
                    </SidebarGroup>
                  )}
                </>
              ) : (
                <>
                  <SidebarGroup>
                    <SidebarGroupContent className="flex flex-col gap-2 p-2">
                      <Button
                        variant="outline"
                        className="flex"
                        onClick={() => setActiveSection(-1)}
                      >
                        Back
                        <Undo2 />
                      </Button>
                    </SidebarGroupContent>
                  </SidebarGroup>
                  {data.sections?.map((section, sectionIndex) => (
                    <>
                      {activeSection === sectionIndex && (
                        <>
                          <SidebarGroup>
                            <SidebarGroupLabel>
                              Section {activeSection + 1}
                            </SidebarGroupLabel>
                            <SidebarGroupContent className="flex flex-col gap-6 p-2">
                              {"html" in section && (
                                <AutoFormWriteup
                                  control={form.control}
                                  name={`data.sections.${sectionIndex}.html`}
                                />
                              )}
                              {"image" in section && (
                                <AutoFormImage
                                  control={form.control}
                                  name={`data.sections.${sectionIndex}.image`}
                                  upload={handleUpload}
                                  label="Image"
                                />
                              )}
                              {"links" in section &&
                                section.links?.map((_, linkIndex) => (
                                  <AutoFormLink
                                    key={linkIndex}
                                    control={form.control}
                                    name={`data.sections.${sectionIndex}.links.${linkIndex}`}
                                    label="Link"
                                  />
                                ))}
                            </SidebarGroupContent>
                          </SidebarGroup>
                          {"features" in section && (
                            <SidebarGroup>
                              <SidebarGroupLabel>Features</SidebarGroupLabel>
                              <SidebarGroupContent className="flex flex-col gap-2 p-2">
                                {section.features?.map(
                                  (feature, featureIndex) => (
                                    <Collapsible>
                                      <CollapsibleTrigger asChild>
                                        <Button
                                          variant="secondary"
                                          className="flex w-full justify-between"
                                        >
                                          Feature {featureIndex + 1}
                                          <ChevronDown />
                                        </Button>
                                      </CollapsibleTrigger>
                                      <CollapsibleContent className="flex flex-col gap-6 p-6">
                                        {"title" in feature && (
                                          <AutoFormInput
                                            control={form.control}
                                            name={`data.sections.${sectionIndex}.features.${featureIndex}.title`}
                                            label="Title"
                                          />
                                        )}
                                        {"description" in feature && (
                                          <AutoFormTextarea
                                            control={form.control}
                                            name={`data.sections.${sectionIndex}.features.${featureIndex}.description`}
                                            label="Description"
                                          />
                                        )}
                                        {"image" in feature && (
                                          <AutoFormImage
                                            control={form.control}
                                            name={`data.sections.${sectionIndex}.features.${featureIndex}.image`}
                                            label="Image"
                                            upload={handleUpload}
                                          />
                                        )}
                                      </CollapsibleContent>
                                    </Collapsible>
                                  )
                                )}
                              </SidebarGroupContent>
                            </SidebarGroup>
                          )}
                          {"faqs" in section && (
                            <SidebarGroup>
                              <SidebarGroupLabel>FAQs</SidebarGroupLabel>
                              <SidebarGroupContent className="flex flex-col gap-2 p-2">
                                {section.faqs?.map((faq, faqIndex) => (
                                  <Collapsible>
                                    <CollapsibleTrigger asChild>
                                      <Button
                                        variant="secondary"
                                        className="flex w-full justify-between"
                                      >
                                        FAQ {faqIndex + 1}
                                        <ChevronRight />
                                      </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="flex flex-col gap-6 py-6">
                                      {"question" in faq && (
                                        <AutoFormInput
                                          control={form.control}
                                          name={`data.sections.${sectionIndex}.faqs.${faqIndex}.question`}
                                          label="Question"
                                        />
                                      )}
                                      {"answer" in faq && (
                                        <AutoFormTextarea
                                          control={form.control}
                                          name={`data.sections.${sectionIndex}.faqs.${faqIndex}.answer`}
                                          label="Answer"
                                        />
                                      )}
                                    </CollapsibleContent>
                                  </Collapsible>
                                ))}
                              </SidebarGroupContent>
                            </SidebarGroup>
                          )}
                        </>
                      )}
                    </>
                  ))}
                </>
              )}
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <div
              onClick={() => setActiveSection(-1)}
              className="hover:ring-primary/25 rounded-2xl ring-4 ring-transparent transition ring-inset"
            >
              <Block {...formValues.data}>
                <AutoFormProse control={form.control} name="body" />
              </Block>
            </div>
            {formValues.data.sections?.map((section, index) => (
              <div
                key={index}
                onClick={() => setActiveSection(index)}
                className="hover:ring-primary/25 rounded-2xl ring-4 ring-transparent transition ring-inset"
              >
                <Block {...section} />
              </div>
            ))}
          </SidebarInset>
        </SidebarProvider>
      </form>
    </Form>
  )
}
