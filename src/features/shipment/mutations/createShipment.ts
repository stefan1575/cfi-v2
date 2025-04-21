"use server";

import prisma from "@/shared/lib/prisma";
import { Prisma } from "@prisma/client";

export async function createShipment(input: Prisma.ShipmentCreateInput) {
  await prisma.shipment.create({
    data: input,
  });
}
