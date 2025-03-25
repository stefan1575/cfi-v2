import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Sheet } from "lucide-react";
import Link from "next/link";
import { ChangeEvent } from "react";

type DashboardNavProps = {
  href: string;
  searchFn: (e: ChangeEvent<HTMLInputElement>) => void;
  exportFn: () => void;
};

export function DashboardNav({ href, searchFn, exportFn }: DashboardNavProps) {
  return (
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
        onChange={searchFn}
        placeholder="Search..."
        className="flex h-10 grow bg-white py-3 font-bold text-[#929292]"
      />
      <Button
        size="lg"
        className="cursor-pointer bg-[#006039] hover:bg-green-800"
        onClick={exportFn}
      >
        <Sheet />
        Export to XLSX
      </Button>
      <Button
        size="lg"
        className="cursor-pointer bg-[#006039] hover:bg-green-800"
        onClick={exportFn}
      >
        <Sheet />
        Export to CSV
      </Button>
    </div>
  );
}
