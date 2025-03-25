import { ClientMasterForm } from "@/components/forms/client-master-form";
import { getClientMaster } from "@/lib/server";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getClientMaster(Number(id));

  return (
    <ClientMasterForm
      mode="edit"
      data={{
        firstName: data?.firstName ?? "",
        lastName: data?.lastName ?? "",
        companyName: data?.companyName ?? "",
        address: data?.address ?? "",
        email: data?.email ?? "",
        city: data?.city ?? "",
        state: data?.state ?? "",
        zipCode: data?.zipCode ?? "",
        phoneNumber: data?.phoneNumber ?? "",
        taxId: data?.taxId ?? "",
        isMailingList: data?.isMailingList ?? false,
      }}
    />
  );
}
