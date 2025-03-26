import { ClientMasterForm } from "@/features/client-master/components/client-master-form";

export default function Page() {
  return (
    <ClientMasterForm
      mode="add"
      defaultValues={{
        firstName: "",
        lastName: "",
        companyName: "",
        address: "",
        email: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        taxId: "",
        isMailingList: false,
      }}
    />
  );
}
