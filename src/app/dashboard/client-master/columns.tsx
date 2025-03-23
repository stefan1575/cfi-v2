"use client";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate, numberWithCommas } from "@/lib/utils";
import type { ClientMaster } from "@prisma/client";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

const columnHelper = createColumnHelper<ClientMaster>();

export const columns = [
  columnHelper.accessor("id", {
    header: () => <ArrowUpDown className="size-4 cursor-pointer" />,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <ChevronDown className="w-4 cursor-pointer rounded hover:stroke-stone-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="rounded-lg border bg-white px-2 py-0 shadow-md"
          >
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
  columnHelper.accessor("clientNumber", {
    header: "Client Number",
    cell: (v) => v.getValue() ?? "",
  }),
  columnHelper.accessor("companyName", {
    header: "Company Name",
    cell: (v) => v.getValue() ?? "",
  }),
  columnHelper.accessor("firstName", {
    header: "Full Name",
    cell: (info) => {
      const row = info.row.original;
      return `${row.firstName || ""} ${row.lastName || ""}`;
    },
  }),
  columnHelper.accessor("email", {
    header: "Email Address",
    cell: (v) => v.getValue() ?? "",
  }),
  columnHelper.accessor("phoneNumber", {
    header: "Phone Number",
    cell: (v) => v.getValue() ?? "",
  }),
  columnHelper.accessor("address", {
    header: "Address",
    cell: (info) => {
      const row = info.row.original;
      const addressParts = [
        row.address,
        row.city,
        row.state,
        row.zipCode,
      ].filter(Boolean);
      return addressParts.join(", ");
    },
  }),
  columnHelper.accessor("taxId", {
    header: "Tax Id",
    cell: (v) => v.getValue(),
  }),
  columnHelper.accessor("isMailingList", {
    header: "Mailing List",
    cell: (v) =>
      v.getValue() && <Badge className="bg-green-800 text-white">Yes</Badge>,
  }),
  columnHelper.accessor("lastInvoiceDate", {
    header: "Last Invoice Date",
    cell: (v) => formatDate(v.getValue()),
  }),
  columnHelper.accessor("totalSales", {
    header: "Total Sales",
    cell: (v) => `$ ${numberWithCommas(v.getValue())}`,
  }),
];
