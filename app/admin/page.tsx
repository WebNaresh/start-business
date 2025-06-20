'use client'

import { useState, useEffect } from 'react'
import {
  BarChart3,
  FileText,
  TrendingUp,
  Activity,
  Eye,
  Plus,
  Home
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import StatsCard, { statsCardPresets } from '@/components/admin/stats-card'
import AdminNavigation from '@/components/admin/admin-navigation'

interface DashboardStats {
  totalBlogs: number
  publishedBlogs: number
  draftBlogs: number
  monthlyGrowth: number
}

interface RecentActivity {
  id: string
  type: 'blog_created' | 'blog_published' | 'blog_updated'
  title: string
  timestamp: Date
  author: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    monthlyGrowth: 0
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch blogs data
      const blogsResponse = await fetch('/api/blogs')
      const blogs = await blogsResponse.json()
      
      const published = blogs.filter((blog: any) => blog.status === 'published').length
      const drafts = blogs.filter((blog: any) => blog.status === 'draft').length
      
      setStats({
        totalBlogs: blogs.length,
        publishedBlogs: published,
        draftBlogs: drafts,
        monthlyGrowth: Math.floor(Math.random() * 30) + 10 // Mock data for growth percentage
      })

      // Mock recent activity
      setRecentActivity([
        {
          id: '1',
          type: 'blog_published',
          title: 'New Business Registration Guide',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          author: 'Admin'
        },
        {
          id: '2',
          type: 'blog_created',
          title: 'Tax Planning Strategies',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          author: 'Admin'
        },
        {
          id: '3',
          type: 'blog_updated',
          title: 'Company Formation Process',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          author: 'Admin'
        }
      ])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'blog_published': return <Eye className="w-4 h-4 text-green-600" />
      case 'blog_created': return <Plus className="w-4 h-4 text-blue-600" />
      case 'blog_updated': return <FileText className="w-4 h-4 text-orange-600" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getActivityText = (type: string) => {
    switch (type) {
      case 'blog_published': return 'Published'
      case 'blog_created': return 'Created'
      case 'blog_updated': return 'Updated'
      default: return 'Activity'
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Admin Navigation Header */}
      <AdminNavigation />

      {/* Page Header */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">Welcome back! Here's what's happening with your content.</p>
        </div>
        <div className="w-full sm:w-auto">
          <Link href="/admin/blogs/new" className="block">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 sm:h-auto text-base sm:text-sm font-medium">
              <Plus className="w-5 h-5 sm:w-4 sm:h-4 mr-2" />
              Create New Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          title="Total Blogs"
          value={stats.totalBlogs}
          description={`${stats.publishedBlogs} published, ${stats.draftBlogs} drafts`}
          icon={FileText}
          {...statsCardPresets.primary}
        />

        <StatsCard
          title="Published"
          value={stats.publishedBlogs}
          description="Live content"
          icon={BarChart3}
          {...statsCardPresets.success}
        />

        <StatsCard
          title="Monthly Growth"
          value={`+${stats.monthlyGrowth}%`}
          description="Content growth"
          icon={TrendingUp}
          {...statsCardPresets.purple}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 dark:bg-slate-800 dark:border-slate-700">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center text-gray-900 dark:text-gray-100 text-lg sm:text-xl">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
              Recent Activity
            </CardTitle>
            <CardDescription className="dark:text-gray-400 text-sm">Latest updates and changes to your content</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 sm:space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 sm:space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {getActivityText(activity.type)} "{activity.title}"
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      by {activity.author} • {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-gray-900 dark:text-gray-100 text-lg sm:text-xl">Quick Actions</CardTitle>
            <CardDescription className="dark:text-gray-400 text-sm">Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <Link href="/admin/blogs/new" className="block">
              <Button variant="outline" className="w-full justify-start h-12 sm:h-auto text-base sm:text-sm font-medium">
                <Plus className="w-5 h-5 sm:w-4 sm:h-4 mr-3 sm:mr-2" />
                Create New Blog
              </Button>
            </Link>
            <Link href="/admin/blogs" className="block">
              <Button variant="outline" className="w-full justify-start h-12 sm:h-auto text-base sm:text-sm font-medium">
                <FileText className="w-5 h-5 sm:w-4 sm:h-4 mr-3 sm:mr-2" />
                Manage Blogs
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start h-12 sm:h-auto text-base sm:text-sm font-medium" onClick={() => window.open('/blog', '_blank')}>
              <Eye className="w-5 h-5 sm:w-4 sm:h-4 mr-3 sm:mr-2" />
              View Public Blog
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 sm:h-auto text-base sm:text-sm font-medium" onClick={() => window.location.href = '/'}>
              <Home className="w-5 h-5 sm:w-4 sm:h-4 mr-3 sm:mr-2" />
              Back to Main Site
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
