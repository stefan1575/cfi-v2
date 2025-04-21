import { ShipmentForm } from "@/features/shipment/components/shipment-form";
import { getShipment } from "@/features/shipment/queries/getShipment";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getShipment(Number(id));

  return (
    <ShipmentForm
      mode="edit"
      defaultValues={{
        year: data?.year ?? "",
        shipmentNumber: data?.shipmentNumber ?? "",
        exchangeRate: data?.exchangeRate?.toNumber() ?? "",
        landedCostRatio: data?.landedCostRatio?.toNumber() ?? "",
      }}
    />
  );
}
