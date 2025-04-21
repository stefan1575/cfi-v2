"use client";

import { Logo } from "@/shared/components/logo";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/shared/components/ui/sidebar";
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
import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
      title: "Shipment",
      url: "/dashboard/shipment",
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

function SidebarLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-inherit active:bg-inherit"
          asChild
        >
          <Link href="/dashboard">
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Logo />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Country French</span>
              <span className="truncate font-semibold">Interiors</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function SidebarContentGroup({
  title,
  items,
}: {
  title?: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) =>
          item.items ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={`${item.url === pathname && "text-[#9F834F] hover:text-[#9F834F]"}`}
                    tooltip={item.title}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className={`${item.url === pathname && "text-[#9F834F] hover:text-[#9F834F]"}`}
                tooltip={item.title}
                asChild
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ),
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
