"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Briefcase,
  Contact,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Settings,
  UserCog,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar"

const NAV_ITEMS = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Quản lý tin tức", url: "/tin-tuc", icon: Newspaper },
  { title: "Tuyển dụng", url: "/tuyen-dung", icon: Briefcase },
  { title: "Liên hệ", url: "/lien-he", icon: Contact },
  { title: "Tài khoản admin", url: "/tai-khoan-admin", icon: UserCog },
  { title: "Cài đặt", url: "/cai-dat", icon: Settings },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="relative w-10 aspect-square shrink-0">
            <Image
              src="https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/logo.webp"
              alt="ADA Group"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[22px] leading-7.75 font-bold text-[#001E4B]">
              ADA Group
            </span>
            <span className="text-sm leading-4.25 font-medium text-[#434750]">
              Management Portal
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarMenu className="gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.url === "/" ? pathname === "/" : pathname.startsWith(item.url)

            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  render={<Link href={item.url} />}
                  isActive={isActive}
                  className="h-11 gap-3 rounded-lg px-3 text-[15px] font-medium text-foreground/80 hover:bg-muted hover:text-foreground data-active:bg-primary data-active:font-semibold data-active:text-primary-foreground data-active:hover:bg-primary data-active:hover:text-primary-foreground"
                >
                  <item.icon className="size-6" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t px-2 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              type="button"
              className="h-11 gap-3 rounded-lg px-3 text-[15px] font-medium text-foreground/80 hover:bg-muted"
            >
              <LogOut className="size-5" />
              <span>Đăng xuất</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
