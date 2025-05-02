"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsDashboard() {
  const [period, setPeriod] = useState("week")

  // Dummy data for charts
  const cardViews = {
    week: [120, 145, 132, 165, 178, 156, 188],
    month: [450, 520, 610, 580, 630, 720, 680, 790, 810, 850, 920, 980],
    year: [2500, 3200, 3800, 4100, 4500, 5200, 5800, 6100, 6500, 7200, 7800, 8500],
  }

  const popularCards = [
    { name: "Professional Profile", views: 1250, percentage: 35 },
    { name: "Creative Portfolio", views: 980, percentage: 28 },
    { name: "Social Media Card", views: 750, percentage: 21 },
    { name: "Business Contact", views: 580, percentage: 16 },
  ]

  const engagementData = {
    shares: 342,
    downloads: 587,
    likes: 1243,
    comments: 256,
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Track your card performance and user engagement</p>
        </div>

        <Tabs value={period} onValueChange={setPeriod} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            title: "Total Views",
            value: "8,542",
            change: "+12.3%",
            icon: <BarChart className="h-5 w-5 text-primary" />,
          },
          {
            title: "Unique Visitors",
            value: "3,127",
            change: "+8.1%",
            icon: <LineChart className="h-5 w-5 text-primary" />,
          },
          {
            title: "Engagement Rate",
            value: "24.8%",
            change: "+5.4%",
            icon: <PieChart className="h-5 w-5 text-primary" />,
          },
          {
            title: "Avg. Time",
            value: "2m 34s",
            change: "+18.2%",
            icon: <BarChart className="h-5 w-5 text-primary" />,
          },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">{stat.icon}</div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium text-green-500">{stat.change}</span>
                <span className="text-xs text-muted-foreground ml-1">vs previous period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart and popular cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Card Views</CardTitle>
            <CardDescription>Total views over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end justify-between gap-2">
              {cardViews[period as keyof typeof cardViews].map((value, index) => (
                <div key={index} className="relative h-full flex flex-col justify-end">
                  <div
                    className="w-12 bg-primary/80 hover:bg-primary rounded-t-sm transition-all"
                    style={{ height: `${(value / 1000) * 100}%` }}
                  />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Cards</CardTitle>
            <CardDescription>Most viewed cards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {popularCards.map((card, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{card.name}</span>
                    <span className="text-muted-foreground">{card.views} views</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${card.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Metrics</CardTitle>
          <CardDescription>How users interact with your cards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(engagementData).map(([key, value], index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold">{value}</div>
                <div className="text-sm text-muted-foreground capitalize">{key}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
