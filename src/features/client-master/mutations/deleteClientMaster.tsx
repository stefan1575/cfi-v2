"use server";

import prisma from "@/shared/lib/prisma";

export async function deleteClientMaster(id: number) {
  await prisma.clientMaster.update({
    where: { id },
    data: {
      clientNumber: "",
      deletedAt: new Date().toISOString(),
    },
  });
}
