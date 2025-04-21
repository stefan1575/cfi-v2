import {
  createSchemaFromPrisma,
  ReplaceDecimalWithNumberEmptyUnion,
} from "@/shared/lib/types";
import { Shipment } from "@prisma/client";
import { z } from "zod";

type ShipmentFormFields = ReplaceDecimalWithNumberEmptyUnion<
  Pick<Shipment, "year" | "shipmentNumber" | "landedCostRatio" | "exchangeRate">
>;

export const ShipmentSchema = createSchemaFromPrisma<ShipmentFormFields>()(
  z.object({
    year: z.string(),
    shipmentNumber: z.string(),
    exchangeRate: z.union([z.number(), z.literal("")]),
    landedCostRatio: z.union([z.number(), z.literal("")]),
  }),
);
