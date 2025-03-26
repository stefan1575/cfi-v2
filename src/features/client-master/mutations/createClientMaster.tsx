"use server";

import prisma from "@/shared/lib/prisma";
import { Prisma } from "@prisma/client";

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
