import { ClientMasterForm } from "@/features/client-master/components/client-master-form";
import { getClientMaster } from "@/features/client-master/queries/getClientMaster";

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
      defaultValues={{
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
      id={Number(id)}
    />
  );
}
