import { createSchemaFromPrisma } from "@/shared/lib/types";
import { ChartAccount } from "@prisma/client";
import { z } from "zod";

type ChartAccountFormFields = Pick<
  ChartAccount,
  "accountName" | "accountNumber"
>;

export const ChartAccountSchema =
  createSchemaFromPrisma<ChartAccountFormFields>()(
    z.object({
      accountName: z.string(),
      accountNumber: z.string(),
    }),
  );
