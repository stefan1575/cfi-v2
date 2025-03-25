"use server";

import prisma from "@/lib/prisma";
import { convertToPlainObject } from "@/lib/utils";
import { Prisma } from "@prisma/client";

type FindMany = Prisma.ClientMasterFindManyArgs;

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

export async function getManyClientMaster(params: FindMany) {
  const data = await prisma.clientMaster
    .findMany({
      ...params,
      where: {
        ...params.where,
        deletedAt: null,
      },
    })
    .then((value) => {
      value.map((items) => {
        items.totalSales = convertToPlainObject(items.totalSales);
      });
      return value;
    });

  return data;
}

type FindManyWhere = Pick<Prisma.ClientMasterFindManyArgs, "where">;

export async function getClientMasterCount(params: FindManyWhere) {
  const data = await prisma.clientMaster.count({
    ...params,
    where: {
      ...params.where,
      deletedAt: null,
    },
  });

  return data;
}

export async function createClientMaster(
  input: Prisma.ClientMasterCreateInput,
) {
  const clientNumber = await generateClientNumber({
    companyName: input.companyName!,
    lastName: input.lastName!,
  });

  await prisma.clientMaster.create({
    data: {
      ...input,
      clientNumber,
    },
  });
}

export async function deleteClientMaster(id: number) {
  await prisma.clientMaster.update({
    where: { id },
    data: {
      clientNumber: "",
      deletedAt: new Date().toISOString(),
    },
  });
}

export async function updateClientMaster(
  params: Prisma.ClientMasterUpdateArgs,
) {
  await prisma.clientMaster.update({
    where: params.where,
    data: params.data,
  });
}

async function generateClientNumber(values: {
  companyName: string;
  lastName: string;
}) {
  // Determine letters from Company or LastName
  let letters: string;
  if (values.companyName && values.companyName.trim() !== "") {
    letters = extractFirstThreeLetters(values.companyName);
  } else if (values.lastName && values.lastName.trim() !== "") {
    letters = extractFirstThreeLetters(values.lastName);
  } else {
    throw new Error("Either Company or LastName must be provided");
  }

  // Fetch existing client numbers starting with these letters
  const existingClients = await prisma.clientMaster.findMany({
    where: {
      clientNumber: {
        startsWith: letters,
      },
    },
    select: {
      clientNumber: true,
    },
  });

  // Extract and process existing client numbers
  const clientNumbers = existingClients
    .map((client) => {
      // Extract last 3 digits from existing client number
      const lastThreeDigits = client.clientNumber?.slice(-3);
      return lastThreeDigits ? parseInt(lastThreeDigits, 10) : 0;
    })
    .filter((num) => !isNaN(num));

  // Determine the next client number
  let nextNumber: string;
  if (clientNumbers.length > 0) {
    // Find max existing number and increment
    const maxNumber = Math.max(...clientNumbers) + 1;

    // Ensure 3-digit format with leading zeros
    nextNumber = maxNumber.toString().padStart(3, "0");
  } else {
    // Start with 001 if no existing clients with these letters
    nextNumber = "001";
  }

  // Combine letters and number
  return letters.toUpperCase() + nextNumber;
}

function extractFirstThreeLetters(input: string) {
  const cleanedInput = input.replace(/[^a-z]/gi, "");
  return cleanedInput.slice(0, 3);
}
