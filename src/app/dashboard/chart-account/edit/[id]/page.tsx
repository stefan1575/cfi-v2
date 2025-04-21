import { ChartAccountForm } from "@/features/chart-account/components/chart-account-form";
import { getChartAccount } from "@/features/chart-account/queries/getChartAccount";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getChartAccount(Number(id));

  return (
    <ChartAccountForm
      mode="edit"
      defaultValues={{
        accountNumber: data?.accountNumber ?? "",
        accountName: data?.accountName ?? "",
      }}
    />
  );
}
