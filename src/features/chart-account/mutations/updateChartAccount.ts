"use server";

import prisma from "@/shared/lib/prisma";
import { Prisma } from "@prisma/client";

export async function updateChartAccount(
  params: Prisma.ChartAccountUpdateArgs,
) {
  await prisma.chartAccount.update({
    where: params.where,
    data: params.data,
  });
}
