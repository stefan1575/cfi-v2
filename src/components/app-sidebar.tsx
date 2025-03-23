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
      url: "/dashboard/client-master",
      icon: UsersRound,
    },
    {
      title: "Inventory Master",
      url: "/dashboard/inventory-master",
      icon: Folder,
    },
    {
      title: "Inventory History",
      url: "/dashboard/inventory-history",
      icon: FolderClock,
    },
    {
      title: "Expenses",
      url: "/dashboard/expenses",
      icon: HandCoins,
    },
    {
      title: "Exchange Rate",
      url: "/dashboard/exchange-rate",
      icon: Scale,
    },
    {
      title: "Chart Account",
      url: "/dashboard/chart-account",
      icon: Banknote,
    },
  ],
  Reports: [
    {
      title: "Expense Report",
      url: "/dashboard/expense-report",
      icon: ClipboardMinus,
    },
    {
      title: "Inventory List",
      url: "/dashboard/inventory-list",
      icon: ClipboardList,
    },
    {
      title: "Sales Report",
      url: "/dashboard/sales-report",
      icon: ClipboardPlus,
    },
    {
      title: "Sales History Report",
      url: "/dashboard/sales-history-report",
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
