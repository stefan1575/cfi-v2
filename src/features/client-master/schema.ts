import { createSchemaFromPrisma } from "@/shared/lib/types";
import { ClientMaster } from "@prisma/client";
import { z } from "zod";

export type ClientMasterFormFields = Pick<
  ClientMaster,
  | "companyName"
  | "firstName"
  | "lastName"
  | "address"
  | "email"
  | "city"
  | "state"
  | "zipCode"
  | "phoneNumber"
  | "taxId"
  | "isMailingList"
>;

export const ClientMasterSchema =
  createSchemaFromPrisma<ClientMasterFormFields>()(
    z.object({
      companyName: z.string(),
      lastName: z.string(),
      firstName: z.string(),
      address: z.string(),
      email: z.string(),
      city: z.string(),
      state: z.string(),
      zipCode: z.string(),
      phoneNumber: z.string(),
      taxId: z.string(),
      isMailingList: z.boolean(),
    }),
  ).superRefine((val, ctx) => {
    const hasOneLetter = /[a-z]/i;

    if (!val.companyName && !val.lastName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either Company or Last Name must be provided",
        path: ["lastName"],
      });
    } else if (val.companyName.length !== 0) {
      if (!hasOneLetter.test(val.companyName)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Company must contain at least one letter",
          path: ["companyName"],
        });
        return;
      }
    } else if (!hasOneLetter.test(val.lastName)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Last Name must contain at least one letter",
        path: ["lastName"],
      });
      return;
    }
  });
