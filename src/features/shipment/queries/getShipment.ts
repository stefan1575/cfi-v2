"use server";

import prisma from "@/shared/lib/prisma";

export async function getShipment(id: number) {
  const data = await prisma.shipment.findFirst({
    where: {
      id,
      deletedAt: null,
    },
    select: {
      id: true,
      year: true,
      shipmentNumber: true,
      landedCostRatio: true,
      exchangeRate: true,
    },
  });

  return data;
}
