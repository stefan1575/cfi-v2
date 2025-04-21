"use server";

import prisma from "@/shared/lib/prisma";
import { Prisma } from "@prisma/client";

export async function createChartAccount(
  input: Prisma.ChartAccountCreateInput,
) {
  await prisma.chartAccount.create({
    data: input,
  });
}
