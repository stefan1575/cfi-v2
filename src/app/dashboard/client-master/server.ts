"use server";

import prisma from "@/lib/prisma";
import { convertToPlainObject } from "@/lib/utils";
import { Prisma } from "@prisma/client";

type T = Prisma.ClientMasterFindManyArgs;

export async function getManyClientMaster(params: T) {
  const data = await prisma.clientMaster.findMany(params).then((value) => {
    value.map((items) => {
      items.totalSales = convertToPlainObject(items.totalSales);
    });
    return value;
  });

  return data;
}

export async function getClientMasterCount() {
  const data = await prisma.clientMaster.count();

  return data;
}
