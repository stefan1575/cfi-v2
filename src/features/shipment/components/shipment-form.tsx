"use client";

import { createShipment } from "@/features/shipment/mutations/createShipment";
import { updateShipment } from "@/features/shipment/mutations/updateShipment";
import { ShipmentSchema } from "@/features/shipment/schema";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import { FormProps } from "@/shared/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type ShipmentFormFields = z.infer<typeof ShipmentSchema>;
type ShipmentFormProps = FormProps<ShipmentFormFields>;

export function ShipmentForm({ mode, defaultValues, id }: ShipmentFormProps) {
  const form = useForm({
    resolver: zodResolver(ShipmentSchema),
    defaultValues,
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: create, isPending: isPendingCreate } = useMutation({
    mutationFn: createShipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipment"] });
      router.push("/dashboard/shipment");
    },
  });

  const { mutate: update, isPending: isPendingUpdate } = useMutation({
    mutationFn: updateShipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipment"] });
      router.push("/dashboard/shipment");
    },
  });

  const onSubmit: SubmitHandler<ShipmentFormFields> = async (values) => {
    if (mode === "add") {
      create(values);
    } else {
      update({
        where: { id },
        data: values,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-3xl space-y-8 rounded-lg bg-white p-10 shadow-md"
      >
        <div>
          <div className="flex text-xl font-bold">Shipment Form</div>
          <Separator className="mt-2" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">Year</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Year" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shipmentNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">
                  Shipment Number
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Shipment Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="landedCostRatio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">
                  Landing Cost Ratio
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Landing Cost Ratio"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="exchangeRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">
                  Exchange Rate
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Exchange Rate"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button variant="destructive" className="mr-2 cursor-pointer" asChild>
            <Link href="/dashboard/shipment">Go Back</Link>
          </Button>
          {!isPendingCreate || !isPendingUpdate ? (
            <Button className="cursor-pointer" type="submit">
              Submit
            </Button>
          ) : (
            <Button type="submit" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
