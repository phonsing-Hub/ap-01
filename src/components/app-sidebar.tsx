"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { menuData } from "./sidebarManu"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader >
        <TeamSwitcher teams={menuData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuData.navMain}  title="Main"/>
      </SidebarContent>
      <SidebarFooter>
        <NavMain items={menuData.navFooter}  title=""/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
