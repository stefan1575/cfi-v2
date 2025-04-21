"use server";

import prisma from "@/shared/lib/prisma";

export async function deleteChartAccount(id: number) {
  await prisma.chartAccount.update({
    where: { id },
    data: {
      deletedAt: new Date().toISOString(),
    },
  });
}
