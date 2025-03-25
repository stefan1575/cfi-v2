import { Loader } from "@/components/loader";

export default function Loading() {
  return (
    <div className="bg-background fixed inset-0 flex items-center justify-center">
      <Loader />
    </div>
  );
}
