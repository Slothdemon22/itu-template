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
      return "/placeholder.svg?height=200&width=200"
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
      <h1 className="text-3xl font-bold mb-8">Table Entries</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.src = "/placeholder.svg?height=200&width=200"
                }}
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                <Badge variant="outline">ID: {item.id}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
              <div className="text-xs text-muted-foreground mt-4">
                <p>Created: {formatDate(item.created_at)}</p>
                <p className="truncate mt-1">User: {item.clerkID}</p>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Image:</span> {parseImagePath(item.image)}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No entries found</p>
        </div>
      )}
    </div>
  )
}

