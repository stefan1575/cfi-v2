"use server";

import prisma from "@/shared/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getShipmentCount(
  params: Pick<Prisma.ShipmentFindManyArgs, "where">,
) {
  const data = await prisma.shipment.count({
    ...params,
    where: {
      ...params.where,
      deletedAt: null,
    },
  });

  return data;
}
