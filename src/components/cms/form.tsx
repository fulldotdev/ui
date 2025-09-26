"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import MinimalTiptapEditor from "@/components/ui/minimal-tiptap/minimal-tiptap"
import { Textarea } from "@/components/ui/textarea"

interface Link {
  text: string
  href: string
}

interface Image {
  src: string
  alt: string
}

interface FormData {
  title: string
  description: string
  links: Link[]
  image: Image
  content: string
}

interface FormProps {
  initialData?: Partial<FormData>
  onSubmit?: (data: FormData) => void
}

export default function Form({ initialData, onSubmit }: FormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    links: initialData?.links || [
      { text: "", href: "" },
      { text: "", href: "" },
    ],
    image: initialData?.image || { src: "", alt: "" },
    content: initialData?.content || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  const updateLink = (index: number, field: keyof Link, value: string) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      ),
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid w-full items-center gap-3">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter title"
        />
      </div>

      <div className="grid w-full items-center gap-3">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Enter description"
          rows={3}
        />
      </div>

      <div className="grid w-full items-center gap-3">
        <Label>Links</Label>
        <div className="space-y-4 rounded-lg border p-4">
          {formData.links.map((link, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor={`link-text-${index}`} className="text-sm">
                    Text
                  </Label>
                  <Input
                    id={`link-text-${index}`}
                    type="text"
                    value={link.text}
                    onChange={(e) => updateLink(index, "text", e.target.value)}
                    placeholder="Link text"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`link-href-${index}`} className="text-sm">
                    URL
                  </Label>
                  <Input
                    id={`link-href-${index}`}
                    type="url"
                    value={link.href}
                    onChange={(e) => updateLink(index, "href", e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              {index < formData.links.length - 1 && (
                <div className="mt-4 border-t"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid w-full items-center gap-3">
        <Label>Image</Label>
        <div className="border-border rounded-lg border p-4">
          <div className="grid grid-cols-3 items-start gap-6">
            <div className="col-span-2 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-src" className="text-sm">
                  Source URL
                </Label>
                <Input
                  id="image-src"
                  type="url"
                  value={formData.image.src}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      image: { ...prev.image, src: e.target.value },
                    }))
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-alt" className="text-sm">
                  Alt Text
                </Label>
                <Input
                  id="image-alt"
                  type="text"
                  value={formData.image.alt}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      image: { ...prev.image, alt: e.target.value },
                    }))
                  }
                  placeholder="Image description"
                />
              </div>
            </div>
            <img
              src={formData.image.src || "/large.png"}
              alt={formData.image.alt || "Image preview"}
              className="h-[144px] w-full rounded-md border"
            />
          </div>
        </div>
      </div>

      <div className="grid w-full items-center gap-3">
        <Label htmlFor="content">Content</Label>
        <MinimalTiptapEditor
          editorContentClassName="p-5"
          value={formData.content}
          onChange={(content) =>
            setFormData((prev) => ({
              ...prev,
              content: content?.toString() || "",
            }))
          }
        />
      </div>

      <Button type="submit" className="w-full">
        Save
      </Button>
    </form>
  )
}
