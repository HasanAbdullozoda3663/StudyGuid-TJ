"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Home,
  Building,
  Users,
  BookOpen,
  BarChart3,
  Settings,
  Mail,
  Bell,
  FileText,
  Shield,
  LogOut,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
    badge: null,
  },
  {
    title: "Universities",
    url: "/admin/universities",
    icon: Building,
    badge: "25",
  },
  {
    title: "Applications",
    url: "/admin/applications",
    icon: FileText,
    badge: "3",
    badgeVariant: "destructive" as const,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
    badge: "15.4k",
  },
  {
    title: "Programs",
    url: "/admin/programs",
    icon: BookOpen,
    badge: "350",
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    title: "Messages",
    url: "/admin/messages",
    icon: Mail,
    badge: "12",
    badgeVariant: "secondary" as const,
  },
  {
    title: "Notifications",
    url: "/admin/notifications",
    icon: Bell,
    badge: "5",
    badgeVariant: "destructive" as const,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
    badge: null,
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-red-600 rounded-lg flex items-center justify-center">
                <Shield className="text-white" size={20} />
              </div>
              <div>
                <h2 className="font-semibold text-lg">StudyGuid TJ</h2>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={pathname === item.url} className="w-full justify-between">
                        <Link href={item.url} className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-3">
                            <item.icon size={18} />
                            <span>{item.title}</span>
                          </div>
                          {item.badge && (
                            <Badge variant={item.badgeVariant || "secondary"} className="ml-auto text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Users size={16} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{user?.name || "Admin User"}</p>
                <p className="text-xs text-gray-500">{user?.email || "admin@studygaid.tj"}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="w-full flex items-center space-x-2 bg-transparent"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </Button>
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Admin</span>
              <ChevronRight size={16} />
              <span className="font-medium text-gray-900">
                {menuItems.find((item) => item.url === pathname)?.title || "Dashboard"}
              </span>
            </div>
          </header>

          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
