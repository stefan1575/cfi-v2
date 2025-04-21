"use client";

import { columns } from "@/features/chart-account/components/columns";
import { getChartAccountCount } from "@/features/chart-account/queries/getChartAccountCount";
import { getManyChartAccount } from "@/features/chart-account/queries/getManyChartAccount";
import { DataTable } from "@/shared/components/data-table";
import { Prisma } from "@prisma/client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type FindManyArgs = Required<
  Pick<
    Prisma.ChartAccountFindManyArgs,
    "skip" | "take" | "select" | "orderBy" | "where"
  >
>;

export default function Page() {
  const PAGE_SIZE = 10;

  const [findManyArgs, setFindManyArgs] = useState<FindManyArgs>({
    skip: 0,
    take: PAGE_SIZE,
    select: {
      id: true,
      accountNumber: true,
      accountName: true,
    },
    orderBy: { accountNumber: "desc" },
    where: {},
  });

  const { data } = useQuery({
    queryKey: ["chartAccount", findManyArgs],
    queryFn: async () => await getManyChartAccount(findManyArgs),
    placeholderData: keepPreviousData,
  });

  const { data: count } = useQuery({
    queryKey: ["chartAccountCount", findManyArgs.where],
    queryFn: async () =>
      await getChartAccountCount({ where: findManyArgs.where }),
    placeholderData: keepPreviousData,
  });

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,
    enableSortingRemoval: false,
    rowCount: count,
    state: {
      pagination: {
        pageIndex: Math.floor(findManyArgs.skip / PAGE_SIZE),
        pageSize: findManyArgs.take,
      },
      // Tanstack Table sorting object shape - https://tanstack.com/table/v8/docs/guide/sorting#sorting-state
      sorting: [
        {
          id: Object.keys(findManyArgs.orderBy)[0],
          desc: Object.values(findManyArgs.orderBy)[0] === "desc",
        },
      ],
      globalFilter: "",
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newPagination = updater(table.getState().pagination);
        setFindManyArgs({
          ...findManyArgs,
          skip: newPagination.pageIndex * PAGE_SIZE,
          take: newPagination.pageSize,
        });
      }
    },
    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        const currentSorting = [
          {
            id: Object.keys(findManyArgs.orderBy)[0],
            desc: Object.values(findManyArgs.orderBy)[0] === "desc",
          },
        ];
        const newSorting = updater(currentSorting);
        if (newSorting.length > 0) {
          const sortColumn = newSorting[0].id;
          const sortDirection = newSorting[0].desc ? "desc" : "asc";

          setFindManyArgs({
            ...findManyArgs,
            orderBy: { [sortColumn]: sortDirection },
          });
        }
      }
    },

    onGlobalFilterChange: (value) => {
      debouncedHandleSearch(value);
    },
  });

  function handleSearch(searchInput: string) {
    const quotedWords = searchInput.match(/"([^"]+)"/g);

    if (quotedWords) {
      const words = quotedWords.map((word) => word.replace(/"/g, ""));

      setFindManyArgs({
        ...findManyArgs,
        skip: 0,
        where: {
          AND: words.map((word) => ({
            OR: [
              { accountName: { contains: word } },
              { accountNumber: { contains: word } },
            ],
          })),
        },
      });
    } else if (searchInput === "") {
      setFindManyArgs({
        ...findManyArgs,
        where: {},
      });
    } else {
      setFindManyArgs({
        ...findManyArgs,
        skip: 0,
        where: {
          OR: [
            { accountName: { contains: searchInput } },
            { accountNumber: { contains: searchInput } },
          ],
        },
      });
    }

    return;
  }

  const debouncedHandleSearch = useDebouncedCallback((value) => {
    handleSearch(value);
  }, 300);

  return (
    <div className="space-y-4">
      <DataTable href="/dashboard/chart-account/add" table={table} />
    </div>
  );
}
