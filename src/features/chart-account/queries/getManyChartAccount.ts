"use server";

import prisma from "@/shared/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getManyChartAccount(
  params: Prisma.ChartAccountFindManyArgs,
) {
  const data = await prisma.chartAccount.findMany({
    ...params,
    where: {
      ...params.where,
      deletedAt: null,
    },
  });

  return data;
}
