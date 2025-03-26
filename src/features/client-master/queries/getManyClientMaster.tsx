"use server";

import prisma from "@/shared/lib/prisma";
import { convertToPlainObject } from "@/shared/lib/utils";
import { Prisma } from "@prisma/client";

export async function getManyClientMaster(
  params: Prisma.ClientMasterFindManyArgs,
) {
  const data = await prisma.clientMaster
    .findMany({
      ...params,
      where: {
        ...params.where,
        deletedAt: null,
      },
    })
    .then((value) => {
      value.map((items) => {
        items.totalSales = convertToPlainObject(items.totalSales);
      });
      return value;
    });

  return data;
}
