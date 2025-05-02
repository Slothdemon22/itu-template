"use client"

import UserCardForm from "@/components/dashboard/card-form"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { LayoutGrid, UserPlus, Sparkles, BarChart3, Settings } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnalyticsDashboard from "@/components/dashboard/analytics-dashboard"
import SettingsPanel from "@/components/dashboard/settings-panel"

export default function Home() {
  const { isLoaded, user } = useUser()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("cards")

  const handleSubmit = async (data: any) => {
    try {
      const res = await axios.post("/api/upload", data)
      console.log("response: ", res)
    } catch (error) {
      console.error("Upload failed:", error)
    }
  }

  // Optional: Redirect non-admins
  // useEffect(() => {
  //   if (isLoaded && user?.publicMetadata?.role !== "admin") {
  //     router.push("/")
  //   }
  // }, [isLoaded, user, router])

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto py-16 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header section */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <LayoutGrid className="h-6 w-6 text-primary" />
            </div>

            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              User Dashboard
            </h1>

            <p className="text-muted-foreground max-w-lg mx-auto">
              Manage your profile, view analytics, and customize your settings all in one place.
            </p>
          </div>

          {/* User greeting if logged in */}
          {isLoaded && user && (
            <div className="mb-8 p-4 bg-muted/50 border border-border/50 rounded-lg flex items-center justify-center gap-3 shadow-sm">
              <img
                src={user.imageUrl || "/placeholder.svg"}
                alt={user.fullName || "User"}
                className="w-10 h-10 rounded-full border-2 border-primary/20"
              />
              <p className="font-medium">
                Welcome back, <span className="text-primary">{user.firstName || "User"}</span>!
              </p>
            </div>
          )}

          {/* Tabs Navigation */}
          <Tabs defaultValue="cards" value={activeTab} onValueChange={setActiveTab} className="mb-12">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="cards" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span>User Cards</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="cards" className="mt-0">
              {/* Features section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    icon: <UserPlus className="h-5 w-5" />,
                    title: "Custom Profile",
                    description: "Create a profile card that represents your unique style and personality.",
                  },
                  {
                    icon: <Sparkles className="h-5 w-5" />,
                    title: "High Quality",
                    description: "Upload high-resolution images to make your card stand out from the rest.",
                  },
                  {
                    icon: <LayoutGrid className="h-5 w-5" />,
                    title: "Card Collection",
                    description: "Build your collection of cards for different purposes and occasions.",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="p-6 bg-card/50 border border-border/50 rounded-lg shadow-sm hover:shadow transition-all"
                  >
                    <div className="bg-primary/10 p-2 rounded-full w-fit mb-4">{feature.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Card form */}
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl" />
                <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-primary/20 rounded-full blur-xl" />

                <UserCardForm title="Create New User Card" submitButtonText="Create Card" onSubmit={handleSubmit} />
              </div>

              {/* Footer note */}
              <div className="mt-12 text-center text-sm text-muted-foreground">
                <p>Your cards are securely stored and can be accessed from your dashboard at any time.</p>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-0">
              <AnalyticsDashboard />
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <SettingsPanel />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
