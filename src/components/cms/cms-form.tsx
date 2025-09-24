"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import MinimalTiptapEditor from "@/components/ui/minimal-tiptap/minimal-tiptap"
import { Textarea } from "@/components/ui/textarea"

interface CmsFormProps {
  title: string
  description: string
  image: any
  body?: string
  onSubmit?: (data: {
    title: string
    description: string
    image: File | null
    body: string | null
  }) => void
}

export default function CmsForm({
  title,
  description,
  image,
  body,
  onSubmit,
}: CmsFormProps) {
  const [formData, setFormData] = useState({
    title,
    description,
    body,
  })
  const [imageFile, setImageFile] = useState<File | null>(
    image.src ? new File([], image.src) : null
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.({
      ...formData,
      image: imageFile || null,
      body: formData.body || "",
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
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
        <Label htmlFor="image">Image</Label>
        <Input id="image" type="file" onChange={handleImageChange} />
        {image && <img className="h-auto w-full rounded-md" {...image} />}
      </div>

      <div className="grid w-full items-center gap-3">
        <Label htmlFor="body">Body Content</Label>
        <MinimalTiptapEditor editorContentClassName="p-5" />
      </div>

      <Button type="submit" className="w-full">
        Save Changes
      </Button>
    </form>
  )
}
