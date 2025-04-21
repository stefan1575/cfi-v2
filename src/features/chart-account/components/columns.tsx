"use client";

import { deleteChartAccount } from "@/features/chart-account/mutations/deleteChartAccount";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import type { ChartAccount } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const columnHelper = createColumnHelper<ChartAccount>();

export const columns = [
  columnHelper.accessor("id", {
    header: () => "",
    cell: (v) => {
      return <ChartAccountActions data={v.row.original} />;
    },
  }),
  columnHelper.accessor("accountNumber", {
    header: "Account Number",
    cell: (v) => v.getValue() ?? "",
  }),
  columnHelper.accessor("accountName", {
    header: "Account Name",
    cell: (v) => v.getValue() ?? "",
  }),
];

type ChartAccountActionsProps = {
  data: ChartAccount;
};

function ChartAccountActions({ data }: ChartAccountActionsProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteChartAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chartAccount"] });
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
          <Link href={`/dashboard/shipment/edit/${data.id}`}>Edit</Link>
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
