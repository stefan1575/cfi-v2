"use client";

import { SidebarLogo } from "./sidebar/sidebar-logo";
import { SidebarContentGroup } from "./sidebar/sidebar-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Banknote,
  ClipboardList,
  ClipboardMinus,
  ClipboardPlus,
  FileClock,
  Folder,
  FolderClock,
  HandCoins,
  Scale,
  UsersRound,
} from "lucide-react";
import * as React from "react";

const data = {
  File_Maintenance: [
    {
      title: "Client Master",
      url: "#",
      icon: UsersRound,
    },
    {
      title: "Inventory Master",
      url: "#",
      icon: Folder,
    },
    {
      title: "Inventory History",
      url: "#",
      icon: FolderClock,
    },
    {
      title: "Expenses",
      url: "#",
      icon: HandCoins,
    },
    {
      title: "Exchange Rate",
      url: "#",
      icon: Scale,
    },
    {
      title: "Chart Account",
      url: "#",
      icon: Banknote,
    },
  ],
  Reports: [
    {
      title: "Expense Report",
      url: "#",
      icon: ClipboardMinus,
    },
    {
      title: "Inventory List",
      url: "#",
      icon: ClipboardList,
    },
    {
      title: "Sales Report",
      url: "#",
      icon: ClipboardPlus,
    },
    {
      title: "Sales History Report",
      url: "#",
      icon: FileClock,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarContentGroup
          title="File Maintenance"
          items={data.File_Maintenance}
        />
        <SidebarContentGroup title="Reports" items={data.Reports} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
