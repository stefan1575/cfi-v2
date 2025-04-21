"use server";

import prisma from "@/shared/lib/prisma";

export async function deleteShipment(id: number) {
  await prisma.shipment.update({
    where: { id },
    data: {
      deletedAt: new Date().toISOString(),
    },
  });
}
