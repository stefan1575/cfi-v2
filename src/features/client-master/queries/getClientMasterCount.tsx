"use server";

import prisma from "@/shared/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getClientMasterCount(
  params: Pick<Prisma.ClientMasterFindManyArgs, "where">,
) {
  const data = await prisma.clientMaster.count({
    ...params,
    where: {
      ...params.where,
      deletedAt: null,
    },
  });

  return data;
}
