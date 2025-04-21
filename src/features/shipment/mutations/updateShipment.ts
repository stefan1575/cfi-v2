"use server";

import prisma from "@/shared/lib/prisma";
import { Prisma } from "@prisma/client";

export async function updateShipment(params: Prisma.ShipmentUpdateArgs) {
  await prisma.shipment.update({
    where: params.where,
    data: params.data,
  });
}
