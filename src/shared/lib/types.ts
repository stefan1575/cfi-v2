import { Prisma } from "@prisma/client";
import { z } from "zod";

/**
 * Create a type-safe schema from Prisma model
 */
export function createSchemaFromPrisma<T>() {
  return <S extends z.ZodType<T>>(schema: S) => schema;
}

/**
 * Define form-specific type that replaces Decimal with a union of a number and an empty string
 * Empty strings are included since HTML inputs return strings, regardless of the input type
 */
export type ReplaceDecimalWithNumberEmptyUnion<T> = {
  [K in keyof T]: T[K] extends Prisma.Decimal | null ? number | "" : T[K];
};

export interface FormProps<T> {
  mode: "add" | "edit";
  defaultValues: T;
  id?: number;
}
