"use server";

import prisma from "@/shared/lib/prisma";
import { Prisma } from "@prisma/client";

export async function updateClientMaster(
  params: Prisma.ClientMasterUpdateArgs,
) {
  await prisma.clientMaster.update({
    where: params.where,
    data: params.data,
  });
}
