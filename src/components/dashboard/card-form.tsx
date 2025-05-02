"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { supabase } from "@/lib/db"
import { X, ImageIcon, Loader2, Upload, FileText, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"

interface FormData {
  title: string
  description: string
  image: File | null
}

export default function UserCardForm({
  title = "Create User Card",
  submitButtonText = "Submit",
  onSubmit,
}: {
  title?: string
  submitButtonText?: string
  onSubmit?: (data: FormData) => void
}) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    image: null,
  })
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      setFormData((prev) => ({ ...prev, image: file }))
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)

      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
  })

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }))
    if (preview) {
      URL.revokeObjectURL(preview)
      setPreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.image) {
      toast.error("Please select an image before submitting.")
      return
    }

    try {
      setLoading(true)
      const file = formData.image
      const filePath = `${Math.random() * 10}-${file.name}`

      const { data, error } = await supabase.storage.from("test").upload(filePath, file)
      if (error) {
        toast.error("Failed to upload image.")
        console.error("Upload error:", error.message)
        return
      }

      const { data: urlData } = supabase.storage.from("test").getPublicUrl(filePath)
      if (!urlData?.publicUrl) {
        toast.error("Could not retrieve public URL.")
        return
      }

      onSubmit?.({
        ...formData,
        image: file,
      })

      toast.success("User card submitted successfully!")
    } catch (err) {
      toast.error("An unexpected error occurred.")
      console.error("Unexpected error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl bg-gradient-to-b from-background to-background/80 border-opacity-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/0 pointer-events-none" />
      
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {title}
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Create your custom profile card with an image and description
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2 font-medium">
              <Type className="h-4 w-4 text-primary" />
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
              className="transition-all focus-visible:ring-primary focus-visible:ring-offset-2"
              placeholder="Enter a title for your card"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2 font-medium">
              <FileText className="h-4 w-4 text-primary" />
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              required
              className="min-h-24 transition-all focus-visible:ring-primary focus-visible:ring-offset-2"
              placeholder="Tell us a bit about yourself or this card"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-medium">
              <Upload className="h-4 w-4 text-primary" />
              Image
            </Label>
            
            {!preview ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center min-h-[180px] cursor-pointer transition-all ${
                  isDragActive
                    ? "border-primary bg-primary/10 scale-[0.98]"
                    : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                <input {...getInputProps()} />
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <ImageIcon className="h-8 w-8 text-primary" />
                </div>
                <p className="text-md font-medium text-center">
                  {isDragActive ? "Drop the image here" : "Upload your image"}
                </p>
                <p className="text-sm text-center text-muted-foreground mt-1">
                  {isDragActive ? "" : "Drag & drop or click to browse"}
                </p>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden border border-muted shadow-md group">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-auto max-h-[250px] object-cover transition-opacity group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-3 right-3 h-8 w-8 rounded-full shadow-lg opacity-90 hover:opacity-100"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <CardFooter className="px-0 pt-6 pb-0">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md transition-all py-6" 
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              <span className="font-semibold text-md">{loading ? "Submitting..." : submitButtonText}</span>
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}