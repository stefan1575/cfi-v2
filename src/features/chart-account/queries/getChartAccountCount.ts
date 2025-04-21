"use server";

import prisma from "@/shared/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getChartAccountCount(
  params: Pick<Prisma.ChartAccountFindManyArgs, "where">,
) {
  const data = await prisma.chartAccount.count({
    ...params,
    where: {
      ...params.where,
      deletedAt: null,
    },
  });

  return data;
}
