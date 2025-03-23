import { Button } from "@/components/ui/button";

type PaginationControlsProps = {
  handleNextPage: () => void;
  handlePrevPage: () => void;
  count: number;
  skip: number;
};

export function PaginationControls({
  handleNextPage,
  handlePrevPage,
  count,
  skip,
}: PaginationControlsProps) {
  const pageSize = 50; // Your fixed page size
  const currentPage = Math.floor(skip / pageSize) + 1;
  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className="space-around flex items-center justify-between">
      <div className="text-muted-foreground text-sm">
        Showing {pageSize} of {count}
      </div>
      <div className="flex space-x-2 py-4">
        <Button
          variant="outline"
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className="cursor-pointer"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          className="cursor-pointer"
        >
          Next
        </Button>
      </div>
      <div className="text-muted-foreground text-sm">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
