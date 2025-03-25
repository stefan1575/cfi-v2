"use server";

import prisma from "@/lib/prisma";
import { convertToPlainObject } from "@/lib/utils";
import { Prisma } from "@prisma/client";

type FindMany = Prisma.ClientMasterFindManyArgs;

export async function getManyClientMaster(params: FindMany) {
  const data = await prisma.clientMaster.findMany(params).then((value) => {
    value.map((items) => {
      items.totalSales = convertToPlainObject(items.totalSales);
    });
    return value;
  });

  return data;
}

type FindManyWhere = Pick<Prisma.ClientMasterFindManyArgs, "where">;

export async function getClientMasterCount(params: FindManyWhere) {
  const data = await prisma.clientMaster.count(params);

  return data;
}
