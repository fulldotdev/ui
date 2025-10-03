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
import { getItem, setItem } from "@/lib/local-storage"
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
import AutoFormSelect from "@/components/elements/auto-form/auto-form-select"
import AutoFormTextarea from "@/components/elements/auto-form/auto-form-textarea"
import AutoFormWriteup from "@/components/elements/auto-form/auto-form-writeup"

const schema = z.object({
  id: z.string(),
  data: pageSchema,
  filePath: z.string(),
  body: z.string().optional(),
  digest: z.string().optional(),
})

type Props = z.infer<typeof schema>

export default function CmsLayout(entry: Props) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: schema.or(z.undefined()).parse(getItem(entry.id)) || entry,
  })

  const formValues = form.watch()
  const hasChanges = form.formState.isDirty

  async function handleSubmit() {
    if (!hasChanges) return
    const { data: result, error } = await actions.savePage(formValues)
    if (error) throw error
    setItem(entry.id, formValues)
    return result
  }

  async function handleUpload(file: File) {
    const formData = new FormData()
    formData.append("file", file)
    const { data, error } = await actions.uploadImage(formData)
    if (error) throw error
    return data
  }

  const [activeSection, setActiveSection] = React.useState<number>(-1)

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
            <SidebarHeader className="flex flex-row justify-end gap-2">
              <Button type="submit" disabled={!hasChanges}>
                Save
              </Button>
            </SidebarHeader>
            <SidebarContent>
              {activeSection === -1 ? (
                <>
                  {"sections" in entry.data && (
                    <SidebarGroup>
                      <SidebarGroupContent className="flex flex-col gap-6 p-2">
                        {"title" in entry.data && (
                          <AutoFormInput
                            control={form.control}
                            name={`data.title`}
                            label="Title"
                          />
                        )}
                        {"description" in entry.data && (
                          <AutoFormTextarea
                            control={form.control}
                            name={`data.description`}
                            label="Description"
                          />
                        )}
                        {"image" in entry.data && (
                          <AutoFormImage
                            control={form.control}
                            name={`data.image`}
                            label="Image"
                            upload={handleUpload}
                          />
                        )}
                      </SidebarGroupContent>
                    </SidebarGroup>
                  )}
                  {"sections" in entry.data && (
                    <SidebarGroup>
                      <SidebarGroupLabel>Sections</SidebarGroupLabel>
                      <SidebarGroupContent className="flex flex-col gap-2 p-2">
                        {entry.data.sections?.map((_, sectionIndex) => (
                          <Button
                            key={sectionIndex}
                            variant="secondary"
                            className="flex justify-between border"
                            onClick={() => setActiveSection(sectionIndex)}
                            asChild
                          >
                            <a href={`#${sectionIndex}`}>
                              Section {sectionIndex + 1}
                              <ChevronRight />
                            </a>
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
                        asChild
                      >
                        <a href="#-1">
                          Back
                          <Undo2 />
                        </a>
                      </Button>
                    </SidebarGroupContent>
                  </SidebarGroup>
                  {entry.data.sections?.map((section, sectionIndex) => (
                    <>
                      {activeSection === sectionIndex && (
                        <>
                          <SidebarGroup>
                            <SidebarGroupContent className="flex flex-col gap-6 p-2">
                              {"align" in section && (
                                <AutoFormSelect
                                  control={form.control}
                                  name={`data.sections.${sectionIndex}.align`}
                                  options={["start", "center", "end"]}
                                  label="Align"
                                />
                              )}
                              {"size" in section && (
                                <AutoFormSelect
                                  control={form.control}
                                  name={`data.sections.${sectionIndex}.size`}
                                  options={["sm", "default", "lg"]}
                                  label="Size"
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
                                    <Collapsible className="rounded-md border">
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
                              <SidebarGroupLabel>Faqs</SidebarGroupLabel>
                              <SidebarGroupContent className="flex flex-col gap-2 p-2">
                                {section.faqs?.map((faq, faqIndex) => (
                                  <Collapsible className="rounded-md border">
                                    <CollapsibleTrigger asChild>
                                      <Button
                                        variant="secondary"
                                        className="flex w-full justify-between"
                                      >
                                        Faq {faqIndex + 1}
                                        <ChevronRight />
                                      </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="flex flex-col gap-6 p-6">
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
              id="-1"
            >
              <Block {...formValues.data}>
                <AutoFormProse control={form.control} name="body" />
              </Block>
            </div>
            {formValues.data.sections?.map((section, index) => (
              <div
                key={index}
                onClick={() => {
                  setActiveSection(index)
                }}
                className="hover:ring-primary/25 rounded-2xl ring-4 ring-transparent transition ring-inset"
                id={index.toString()}
              >
                <Block {...section}>
                  <AutoFormWriteup
                    control={form.control}
                    name={`data.sections.${index}.html`}
                  />
                </Block>
              </div>
            ))}
          </SidebarInset>
        </SidebarProvider>
      </form>
    </Form>
  )
}
