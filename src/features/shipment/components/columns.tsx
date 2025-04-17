"use client";

import { deleteClientMaster } from "@/features/client-master/mutations/deleteClientMaster";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import type { Shipment } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const columnHelper = createColumnHelper<Shipment>();

export const columns = [
  columnHelper.accessor("id", {
    header: () => "",
    cell: (v) => {
      return <ShipmentActions data={v.row.original} />;
    },
  }),
  columnHelper.accessor("year", {
    header: "Year",
    cell: (v) => v.getValue() ?? "",
    enableSorting: true,
  }),
  columnHelper.accessor("shipmentNumber", {
    header: "Shipment Number",
    cell: (v) => v.getValue() ?? "",
  }),
  columnHelper.accessor("landedCostRatio", {
    header: "Landing Cost Ratio",
    cell: (v) => v.getValue() ?? "",
  }),
  columnHelper.accessor("exchangeRate", {
    header: "Exchange Rate",
    cell: (v) => v.getValue() ?? "",
  }),
];

type ShipmentActionsProps = {
  data: Shipment;
};

function ShipmentActions({ data }: ShipmentActionsProps) {
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
