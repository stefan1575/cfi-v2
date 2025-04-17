"use server";

import prisma from "@/shared/lib/prisma";
import { convertToPlainObject } from "@/shared/lib/utils";
import { Prisma } from "@prisma/client";

export async function getManyShipment(params: Prisma.ShipmentFindManyArgs) {
  const data = await prisma.shipment
    .findMany({
      ...params,
      where: {
        ...params.where,
        deletedAt: null,
      },
    })
    .then((value) => {
      value.map((items) => {
        items.landedCostRatio = convertToPlainObject(items.landedCostRatio);
        items.exchangeRate = convertToPlainObject(items.exchangeRate);
      });
      return value;
    });

  return data;
}
