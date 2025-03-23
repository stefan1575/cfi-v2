"use client";

import { Loader } from "../../../components/loader";
import { getClientMasterCount, getManyClientMaster } from "./server";
import { columns } from "@/app/dashboard/client-master/columns";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { DataTable } from "@/components/dashboard/data-table";
import { PaginationControls } from "@/components/dashboard/pagination-controls";
import { filterEndDate, filterStartDate } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type T = Required<
  Pick<
    Prisma.ClientMasterFindManyArgs,
    "skip" | "take" | "select" | "orderBy" | "where"
  >
>;

export default function Page() {
  const PAGE_SIZE = 50;

  const [findManyArgs, setFindManyArgs] = useState<T>({
    skip: 0,
    take: PAGE_SIZE,
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
    where: {},
  });

  const { data, isPending } = useQuery({
    queryKey: ["clientMaster", findManyArgs],
    queryFn: async () => await getManyClientMaster(findManyArgs),
    placeholderData: keepPreviousData,
  });

  const { data: count, isPending: isCountPending } = useQuery({
    queryKey: ["clientCount", findManyArgs],
    queryFn: async () => await getClientMasterCount(),
    placeholderData: keepPreviousData,
  });

  const debouncedSetSearchInput = useDebouncedCallback((value) => {
    updateSearchArgs(value);
  }, 300);

  function searchHandler(e: ChangeEvent<HTMLInputElement>) {
    debouncedSetSearchInput(e.target.value);
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
      skip: findManyArgs.skip + PAGE_SIZE,
    });
  }

  function handlePrevPage() {
    setFindManyArgs({
      ...findManyArgs,
      skip: findManyArgs.skip - PAGE_SIZE,
    });
  }

  function handleLastPage() {
    const totalPages = Math.ceil(count! / PAGE_SIZE);
    const lastPageSkip = (totalPages - 1) * PAGE_SIZE;

    setFindManyArgs({
      ...findManyArgs,
      skip: lastPageSkip,
    });
  }

  function handleFirstPage() {
    setFindManyArgs({
      ...findManyArgs,
      skip: 0,
    });
  }

  return (
    <div className="space-y-4">
      <DashboardNav
        addFn={() => null}
        searchFn={searchHandler}
        exportFn={() => null}
      />
      {isPending ? (
        <div>
          <Loader />
        </div>
      ) : (
        <DataTable data={data ?? []} columns={columns} />
      )}
      {!isCountPending && (
        <PaginationControls
          pageSize={PAGE_SIZE}
          count={count!}
          skip={findManyArgs.skip!}
          handleFirstPage={handleFirstPage}
          handleLastPage={handleLastPage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      )}
    </div>
  );
}
