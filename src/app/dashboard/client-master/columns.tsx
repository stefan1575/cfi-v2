"use client";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteClientMaster } from "@/lib/server";
import { formatDate, numberWithCommas } from "@/lib/utils";
import type { ClientMaster } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const columnHelper = createColumnHelper<ClientMaster>();

export const columns = [
  columnHelper.accessor("id", {
    header: () => "",
    cell: (v) => {
      return <ClientMasterActions data={v.row.original} />;
    },
  }),
  columnHelper.accessor("clientNumber", {
    header: "Client Number",
    cell: (v) => v.getValue() ?? "",
    enableSorting: true,
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
    enableSorting: true,
  }),
  columnHelper.accessor("email", {
    header: "Email Address",
    cell: (v) => v.getValue() ?? "",
    enableSorting: true,
  }),
  columnHelper.accessor("phoneNumber", {
    header: "Phone Number",
    cell: (v) => v.getValue() ?? "",
    enableSorting: true,
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
    enableSorting: true,
  }),
  columnHelper.accessor("taxId", {
    header: "Tax Id",
    cell: (v) => v.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("isMailingList", {
    header: "Mailing List",
    cell: (v) =>
      v.getValue() && <Badge className="bg-green-800 text-white">Yes</Badge>,
  }),
  columnHelper.accessor("lastInvoiceDate", {
    header: "Last Invoice Date",
    cell: (v) => formatDate(v.getValue()),
    enableSorting: true,
  }),
  columnHelper.accessor("totalSales", {
    header: "Total Sales",
    cell: (v) => `$ ${numberWithCommas(v.getValue())}`,
    enableSorting: true,
  }),
];

type ClientMasterActions = {
  data: ClientMaster;
};

function ClientMasterActions({ data }: ClientMasterActions) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteClientMaster,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientMaster"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <ChevronDown className="w-4 cursor-pointer rounded hover:stroke-stone-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="rounded-lg border bg-white px-2 py-0 shadow-md"
      >
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={`/dashboard/client-master/edit/${data.id}`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => mutate(data.id)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
