"use client";

import { getClientMasterCount, getManyClientMaster } from "./server";
import { clientMasterColumns } from "@/app/dashboard/client-master/columns";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { DataTable } from "@/components/dashboard/data-table";
import { PaginationControls } from "@/components/dashboard/pagination-controls";
import { filterEndDate, filterStartDate } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type T = Prisma.ClientMasterFindManyArgs;

export default function Page() {
  // const [sorting, setSorting] = useState<SortingState>([]);

  const [findManyArgs, setFindManyArgs] = useState<T>({
    skip: 0,
    take: 50,
    select: {
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
  });

  const { data, refetch } = useQuery({
    queryKey: ["clientMaster", findManyArgs],
    queryFn: async () => await getManyClientMaster(findManyArgs),
    placeholderData: keepPreviousData, // Enable swr
  });

  const { data: count } = useQuery({
    queryKey: ["clientCount"],
    queryFn: async () => await getClientMasterCount(),
  });

  const debouncedSetSearchInput = useDebouncedCallback((value) => {
    updateSearchArgs(value);
  }, 300);

  function searchHandler(e: ChangeEvent<HTMLInputElement>) {
    debouncedSetSearchInput(e.target.value);

    refetch();
  }

  function updateSearchArgs(searchInput: string) {
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

  function handleNextPage() {
    setFindManyArgs({
      ...findManyArgs,
      skip: findManyArgs.skip! + 50,
    });
    refetch();
  }

  function handlePrevPage() {
    setFindManyArgs({
      ...findManyArgs,
      skip: findManyArgs.skip! - 50,
    });

    refetch();
  }

  useEffect(() => {
    console.log("hi");
  }, []);

  function handleSort(column: string) {
    setFindManyArgs((prevState) => {
      // Check the current sort direction for this column
      const currentDirection =
        prevState.orderBy &&
        typeof prevState.orderBy === "object" &&
        !Array.isArray(prevState.orderBy) &&
        column in prevState.orderBy
          ? prevState.orderBy[column as keyof typeof prevState.orderBy]
          : undefined;

      // Set the new direction based on current direction
      const newDirection = currentDirection === "asc" ? "desc" : "asc";

      return {
        ...findManyArgs,
        orderBy: {
          [column]: newDirection,
        },
        skip: 0,
      };
    });

    refetch();
  }

  return (
    <div className="space-y-4">
      <DashboardNav
        addFn={() => null}
        searchFn={searchHandler}
        exportFn={() => null}
      />
      <div className="relative overflow-x-auto">
        <DataTable
          data={data ?? []}
          columns={clientMasterColumns}
          handleSort={handleSort}
        />

        <PaginationControls
          count={count!}
          skip={findManyArgs.skip!}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      </div>
    </div>
  );
}
