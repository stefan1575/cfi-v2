"use client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { flexRender, Table as TableType } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  Sheet,
} from "lucide-react";
import Link from "next/link";

interface DataTableProps<TData> {
  table: TableType<TData>;
  href: string;
}

export function DataTable<TData>({ table, href }: DataTableProps<TData>) {
  return (
    <>
      <div className="flex space-x-4">
        <Button
          size="lg"
          className="cursor-pointer bg-[#9F834F] hover:bg-[#BC9B5D]"
          asChild
        >
          <Link href={href}>
            <Plus />
            Add New Record
          </Link>
        </Button>
        <Input
          name="search"
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="flex h-10 grow bg-white py-3 font-bold text-[#929292]"
        />
        <Button
          size="lg"
          className="cursor-pointer bg-[#006039] hover:bg-green-800"
          onClick={() => null}
        >
          <Sheet />
          Export to XLSX
        </Button>
        <Button
          size="lg"
          className="cursor-pointer bg-[#006039] hover:bg-green-800"
          onClick={() => null}
        >
          <Sheet />
          Export to CSV
        </Button>
      </div>
      <Table className="rounded-2xl border bg-white text-left text-xs whitespace-nowrap shadow-md">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // Check if the column is sortable
                const isSortable = header.column.getCanSort();
                // Get current sort direction
                const sortDirection = header.column.getIsSorted();

                return (
                  <TableHead
                    key={header.id}
                    className={isSortable ? "cursor-pointer select-none" : ""}
                    onClick={
                      isSortable
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-1 font-semibold">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}

                      {/* Sort indicators */}
                      {isSortable && (
                        <div className="ml-1">
                          {sortDirection === false && (
                            <div className="text-gray-400 opacity-50">
                              <ArrowUp size={14} className="mb-[-8px]" />
                              <ArrowDown size={14} />
                            </div>
                          )}
                          {sortDirection === "asc" && (
                            <div className="text-gray-400 opacity-50">
                              <ArrowUp
                                size={14}
                                className="mb-[-8px] text-black"
                              />
                              <ArrowDown size={14} />
                            </div>
                          )}
                          {sortDirection === "desc" && (
                            <div className="text-gray-400 opacity-50">
                              <ArrowUp size={14} className="mb-[-8px]" />
                              <ArrowDown size={14} className="text-black" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="py-0">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="border-b odd:bg-white even:bg-gray-50"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="py-0" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex w-full items-center justify-between">
        <div className="text-muted-foreground flex-1 text-left text-sm">
          Showing {table.getState().pagination.pageSize} of{" "}
          {table.getRowCount()}
        </div>

        <div className="flex flex-grow-0 space-x-2 py-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="cursor-pointer"
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="cursor-pointer"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="cursor-pointer"
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="cursor-pointer"
          >
            <ChevronsRight />
          </Button>
        </div>

        <div className="text-muted-foreground flex-1 text-right text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
      </div>
    </>
  );
}
