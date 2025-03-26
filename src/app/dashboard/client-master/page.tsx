"use client";

import { columns } from "@/features/client-master/components/columns";
import { getClientMasterCount } from "@/features/client-master/queries/getClientMasterCount";
import { getManyClientMaster } from "@/features/client-master/queries/getManyClientMaster";
import { DataTable } from "@/shared/components/data-table";
import { filterEndDate, filterStartDate } from "@/shared/lib/utils";
import { Prisma } from "@prisma/client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type FindManyArgs = Required<
  Pick<
    Prisma.ClientMasterFindManyArgs,
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
      clientNumber: true,
      companyName: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      address: true,
      city: true,
      state: true,
      zipCode: true,
      taxId: true,
      isMailingList: true,
      lastInvoiceDate: true,
      totalSales: true,
    },
    orderBy: {
      clientNumber: "desc",
    },
    where: {},
  });

  const { data } = useQuery({
    queryKey: ["clientMaster", findManyArgs],
    queryFn: async () => await getManyClientMaster(findManyArgs),
    placeholderData: keepPreviousData,
  });

  const { data: count } = useQuery({
    queryKey: ["clientCount", findManyArgs.where],
    queryFn: async () =>
      await getClientMasterCount({ where: findManyArgs.where }),
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
              { clientNumber: { contains: word } },
              { companyName: { contains: word } },
              { firstName: { contains: word } },
              { lastName: { contains: word } },
              { email: { contains: word } },
              { address: { contains: word } },
              { city: { contains: word } },
              { state: { contains: word } },
              { zipCode: { contains: word } },
              { phoneNumber: { contains: word } },
              { taxId: { contains: word } },
              {
                lastInvoiceDate: {
                  gt: filterStartDate(word),
                  lt: filterEndDate(word),
                },
              },
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
            { clientNumber: { contains: searchInput } },
            { companyName: { contains: searchInput } },
            { firstName: { contains: searchInput } },
            { lastName: { contains: searchInput } },
            { email: { contains: searchInput } },
            { address: { contains: searchInput } },
            { city: { contains: searchInput } },
            { state: { contains: searchInput } },
            { zipCode: { contains: searchInput } },
            { phoneNumber: { contains: searchInput } },
            { taxId: { contains: searchInput } },
            {
              lastInvoiceDate: {
                gt: filterStartDate(searchInput),
                lt: filterEndDate(searchInput),
              },
            },
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
      <DataTable href="/dashboard/client-master/add" table={table} />
    </div>
  );
}
