"use server";

import prisma from "@/shared/lib/prisma";

export async function getChartAccount(id: number) {
  const data = await prisma.chartAccount.findFirst({
    where: {
      id,
      deletedAt: null,
    },
    select: {
      id: true,
      accountNumber: true,
      accountName: true,
    },
  });

  return data;
}
