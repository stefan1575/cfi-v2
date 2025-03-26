"use server";

import prisma from "@/shared/lib/prisma";

export async function getClientMaster(id: number) {
  const data = await prisma.clientMaster.findFirst({
    where: {
      id,
      deletedAt: null,
    },
    select: {
      id: true,
      clientNumber: true,
      companyName: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      address: true,
      city: true,
      state: true,
      zipCode: true,
      taxId: true,
      isMailingList: true,
    },
  });

  return data;
}
