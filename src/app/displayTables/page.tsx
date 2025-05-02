"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Loader2 } from "lucide-react"

interface TableItem {
  id: number
  created_at: string
  clerkID: string
  image: string
  title: string
  description: string
}

interface ImageData {
  path: string
  relativePath: string
}

export default function TablesPage() {
  const [data, setData] = useState<TableItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/gettables")
        if (response.data.success) {
          setData(response.data.data)
        } else {
          setError("Failed to fetch data")
        }
      } catch (err) {
        setError("Error fetching data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const parseImagePath = (imageString: string): string => {
    try {
      const imageData: ImageData = JSON.parse(imageString)
      return imageData.path.startsWith("./") ? imageData.path.substring(2) : imageData.path
    } catch (e) {
      console.error("Error parsing image path:", e)
      return "/placeholder.svg"
    }
  }

  const formatDate = (dateString: string): string => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (e) {
      return dateString
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Table Entries</h1>
        <p className="text-muted-foreground mt-2">
          Showing {data.length} {data.length === 1 ? "entry" : "entries"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <Card key={item.id} className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="relative aspect-video w-full">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge 
                variant="secondary" 
                className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm"
              >
                #{item.id}
              </Badge>
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-xl line-clamp-1">{item.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="pb-4">
              <p className="text-muted-foreground line-clamp-3">{item.description}</p>
            </CardContent>
            
            <CardFooter className="flex justify-between items-center text-sm text-muted-foreground pt-0">
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {formatDate(item.created_at)}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-12 border rounded-lg">
          <div className="mx-auto max-w-md space-y-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto h-12 w-12 text-muted-foreground"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            <h3 className="text-lg font-medium">No entries found</h3>
            <p className="text-sm text-muted-foreground">
              Create your first entry to get started
            </p>
          </div>
        </div>
      )}
    </div>
  )
}