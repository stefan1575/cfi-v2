import { ChartAccountForm } from "@/features/chart-account/components/chart-account-form";

export default function Page() {
  return (
    <ChartAccountForm
      mode="add"
      defaultValues={{
        accountNumber: "",
        accountName: "",
      }}
    />
  );
}
