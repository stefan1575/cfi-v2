import { ShipmentForm } from "@/features/shipment/components/shipment-form";

export default function Page() {
  return (
    <ShipmentForm
      mode="add"
      defaultValues={{
        year: "",
        shipmentNumber: "",
        exchangeRate: "",
        landedCostRatio: "",
      }}
    />
  );
}
