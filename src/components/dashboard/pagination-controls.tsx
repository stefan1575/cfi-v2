import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type PaginationControlsProps = {
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handleFirstPage: () => void;
  handleLastPage: () => void;
  count: number;
  skip: number;
  pageSize: number;
};

export function PaginationControls({
  handleNextPage,
  handlePrevPage,
  handleFirstPage,
  handleLastPage,
  count,
  skip,
  pageSize,
}: PaginationControlsProps) {
  const currentPage = Math.floor(skip / pageSize) + 1;
  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="text-muted-foreground flex-1 text-left text-sm">
        Showing {pageSize} of {count}
      </div>

      <div className="flex flex-grow-0 space-x-2 py-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleFirstPage}
          disabled={currentPage <= 1}
          className="cursor-pointer"
        >
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className="cursor-pointer"
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          className="cursor-pointer"
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleLastPage}
          disabled={currentPage >= totalPages}
          className="cursor-pointer"
        >
          <ChevronsRight />
        </Button>
      </div>

      <div className="text-muted-foreground flex-1 text-right text-sm">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
