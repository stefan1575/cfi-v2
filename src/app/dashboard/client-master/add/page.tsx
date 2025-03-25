import { ClientMasterForm } from "@/components/forms/client-master-form";

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
