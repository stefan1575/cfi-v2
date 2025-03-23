import { Spinner } from "@/components/ui/spinner";

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Spinner type="bars" className="size-20" />
    </div>
  );
}
